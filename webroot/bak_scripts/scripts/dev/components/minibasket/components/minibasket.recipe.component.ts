///<reference path="../../../../references/references.ts"/>

namespace MinibasketModule {
	class MinibasketRecipeController {
		public recipeData;
		public translations;

		constructor(translationsService: TranslationsModule.TranslationsService) {
			this.translations = translationsService.translations;
		}
	}

	class MinibasketRecipeComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				recipeData: '<'
			};
			this.controller = MinibasketRecipeController;
			this.template = HtmlTemplates.minibasket.recipe.html;
		}
	}

	angular.module(moduleId).component("minibasketRecipe", new MinibasketRecipeComponent());

} 
