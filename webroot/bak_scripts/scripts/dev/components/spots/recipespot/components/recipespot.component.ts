///<reference path="../../../../../references/references.ts"/>

namespace RecipeSpotModule {

	interface IRecipeListItem extends SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeListItemViewModel {
		inBasket: boolean;
	}

	// Component UI states
	interface IComponentUiStates {
		inBasket: boolean;
		showLoader: boolean;
		showBasketSummary: boolean;
	}

	class RecipeSpotController {
		public spotdata: any;
		public updatedSpotData: any;
		public hasRecipeItem: boolean;

		public servings: number;
		public servingsPending: number;

		public sorting: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel;
		public sortingPending: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel;

		// Message settings
		public messageObject = {
			productsCount: 0,
			type: 1,
			timer: null
		};

		public uiStates: IComponentUiStates = {
			inBasket: false,
			showLoader: false,
			showBasketSummary: false
		};

		// DOM elements
		public basketSummaryElement;

		constructor(public translationsService: TranslationsModule.TranslationsService,
					private $scope: ng.IScope,
					private $element,
					private $timeout: ng.ITimeoutService,
					private basketService: BasketModule.BasketService,
					private recipeService: RecipeModule.RecipeService,
					private testConditionService: UtilsModule.TestConditionService,
					private $http: ng.IHttpService) {
		}

		$onInit () {
			this.hasRecipeItem = this.spotdata.Recipe !== null;

			// Check if recipe exists before executing logic
			if (this.hasRecipeItem) {
				this.updateSpotDataFromSitecoreItem();
				this.watchBasketChanges();

				this.servings = this.spotdata.Recipe.NumberOfPersons;
				this.servingsPending = this.spotdata.Recipe.NumberOfPersons;

				// Setup DOM references
				this.basketSummaryElement = this.$element[0].getElementsByClassName('recipespot-summary');
			}
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


		// Updates states depending on basket changes. Handy for page reload.
		private watchBasketChanges () {
			this.$scope.$watch(() => {
				return this.basketService.basket;
			}, () => {
				if (this.basketService.basket.Recipes) {
					this.uiStates.inBasket = false;

					this.basketService.basket.Recipes.forEach((recipe) => {
						if (recipe.Id === this.updatedSpotData.Recipe.Id) {
							this.uiStates.inBasket = true;
						}
					});
				}
				else {
					this.uiStates.inBasket = false;
				}
			});
		}


		/**
		 * @author TTH
		 * @description Update some data from the sitecore spot item, that will override some fields from the sitecore recipe item
		 * Header and Image data will be set to the ones that belong to the sitecore spot item and not the sitecore recipe item 
		 * @private
		 */ 
		private updateSpotDataFromSitecoreItem() {

			// Create a new object from the spot data object
			this.updatedSpotData = angular.copy(this.spotdata);

			// Set correct image from the sitecore spot item
			if (this.updatedSpotData.ImageForJson !== null) {
				this.updatedSpotData.Recipe.PrimaryImage = this.updatedSpotData.ImageForJson.Url;
			}

			// Set the corret Header from the sitecore spot item
			if (this.updatedSpotData.Header !== "") {
				this.updatedSpotData.Recipe.Name = this.updatedSpotData.Header;
			}
			
			this.updatedSpotData.hasSupplementProducts = this.makeSureIsValidArrayData(this.updatedSpotData.Recipe.SupplementProducts);
			this.updatedSpotData.hasSoldOutProducts = this.makeSureIsValidArrayData(this.updatedSpotData.Recipe.SoldOutProducts);

			// Set initial values for dropdowns
			this.sorting = this.updatedSpotData.Recipe.SortingList[0];
			this.sortingPending = this.updatedSpotData.Recipe.SortingList[0];
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

		// Handler for changing amount of servings
		public changeServings() {
			if (!this.uiStates.inBasket) {
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

		// Handler for changing recipe sorting
		public changeSorting() {
			if (!this.uiStates.inBasket) {
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

		/**
		 * @author NNH/TTH
		 * @description Add recipe to basket
		 * @param {number} type
		 */
		public addToBasket(type: number) {

			// Show loader
			this.showLoader();
			
			// Call API and add recipe to basket
			this.basketService.addRecipeWithDefaults(this.updatedSpotData.Recipe.Id, this.servings, this.sorting.UrlName).then(() => {
				this.messageObject.type = type;

				// Set ui state
				this.uiStates.showBasketSummary = true;					

				// Loop through the basket and count the items that belong to the recipe just added 
				this.basketService.basket.Recipes.forEach((item) => {
					this.messageObject.productsCount = item.Id === this.updatedSpotData.Recipe.Id ? item.ProductIds.length : 0;
				});

				// Hide loader
				this.hideLoader();
			});
		}

		// Remove recipe from basket
		public removeFromBasket() {
			this.showLoader();

			this.basketService.removeRecipe(this.updatedSpotData.Recipe.Id).then(() => {
				this.uiStates.showBasketSummary = false;
				this.hideLoader();
			});
		}
	}

	class RecipeSpotComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = RecipeSpotController;
			this.template = HtmlTemplates.recipespot.html;
		}
	}

	angular.module(moduleId).component("recipespot", new RecipeSpotComponent());

} 
