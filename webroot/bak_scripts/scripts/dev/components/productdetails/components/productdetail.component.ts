///<reference path="../../../../references/references.ts"/>

namespace ProductDetailsModule {

	class ProductDetailController {

		private off:Function;
		public productData: SCommerce.Website.Code.WebAPI.Models.Product.ProductViewModel;
		public translations: Object;

		private settings: any;
		public productLogos: {};

		constructor(private translationsService: TranslationsModule.TranslationsService,
					private settingsService: PageModule.SettingsService,
					private dialogService: DialogModule.DialogService,
					private $rootScope:ng.IRootScopeService,
					private productHttpService:ProductlistModule.ProducHttpService,
					private $scope:ng.IScope) {

			this.translations = translationsService.translations;
			this.settings = settingsService.settings;

			// If settings, we cherry pick the product logos and apply them to the product data
			if (settingsService.settings !== undefined && settingsService.settings !== null) {
				this.productLogos = settingsService.settings.SiteLogosSettings;
			}

			setTimeout(()=> {
				this.off = this.$rootScope.$on('REFRESH_PRODUCTS', () => {
					this.productHttpService.update(this.productData).then( (newProduct) => {
						angular.merge(this.productData, newProduct);
					});
				});
			},10);
		}

		$onDestroy() {
			this.off();
		}

		$onInit() {
			this.$scope.$on('showDeliveryInfoDialog', () => {
				this.showDeliveryInfoDialog();
			});
		}

		public showDeliveryInfoDialog(evn?) {
			if (evn) {
				evn.preventDefault();
			}
			if (!this.productData || !this.productData.Availability) {
				return;
			}

			let dialogMsg = '';
			this.productData.Availability.ReasonMessageKeys.forEach((text) => {
				dialogMsg += `<div>${text}</div>`;
			});

			const dialogObj = {
				header: this.translationsService.translations.ProductDetail.Availability.DeliveryInfo,
				content: dialogMsg,
				close: true,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.General.Responses.OkayShort,
						callback: false,
						confirm: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj);
		}

	}

	class ProductDetailComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				productData: '<'
			};
			this.controller = ProductDetailController;
			this.template = HtmlTemplates.productdetail.html;
		}
	}

	angular.module(moduleId).component("productDetail", new ProductDetailComponent());
}
