///<reference path="../../../../references/references.ts"/>

namespace ProductlistModule {

	class ProductlistItemController {
		public product: SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;
		public delay;

		public position = 'product-list';

		constructor(
			private dialogService:DialogModule.DialogService,
			private $element: ng.IRootElementService,
			private translationsService:TranslationsModule.TranslationsService
		) {
			let duration = 500;

			if(this.delay === undefined) {
				this.delay = 0;
			}

			if (this.product.Id === "Skeleton") {
				this.delay = 0;
				duration = 0;
			}
			
			snabbt($element, {
				fromOpacity: 0,
				opacity: 1,
				delay: this.delay,
				duration: duration
			});
		}

		$onInit() {
			this.position = this.$element.hasClass('searchresult__item') ? 'search-result' : this.position;
		}

		public openYoutube(evn, youtubeId, thumbSrc) {
			evn.preventDefault();
			this.dialogService.openYoutubeDialog(youtubeId, thumbSrc, true);
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

	class ProductlistItemComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				product: '<',
				delay: '<'
			};
			this.controller = ProductlistItemController;
			this.template = HtmlTemplates.productlist.item.html;
		}
	}

	angular.module(moduleId).component("productlistItem", new ProductlistItemComponent());
}
