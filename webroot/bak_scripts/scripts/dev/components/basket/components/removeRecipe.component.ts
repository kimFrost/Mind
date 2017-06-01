///<reference path="../../../../references/references.ts"/>

namespace BasketModule {

	class RemoveRecipeController {
		public recipeId: string;

		constructor(private basketService: BasketService, public translationsService: TranslationsModule.TranslationsService) {
		}

		public clickRemove(evn) {
			evn.preventDefault();
			this.basketService.removeRecipe(this.recipeId);
		}
	}

	class RemoveRecipeComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				recipeId: "<"
			};
			this.controller = RemoveRecipeController;
			this.template = HtmlTemplates.removeRecipe.html;
		}

	}

	angular.module(moduleId).component('removeRecipe', new RemoveRecipeComponent());
}
