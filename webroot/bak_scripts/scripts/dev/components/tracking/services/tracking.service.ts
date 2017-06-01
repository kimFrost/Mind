///<reference path="../../../../references/references.ts"/>

namespace TrackingModule {

	type MetaDataService = PageModule.MetaDataService;
	type SettingsService = PageModule.SettingsService;
	type ConfirmationObj = SCommerce.Website.Code.WebAPI.Models.Order.OrderConfirmationViewModel;

	export class TrackingService {

		private userId: string = "";
		private zipCode: string = "";

		private basketService: BasketModule.BasketService;
		private contentService: PageModule.ContentService;

		constructor(private raptorTrackingService: RaptorTrackingService,
			private googleTrackingService: GoogleTrackingService,
			private metadataService: MetaDataService,
			private settingsService: SettingsService,
			private $window: ng.IWindowService,
			private $injector,
			private $timeout: ng.ITimeoutService,
			private $rootScope: ng.IRootScopeService) {
			this.userId = this.settingsService.settings.UserId;
			this.zipCode = this.settingsService.settings.ZipCode;


			$timeout(() => {
				this.basketService = $injector.get('basketService');
				this.contentService = $injector.get('contentService');
			}, 10);

			$rootScope.$on('$stateChangeStart', () => {
				this.timing.start = performance.now();
				this.googleTrackingService.flushDataLayer();
			});
			$rootScope.$on('$stateChangeSuccess', () => {
				this.timing.ready = performance.now();
			});
			$rootScope.$on('$viewContentLoaded', () => {
				if(this.timing.start > 0) {
					this.timing.loaded = performance.now();
					this.googleTrackingService.trackTiming('$stateChangeSuccess',this.timing.ready - this.timing.start);
					this.googleTrackingService.trackTiming('$viewContentLoaded',this.timing.loaded - this.timing.start);
					this.googleTrackingService.trackTiming('ViewRenderTime',this.timing.loaded - this.timing.ready);
				}
				this.timing.start = 0;
			});

		}

		private timing = { start:0, ready:0, loaded:0 };

		public addRecipe(recipeId, products, name, list=false) {
			const fakeProduct = {
				Price:0,
				Name:name,
				Id:recipeId,
				Category: (list ? 'Opskrift fra liste' : 'Opskrift'),
				Brand:null
			};
			const fakeNoIdProduct = angular.copy(fakeProduct);
			fakeNoIdProduct.Id = null;

			this.raptorTrackingService.trackAddToBasket(fakeNoIdProduct, 1, this.userId, recipeId);
			this.googleTrackingService.trackAddToBasket(fakeProduct, 1, 'recipe');

			if (products && products.length) {
				products.forEach(product => {
					if(product.Product) {
						this.updateBasket(product.Product, product.Product.AmountForCurrentRecipe, 'recipe');
					}
				});
			}
		}


		public pageVisit(searchResultsCount?:number) {

			var pageUrl = this.$window.location.pathname;
			var id = this.metadataService.pageMetaData.TrackingId;
			var title = this.metadataService.pageMetaData.NavigationTitle;
			var categoryPath = this.metadataService.pageMetaData.CategoryPath;
			//wrapped in timeout so we are sure the contentService is $injected asyncronously
			this.$timeout(() => {

				if(this.$window.location.search.indexOf('?search=') === 0) {
					if(searchResultsCount || searchResultsCount === 0) {
						this.googleTrackingService.trackPageview((this.$window.location.pathname+this.$window.location.search).toLowerCase()+'&results='+searchResultsCount, title, this.userId);
					}
					return;
				}

				if (this.metadataService.pageMetaData.Name === 'Product') {
					let product = this.contentService.content[0];
					var price = product.Price;
					this.raptorTrackingService.trackPageVisit(id, title, categoryPath, price, this.userId, null, this.zipCode);

					this.googleTrackingService.trackProductDetailView(product);
				}

				if (this.metadataService.pageMetaData.Name === 'Recipe') {
					this.raptorTrackingService.trackPageVisit(null, title, categoryPath, null, this.userId, id, this.zipCode);
				}


				this.googleTrackingService.trackPageview(pageUrl, title, this.userId);

			}, 20);

		}

		public trackCustomerService(linkText:string = '') {
			this.googleTrackingService.trackCustomerService(linkText);
		}

		public trackAddPostalCode(postalcode:Number = 0, deliverable:string) {
			this.googleTrackingService.trackAddPostalCode(postalcode, deliverable);
		}

		public trackCustomPageView(pageUrl:string = '', title:string = '', userId:string = '') {
			this.googleTrackingService.trackPageview(pageUrl, title, userId);
		}

		public productClick(product, extension = {}, list = '', namePrefix = '', event:string = 'productclick') {
			this.googleTrackingService.trackProductClick(product, extension, list, namePrefix, event);
		}

		public productView(products, list = '', namePrefix='') {

			var onlyProducts = products.filter(product => product.TemplateName !== 'advertisement');

			this.googleTrackingService.trackProductView(onlyProducts, list, namePrefix);

			if(onlyProducts.length < products.length) {
				var promos = products.filter(product => product.TemplateName === 'advertisement');
				if(promos.length) {
					this.googleTrackingService.trackPromoImpression(promos);
				}
			}
			
		}

		public updateBasket(product, quantityDelta = 0, position = '') {
			if(!product || !quantityDelta) { return; }
			if (quantityDelta > 0) {
				this.googleTrackingService.trackAddToBasket(product, quantityDelta, position);
				this.raptorTrackingService.trackAddToBasket(product, quantityDelta, this.userId, (!product.Id && product.recipeId)?product.recipeId:null);
			} else {
				this.googleTrackingService.trackRemoveFromBasket(product, -1 * quantityDelta);
				//don't track removals to raptor!
			}
			
		}

		public checkout(step: number, option?: string, confirmationObj?: ConfirmationObj) {
			//wrapped in timeout so we are sure the basketService is $injected asyncronously
			this.$timeout(() => {
				if (step !== 4) {
					if (this.basketService.basket.Lines) {
						this.googleTrackingService.trackCheckout(step, this.basketService.basket.Lines, option);
					} else {
						// If visiting checkout directly, basket will be undefined, as the checkout tracking call will be called before the basket is available.
						// Therefore we wait till the basket is defined and we remove the rootscope listener.
						let basketReady;
						basketReady = this.$rootScope.$on("BASKET_READY_TRACKING", () => {
							basketReady();
							this.googleTrackingService.trackCheckout(step, this.basketService.basket.Lines, option);
						});
					}
				} else if (step === 4) {
					this.googleTrackingService.trackCheckout(step, confirmationObj.Lines, option);

					this.googleTrackingService.trackPurchase(confirmationObj);
					this.raptorTrackingService.trackBuy(confirmationObj, this.userId);
				}
			}, 20);
		}

		public login(user?: UserModule.MemberViewModel) {
			if (user) {
				this.userId = user.DebitorId;
				this.googleTrackingService.trackLogin(user.DebitorId);
			} else {
				this.userId = null;
				this.googleTrackingService.trackLogout();
			}
		}

		public trackPromoImpression(promos) {
			this.googleTrackingService.trackPromoImpression(promos);
		}
		public trackPromoClick(promo, position?) {
			this.googleTrackingService.trackPromoClick(promo, position);
		}

		public trackRefund(orderNumber, refundType="cancel") {
			this.googleTrackingService.trackRefund(orderNumber, refundType);

			if (refundType === "edit") {
				// Track adding back all the items when editing order
				this.basketService.basket.Lines.forEach(line => {
					this.updateBasket(line, line.Quantity);
				});

			}
		}

	}

	angular.module(moduleId).service("trackingService", TrackingService);

}
