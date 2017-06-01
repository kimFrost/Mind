///<reference path="../../../../references/references.ts"/>

namespace RecipeModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	type TranslationsViewModel = SCommerce.Core.Dictionary.Translations;

	class RecipeProductItemController {
		public translations:TranslationsViewModel;
		public product:SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;
		public delay;

		constructor(private $element,
					public recipeService:RecipeService,
					public translationsService:TranslationsService,
					private $scope:ng.IScope) {

			this.translations = translationsService.translations;

			if (this.delay === undefined) {
				this.delay = 0;
			}

			snabbt($element, {
				scale: [1, 1],
				fromScale: [0.8, 0.8],
				fromOpacity: 0,
				opacity: 1,
				delay: this.delay,
				duration: 200
			});
		}

		public selectProduct = () => {
			this.$scope.$emit('recipeProductItem:SelectProduct', this.product);
		};

	}

	class RecipeProductItemComponent implements ng.IComponentOptions {
		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				product: '<',
				delay: '<'
			};
			this.controller = RecipeProductItemController;
			this.template = HtmlTemplates.recipe.productitem.html;
		}
	}

	angular.module(moduleId).component("recipeProductItem", new RecipeProductItemComponent());
}
