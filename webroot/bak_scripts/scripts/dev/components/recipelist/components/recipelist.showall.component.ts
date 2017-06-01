///<reference path="../../../../references/references.ts"/>

namespace RecipelistModule {

	class RecipelistShowallController {
		public spotdata: any;
		public recipeData = [];

		constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
			this.get();
		}

		public get() {
			this.$http.get(`/webapi/recipe/GetByRecipeGroupId?recipeGroupId=${this.spotdata.RecipeGroupId}${this.spotdata.ContextId ? "&contextId=" + this.spotdata.ContextId : ""}`).then((response: any) => {
				response.data.Recipes.forEach((item) => {
					this.recipeData.push(item);
				});
			});
		}
	}

	class RecipelistShowallComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = RecipelistShowallController;
			this.template = HtmlTemplates.recipelist.showall.html;
		}
	}

	angular.module(moduleId).component("recipelistShowall", new RecipelistShowallComponent());
}