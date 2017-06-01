///<reference path="../../../../references/references.ts"/>

namespace RecipelistModule {
	class RecipelistOnerowController {
		public spotdata: any;
		public recipeData = [];
		public numFound: number;

		public pageSize = 3;
		public pageIndex = 0;

		public hasThemeBackground: boolean;
		public themeColors = {
			backgroundColor: "",
			textColor: ""
		};

		constructor(private $q: ng.IQService, private $http: ng.IHttpService, public translationsService: TranslationsModule.TranslationsService) {

			// Theme colors
			if (this.spotdata.BackgroundTheme) {
				this.themeColors.backgroundColor = this.spotdata.BackgroundTheme.Color;
				this.hasThemeBackground = true;
			}
			if (this.spotdata.TextTheme) {
				this.themeColors.textColor = this.spotdata.TextTheme.Color;
			}

			this.get();
		}

		public get() {
			this.$http.get(`/webapi/recipe/GetByRecipeGroupId?recipeGroupId=${this.spotdata.RecipeGroupId}&pagesize=${this.pageSize}&pageIndex=${this.pageIndex}${this.spotdata.ContextId ? "&contextId=" + this.spotdata.ContextId : ""}`).then((response: any) => {
				this.numFound = response.data.NumFound;

				response.data.Recipes.forEach((item) => {
					this.recipeData.push(item);
				});
			});
		}

		public loadMore() {
			this.pageIndex++;

			this.get();
		}
	}

	class RecipelistOnerowComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = RecipelistOnerowController;
			this.template = HtmlTemplates.recipelist.onerow.html;
		}
	}

	angular.module(moduleId).component("recipelistOnerow", new RecipelistOnerowComponent());
}
