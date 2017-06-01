///<reference path="../../../../references/references.ts"/>

namespace AdModule {

	class AdProductController {
		public product:SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;
		public delay;

		constructor(private $element:ng.IRootElementService,
					private dialogService:DialogModule.DialogService,
					private translationsService:TranslationsModule.TranslationsService) {

			if (this.delay === undefined) {
				this.delay = 0;
			}

			$element.addClass('ad-product');

			snabbt($element, {
				scale: [1, 1],
				fromScale: [0.8, 0.8],
				fromOpacity: 0,
				opacity: 1,
				delay: this.delay,
				duration: 200
			});

		}

		public showDeliveryInfoDialog(evn) {
			evn.preventDefault();

			let dialogMsg = '';
			this.product.Availability.ReasonMessageKeys.forEach((text) => {
				dialogMsg += `<div>${text}</div>`;
			});

			const dialogObj = {
					header: this.translationsService.translations.ProductDetail.Availability.DeliveryInfo,
					content: dialogMsg,
					close: true,
					size: 'medium',
					buttons: {
						button1:{
							text: this.translationsService.translations.General.Responses.OkayShort,
							callback: false,
							confirm: true
						}
					}
				} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj);
		}

	}

	class AdProductComponent implements ng.IComponentOptions {
		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				product: '<',
				delay: '<'
			};
			this.controller = AdProductController;
			this.template = HtmlTemplates.ad.product.html;
		}
	}

	angular.module(moduleId).component("adProduct", new AdProductComponent());
}
