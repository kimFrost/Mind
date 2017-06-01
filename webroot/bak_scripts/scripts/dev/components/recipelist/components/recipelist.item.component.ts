///<reference path="../../../../references/references.ts"/>

namespace RecipelistModule {
	interface IRecipeListItem extends SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeListItemViewModel {
		inBasket: boolean;
		supplementProducts: SCommerce.Website.Code.WebAPI.Models.Recipe.SupplementProductViewModel[];
		soldOutProducts: SCommerce.Website.Code.WebAPI.Models.Recipe.SupplementProductViewModel[];
	}

	// Component UI states
	interface IComponentUiStates {
		showLoader: boolean;
	}

	class RecipelistItemController {
		public recipeData: IRecipeListItem;

		public hasSupplementProducts: boolean;
		public hasSoldOutProducts: boolean;

		public servings: number = this.recipeData.NumberOfPersons;
		public servingsPending: number = this.recipeData.NumberOfPersons;

		public sorting: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel = this.recipeData.SortingList[0];
		public sortingPending: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel = this.recipeData.SortingList[0];

		public uiStates: IComponentUiStates = {
			showLoader: false
		};

		public msgObj = {
			productsCount: 0,
			type: 0
		};

		private msgTimer;

		constructor(public translationsService: TranslationsModule.TranslationsService,
			$scope: ng.IScope,
			private $element,
			private $timeout: ng.ITimeoutService,
			private basketService: BasketModule.BasketService,
			private recipeService: RecipeModule.RecipeService,
			private $http: ng.IHttpService) {

			$scope.$watch(() => {
				return basketService.basket;
			}, () => {
				if (basketService.basket.Recipes) {
					this.recipeData.inBasket = false;

					basketService.basket.Recipes.forEach((recipe) => {
						if (recipe.Id === this.recipeData.Id) {
							this.recipeData.inBasket = true;
							this.recipeData.supplementProducts = recipe.SupplementProducts;
							this.recipeData.soldOutProducts = recipe.SoldOutProducts;

							// Override servings
							this.servingsPending = recipe.Persons;
							this.servings = this.servingsPending;
						}
					});

					this.hasSupplementProducts = this.makeSureIsValidArrayData(this.recipeData.supplementProducts);
					this.hasSoldOutProducts = this.makeSureIsValidArrayData(this.recipeData.soldOutProducts);
				}
				else {
					this.recipeData.inBasket = false;
				}
			});
		}



		/**
		 * @author TTH
		 * @description Show nemlig loader 
		 * @private
		 * 
		 */
		private showLoader() {
			this.uiStates.showLoader = true;
		}

		/**
		 * @author TTH
		 * @description Hide nemlig loader
		 * @private
		 * 
		 */
		private hideLoader() {
			this.uiStates.showLoader = false;
		}

		// Test if array
		private makeSureIsValidArrayData (data) {
			if (data === null || data === undefined) {
				data = [];
				return false;
			} else {
				if (data.length !== 0) {
					return true;
				} else {
					return false;
				}
			}
		}

		public changeServings() {
			if (!this.recipeData.inBasket) {
				this.servings = this.servingsPending;
			}
			else {
				this.recipeService.showModal(this.translationsService.translations.Recipe.Messages.ConfirmChangeServingsHeader, '<div>' + this.translationsService.translations.Recipe.Messages.ConfirmChangeServingsBody + '</div>').then((response) => {
					if (response === 1) {
						this.servings = this.servingsPending;
						this.addToBasket(2);
					}
					else if (response === 2) {
						this.servingsPending = this.servings;
					}
				});
			}
		}

		public changeSorting() {
			if (!this.recipeData.inBasket) {
				this.sorting = this.sortingPending;
			}
			else {
				this.recipeService.showModal(this.translationsService.translations.Recipe.Messages.ConfirmChangeSortingHeader, '<div>' + this.translationsService.translations.Recipe.Messages.ConfirmChangeSortingBody + '</div>').then((response) => {
					if (response === 1) {
						this.sorting = this.sortingPending;
						this.addToBasket(2);
					}
					else if (response === 2) {
						this.sortingPending = this.sorting;
					}
				});
			}
		}

		public addToBasket(type: number) {

			this.showLoader();

			this.basketService.addRecipeWithDefaults(this.recipeData.Id, this.servings, this.sorting.UrlName).then(() => {

				this.hideLoader();

				this.msgObj.type = type;

				this.basketService.basket.Recipes.forEach((item) => {
					this.msgObj.productsCount = item.Id === this.recipeData.Id ? item.ProductIds.length : 0;
				});
				
				this.$element.addClass('recipelist-item_show-msg');
				this.$element.removeClass('recipelist-item_hide-msg');
				this.$timeout.cancel(this.msgTimer);
				this.msgTimer = this.$timeout(() => {
					this.$element.removeClass('recipelist-item_show-msg');
					this.$element.addClass('recipelist-item_hide-msg');
					this.$timeout(() => {
						this.$element.removeClass('recipelist-item_hide-msg');
					}, 500);
				}, 4000);
			});
		}

		public removeFromBasket() {
			this.basketService.removeRecipe(this.recipeData.Id);
		}
	}

	class RecipelistItemComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				recipeData: '<'
			};
			this.controller = RecipelistItemController;
			this.template = HtmlTemplates.recipelist.item.html;
		}
	}

	angular.module(moduleId).component("recipelistItem", new RecipelistItemComponent());
}