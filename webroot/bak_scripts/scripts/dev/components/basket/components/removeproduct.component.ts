///<reference path="../../../../references/references.ts"/>

namespace BasketModule {

	class RemoveProductController {
		public productId: string;
		public recipeId: string;

		constructor(private basketService: BasketService) {
		}

		public clickRemove(evn) {
			evn.preventDefault();
			if (this.productId) {
				this.basketService.updateProduct(this.productId, 0);
			}
			if (this.recipeId) {
				this.basketService.removeRecipe(this.recipeId);
			}
		}
	}

	class RemoveProductComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				productId: "<",
				recipeId: "<"
			};
			this.controller = RemoveProductController;
			this.template = HtmlTemplates.removeproduct.html;
		}

	}

	angular.module(moduleId).component('removeProduct', new RemoveProductComponent());

}
