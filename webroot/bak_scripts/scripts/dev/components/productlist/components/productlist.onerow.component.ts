///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 12/05/16.
 */

namespace ProductlistModule {
	type ProductGroupViewModel = SCommerce.Website.Code.WebAPI.Models.Product.ProductGroupViewModel;
	type ProductListItemViewModel = SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;
	type SettingsService = PageModule.SettingsService;

	class ProductlistOnerowController {
		public spotdata: any;
		public loadSize: number = 8;
		public pageSize: number = 8;
		public pageIndex: number = 0;
		public totalProducts: number = this.spotdata.TotalProducts;

		public minItemWidth: number = 190;

		public products = [] as Array<ProductListItemViewModel>;
		public filterParams: string = "";
		public fetching: boolean = true;

		private componentId:string = "";

		public containerWidth: number;
		public viewportWidth: number;

		private currentUrl: string = "";

		public active: boolean;
		public hasBeenActive: boolean = false;
		public hasThemeBackground: boolean;
		public themeColors = {
			backgroundColor: "",
			textColor: ""
		};

		private off = null;

		constructor(private filterService: FilterModule.FilterService,
			private $http: ng.IHttpService,
			private $filter: ng.IFilterService,
			private productlistService: ProductListService,
			private $q: ng.IQService,
			private $element,
			private settingsService: SettingsService,
			private $rootScope: ng.IRootScopeService,
			$scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			public translationsService: TranslationsModule.TranslationsService,
			private statesService: UtilsModule.StatesService,
			private responsiveService: UtilsModule.ResponsiveService,
			private trackingService: TrackingModule.TrackingService,
			private swipeService: UtilsModule.SwipeService
		) {

			this.componentId = Math.round(Math.random() * 10000).toString();

			// Theme colors
			if (this.spotdata.BackgroundTheme) {
				this.themeColors.backgroundColor = this.spotdata.BackgroundTheme.Color;
				this.hasThemeBackground = true;
			}
			if (this.spotdata.TextTheme) {
				this.themeColors.textColor = this.spotdata.TextTheme.Color;
			}

			this.calculateSkeletonAmount();

			this.filterService.subscribeFilterUpdate((filterParams) => {
				this.updateProducts(filterParams);
			});

			// Make sure that first request takes URL parameters
			this.filterParams = this.filterService.getFilterParamsFromUrl();

			if (this.active === undefined) {
				this.active = true;
			}

			$scope.$watch(() => {
				return responsiveService.screen.width;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal && this.active) {
					this.calculateAndUpdate();
				}
			});

			$scope.$watch(() => {
				return statesService.states.mobileNavigation;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal && this.active) {
					this.calculateAndUpdate();
				}
			});

			$scope.$watch(() => {
				return this.active;
			}, () => {
				if (this.active && !this.hasBeenActive) {
					this.hasBeenActive = true;

					this.fetching = true;

					this.updateProducts(this.filterParams);

				} else if (this.active) {
					this.calculateAndUpdate();
				}
			});

			//Bug fix for dragging on items
			$element.on("dragstart", (e) => {
				e.preventDefault();
			});
		}
		
		$onInit() {
			setTimeout(()=> {
				//  - activeTimeslot_UPDATED
				this.off = this.$rootScope.$on('REFRESH_PRODUCTS', () => {
					this.updateProducts(this.filterParams);
				});
			},10);
		}
		$onDestroy() {
			if (this.off) {
				this.off();
			}
			
			this.productlistService.cancelRequest(this.currentUrl, this.componentId);
		}

		private calculateSkeletonAmount() {
			const padding = !this.hasThemeBackground ? -10 : 20;
			const width = this.$element[0].offsetWidth;
			let maxPageSize = 8;
			
			while ((width - padding) / maxPageSize < this.minItemWidth && maxPageSize > 2) {
				maxPageSize--;
			}
			
			const skeletonArray = [];
			for (let i = 0; i < maxPageSize; i++) {
				skeletonArray.push({ Id: "Skeleton", Availability: { IsAvailableInStock: true, IsDeliveryAvailable: true } });
			}
			this.products = skeletonArray;
		}

		public updateProducts(filterParams): ng.IPromise<any> {
			var defer = this.$q.defer();
			this.filterParams = filterParams;

			this.getProducts(0, true).then(() => {
				this.pageIndex = 0;
				this.calculateAndUpdate();
				
				defer.resolve();
			});
			
			return defer.promise;
		}

		private getProducts(index: number, reset?: boolean): ng.IPromise<any> {
			var defer = this.$q.defer();
			this.fetching = true;
			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId;
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;
			const productListUrl: string = `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Products/GetByProductGroupId?productGroupId=`;
			const url = productListUrl + this.spotdata.ProductGroupId +
				"&pageindex=" + index +
				"&pagesize=" + this.loadSize +
				(this.filterParams ? "&" + this.filterParams : "") +
				(this.spotdata.ContextId ? "&contextId=" + this.spotdata.ContextId : "");
			this.currentUrl = url;

			this.productlistService.getProducts(url, this.componentId).then((productGroup) => {
				this.totalProducts = productGroup.NumFound;

				if (reset) {
					this.products.splice(0, this.products.length);
				}

				const productsArray = productGroup.Products;
				if (productGroup.Advertisements.length !== 0) {
					productGroup.Advertisements.forEach(item => {
						productsArray.splice(item.Key, 0, item.Value);
					});
				}

				productsArray.forEach((product) => {
					this.products.push(product);
				});

				this.fetching = false;

				this.trackingService.productView(this.products, 'onerow / ' + this.spotdata.Heading);

				defer.resolve();
			});

			return defer.promise;
		}

		public prevPage() {
			this.pageIndex--;
			this.updatePage(this.pageIndex, true);
		}

		public nextPage() {
			if ((this.pageIndex + 2) * this.pageSize > this.products.length && this.products.length < this.totalProducts) {
				let servicePageIndex = Math.ceil((this.pageIndex + 1) * this.pageSize / this.loadSize);
				this.getProducts(servicePageIndex).then(() => {
					this.pageIndex++;
					this.calculateContainer();
					this.updatePage(this.pageIndex, true);
				});
			}
			else {
				this.pageIndex++;
				this.updatePage(this.pageIndex, true);
			}
		}

		public swipe(event) {
			if (event.direction === 2 && this.pageSize * (this.pageIndex + 1) < this.totalProducts) {
				this.nextPage();
			}
			else if (event.direction === 4 && this.pageIndex > 0) {
				this.prevPage();
			}
		}

		public swipeNavigate(event: any) {
			this.swipeService.swipeEvent("local").then((response) => {
				//TODO: Without if in component, reject / resolve only one function
				if (response === "local") {
					if (!(this.statesService.states.mobileNavigation && this.responsiveService.responsiveState.device === 'mobile')) {
						this.swipe(event);
					} else {
						if (event.direction === 2) {
							if (event.distance > 20 && event.angle < -150 || event.angle > 150) {
								this.statesService.setState("mobileNavigation", false);
							}
						} else if (event.direction === 4) {
							if (event.distance > 20 && event.angle <= 30 && event.angle >= -30) {
								this.statesService.setState("mobileNavigation", true);
							}
						}
					}
				}
			});
		}

		private getPageSize(width: number) {
			var maxPageSize = 8;

			while (width / maxPageSize < this.minItemWidth && maxPageSize > 2) {
				maxPageSize--;
			}

			return maxPageSize;
		}

		private calculateAndUpdate() {
			if (this.totalProducts !== 0) {
				let firstProductIndex = 0;
				if (this.pageIndex !== 0) {
					firstProductIndex = (this.pageIndex * this.pageSize) + Math.floor(this.pageSize / 2) < this.products.length ? (this.pageIndex * this.pageSize) + Math.floor(this.pageSize / 2) : this.pageIndex * this.pageSize;
				}

				this.calculateContainer();
				const newPageIndex = Math.floor(firstProductIndex / this.pageSize);
				this.pageIndex = newPageIndex;
				this.updatePage(this.pageIndex);
			}
		}

		private updatePage(pageIndex: number = 0, animate: boolean = false) {
			var pageOffset = -(this.pageIndex * this.viewportWidth);
			var duration = this.pageSize * 70; // MST Calculating speed by pagesize
			if (!animate) {
				duration = 0;
			}

			this.$timeout(() => {
				snabbt(this.$element[0].getElementsByClassName('productlist-onerow__slide-show')[0], {
					position: [pageOffset, 0, 0],
					easing: 'ease',
					duration: duration
				});
			});
		}

		private calculateContainer() {
			let element = this.$element[0];
			let width = element.offsetWidth;
			let container = element.getElementsByClassName('productlist-onerow__item-wrap')[0];

			if (container) {
				const padding = container.offsetLeft * 2;

				while (width === 0) {
					if (element.parentElement === null || element.parentElement.clientWidth === null) {
						return;
					}

					width = element.parentElement.clientWidth;

					if (width === 0) {
						element = element.parentElement;
					}
				}

				var newPageSize = this.getPageSize(width - padding);
				if (newPageSize !== this.pageSize) {
					this.pageSize = newPageSize;
				}
				var itemSize = ((width - padding) / this.pageSize);
				this.containerWidth = itemSize * this.products.length;
				this.viewportWidth = itemSize * this.pageSize;
			}
		}

		public fastTrackLoadMore() {
			this.getProducts(this.pageIndex + 1).then(() => {
				this.pageIndex++;
			});
		}
		public trackClick(product, index) {
			this.trackingService.productClick(product, { position: index + 1 }, 'onerow / ' + this.spotdata.Heading);
		}
	}

	class ProductlistOnerowComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<',
				active: '<'
			};
			this.controller = ProductlistOnerowController;
			this.template = HtmlTemplates.productlist.onerow.html;
		}
	}

	angular.module(moduleId).component("productlistOnerow", new ProductlistOnerowComponent());
}