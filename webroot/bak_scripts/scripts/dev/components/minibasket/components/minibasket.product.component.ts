///<reference path="../../../../references/references.ts"/>

namespace MinibasketModule {
	class MinibasketProductController {
		public productData;
		public translations;
		public addToBasketBtn: boolean = false;

		private showTimeout;
		private hideTimeout;

		constructor(private $timeout: ng.ITimeoutService, translationsService: TranslationsModule.TranslationsService) {
			this.translations = translationsService.translations;
		}

		public showAddToBasketBtn() {
			if (this.showTimeout) {
				this.hoverCancelShow();
			}

			this.addToBasketBtn = true;
		}

		public hideAddToBasketBtn() {
			this.addToBasketBtn = false;
		}

		public hoverShowAddToBasketBtn() {
			this.showTimeout = this.$timeout(() => {
				this.showAddToBasketBtn();
			}, 200);
		}

		public hoverCancelShow() {
			this.$timeout.cancel(this.showTimeout);
		}

		public hideAddToBasketAfterDelay() {
			this.hideTimeout = this.$timeout(() => {
				this.hideAddToBasketBtn();
			}, 1000);
		}

		public cancelHide() {
			if (this.hideTimeout) {
				this.$timeout.cancel(this.hideTimeout);
			}
		}
	}

	class MinibasketProductComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				productData: '<'
			};
			this.controller = MinibasketProductController;
			this.template = HtmlTemplates.minibasket.product.html;
		}
	}

	angular.module(moduleId).component("minibasketProduct", new MinibasketProductComponent());

} 
