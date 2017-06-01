///<reference path="../../../../references/references.ts"/>

namespace ProductlistModule {
	type ProductGroupViewModel = SCommerce.Website.Code.WebAPI.Models.Product.ProductGroupViewModel;
	type ProductListItemViewModel = SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;

	class ProductlistShowAllController {
		public spotdata: any;

		public products = [] as Array<ProductListItemViewModel>;

		public filterParams: string = "";
		public fetching: boolean = false;

		private componentId:string = "";
		
		private currentUrl:string = "";

		constructor(
			private $filter: ng.IFilterService,
			private filterService: FilterModule.FilterService,
			private productlistService: ProductListService,
			private settingsService: PageModule.SettingsService,
			private trackingService: TrackingModule.TrackingService,
			private $element, 
			private $rootScope: ng.IRootScopeService
		) {
			
			this.componentId = Math.round(Math.random() * 10000).toString();

			this.calculateSkeletonAmount();
			this.fetching = true;
			this.filterService.subscribeFilterUpdate((filterParams) => {
				this.updateProducts(filterParams);
			});

			// Make sure that first request takes URL parameters
			this.filterParams = this.filterService.getFilterParamsFromUrl();

			this.updateProducts(this.filterParams);
		}

		private calculateSkeletonAmount() {
			const skeletonArray = [];
			for (let i = 0; i < Math.floor((this.$element[0].offsetWidth + 10) / 190) * 2; i++) {
				skeletonArray.push({ Id: "Skeleton", Availability: { IsAvailableInStock: true, IsDeliveryAvailable: true } });
			}
			this.products = skeletonArray;
		}

		private off:Function;
		$onInit() {
			setTimeout(()=> {
				this.off = this.$rootScope.$on('REFRESH_PRODUCTS', () => {
					this.updateProducts(this.filterParams);
				});
			},10);
		}
		$onDestroy() {
			this.off();
			this.productlistService.cancelRequest(this.currentUrl, this.componentId);
		}

		public updateProducts(filterParams) {
			this.filterParams = filterParams;
			this.getProducts();
		}

		private getProducts() {
			this.fetching = true;
			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId;
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;
			const productListUrl: string = `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Products/GetByProductGroupId?productGroupId=`;
			const url = productListUrl + this.spotdata.ProductGroupId +
				(this.filterParams ? "&" + this.filterParams : "") +
				(this.spotdata.ContextId ? "&contextId=" + this.spotdata.ContextId : "");
			this.currentUrl = url;

			this.productlistService.getProducts(url, this.componentId).then((productGroup) => {

				this.products.splice(0, this.products.length);
				const productsArray = productGroup.Products;
				if (productGroup.Advertisements.length !== 0) {
					productGroup.Advertisements.forEach(item => {
						productsArray.splice(item.Key, 0, item.Value);
					});
				}

				productsArray.forEach((product) => {
					this.products.push(product);
				});

				this.trackingService.productView(this.products, 'showall / ' + this.spotdata.Heading);

				this.fetching = false;
			});
		}

		public trackClick(product, index) {
			this.trackingService.productClick(product, { position: index + 1 }, 'showall / ' + this.spotdata.Heading);
		}

	}

	class ProductlistShowAllComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = ProductlistShowAllController;
			this.template = HtmlTemplates.productlist.showall.html;
		}
	}

	angular.module(moduleId).component("productlistShowAll", new ProductlistShowAllComponent());
}
