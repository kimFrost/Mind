///<reference path="../../../../../references/references.ts"/>

namespace CombiSpotModule {

	class CombiSpotProductItemController {

		private off:Function;
		public product: SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;

		constructor($element,
					private $rootScope:ng.IRootScopeService,
					private dialogService:DialogModule.DialogService,
					private translationsService:TranslationsModule.TranslationsService,
					private productHttpService:ProductlistModule.ProducHttpService) {


			setTimeout(()=> {
				this.off = this.$rootScope.$on('REFRESH_PRODUCTS', () => {
					this.productHttpService.update(this.product).then( (newProduct) => {
						angular.merge(this.product, newProduct);
					});
				});
			}, 10);

		}

		$onDestroy() {
			this.off();
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

	class CombiSpotProductItemComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				product: '<',
				productimage: '<'
			};
			this.controller = CombiSpotProductItemController;
			this.template = HtmlTemplates.combispot.productitem.html;
		}
	}

	angular.module(moduleId).component("combispotProductitem", new CombiSpotProductItemComponent());
}
