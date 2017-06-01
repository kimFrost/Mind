///<reference path="../../../../references/references.ts"/>

namespace RecipeModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type BasketService = BasketModule.BasketService;
	type DialogService = DialogModule.DialogService;
	type TimeslotService = TimeslotModule.TimeslotService;

	type RecipeDetailViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeDetailViewModel;
	type RecipeProductSelectionViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductSelectionViewModel;

	type SortViewModel = SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel;

	type TranslationsViewModel = SCommerce.Core.Dictionary.Translations;

	enum ERecipeMsgType {
		Added,
		Updated
	}

	interface IRecipeProductSelectionViewModelEnriched extends SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductSelectionViewModel {
		checked: boolean;
	}

	interface IRecipeMsgObj {
		productsCount: number;
		type: ERecipeMsgType;
	}

	class RecipeController {
		public spotdata:RecipeDetailViewModel;
		public translations:TranslationsViewModel;
		public anySupplementProducts = false;

		public products:Array<IRecipeProductSelectionViewModelEnriched> = [];

		public sorting:SortViewModel;
		public sortingPending:SortViewModel;
		public servings:number;
		private servingsPending:number;

		private off:Function;

		private msgTimer;

		public msgObj = {
				productsCount: 0,
				type: ERecipeMsgType.Added
			} as IRecipeMsgObj;

		public states = {
			inBasket: false,
			pending: false
		};

		constructor(private $element,
					private recipeService:RecipeService,
					private $scope:ng.IScope,
					private $timeout:ng.ITimeoutService,
					private basketService:BasketService,
					private dialogService:DialogService,
					private $rootScope: ng.IRootScopeService,
					private timeslotService:TimeslotService,
					public translationsService:TranslationsService,
					public responsiveService:UtilsModule.ResponsiveService,
					public trackingService: TrackingModule.TrackingService) {

			$element.addClass('recipe');

			this.translations = translationsService.translations;

			this.servings = this.spotdata.NumberOfPersons;
			this.servingsPending = this.spotdata.NumberOfPersons;

			// Set default sort order
			this.spotdata.SortingList.some((item) => {
				if (item.IsSelected) {
					this.sorting = item;
					this.sortingPending = item;
					return true;
				}
			});

			//~~ Check it recipe is in basket ~~//
			this.$scope.$watch(() => {
				return basketService.basket;
			}, () => {
				if (basketService.basket.Recipes) {
					this.states.inBasket = false;
					basketService.basket.Recipes.forEach((recipe) => {
						if (recipe.Id === this.spotdata.RecipeId) {
							this.states.inBasket = true;
							// Override servings
							this.servingsPending = recipe.Persons;
							this.servings = this.servingsPending;
						}
					});
				}
				else {
					this.states.inBasket = false;
				}
			});
		}

		$onInit() {
			this.forceUpdateProducts(false);

			this.off = this.$rootScope.$on('REFRESH_PRODUCTS', () => {
				this.forceUpdateProducts(false);
			});

		}
		$onDestroy() {
			this.off();
		}


		private convertProduct = (product:RecipeProductSelectionViewModel):IRecipeProductSelectionViewModelEnriched => {
			return <IRecipeProductSelectionViewModelEnriched>product;
		};

		public roundAndFix = (value:Number):string => {
			// parseFloat and toString is used to remove unwanted zeroes at the end
			return parseFloat(value.toFixed(3).replace(/[.,]000$/, '')).toString();

		};

		public changeServings = () => {
			if (!this.states.inBasket) {
				this.servings = this.servingsPending;
				this.forceUpdateProducts(true);
			}
			else {
				this.recipeService.showModal(this.translations.Recipe.Messages.ConfirmChangeServingsHeader, '<div>' + this.translations.Recipe.Messages.ConfirmChangeServingsBody + '</div>').then((response) => {
					if (response === 1) {
						this.servings = this.servingsPending;
						this.forceUpdateProducts(true);
					}
					else if (response === 2) {
						this.servingsPending = this.servings;
					}
				});
			}
		};

		public updateProductBySorting = () => {
			if (this.sortingPending) {
				//~~ Warn user of change ~~//
				if (this.states.inBasket) {
					this.recipeService.showModal(this.translations.Recipe.Messages.ConfirmChangeSortingHeader, '<div>' + this.translations.Recipe.Messages.ConfirmChangeSortingBody + '</div>').then((response) => {
						if (response === 1) {
							this.sorting = this.sortingPending;
							this.forceUpdateProducts(true);
						}
						else if (response === 2) {
							this.sortingPending = this.sorting;
						}
					});
				}
				else {
					this.sorting = this.sortingPending;
					this.forceUpdateProducts(true);
				}
			}
		};

		private forceUpdateProducts = (updateBasket:boolean) => {

			this.$scope.$broadcast('RecipeProduct::toggleOpen', false); //~~ Close all open products ~~//

			this.states.pending = true;

			//~~ Get new products based on sorting ~~//
			this.recipeService.getProductsBySorting(this.spotdata.RecipeId, this.sorting.UrlName, this.servings).then((response) => {

				//~~ Check for any supplements products~~//
				this.anySupplementProducts = false;
				response.Products.forEach((product, index) => {
					if (product.IsSupplementProduct) {
						this.anySupplementProducts = true;
					}
					//~~ Convert product viewmodel and replace ~~//
					let replacerProduct = this.convertProduct(product);
					if (this.products[index]) {
						replacerProduct.checked = this.products[index].checked;
					}
					this.products[index] = replacerProduct;
				});
				
				this.$scope.$broadcast('Recipe::productsUpdated');

				//~~ If recipe is in basket already, then remove and re-add with new products ~~//
				if (this.states.inBasket && updateBasket) {
					this.removeFromBasket(false).then(() => {
						this.addToBasket(ERecipeMsgType.Updated);
					});
				}
			}).finally(() => {
				this.states.pending = false;
			});
		};


		public addToBasket = (type:ERecipeMsgType = ERecipeMsgType.Added) => {
			let checkedProducts:Array<RecipeProductSelectionViewModel> = [];
			let supplementProducts:Array<RecipeProductSelectionViewModel> = [];
			let soldoutProducts:Array<RecipeProductSelectionViewModel> = [];

			let anyNoDelivery = false;
			let anyNoDeliveryEssential = false;
			let anySoldOut = false;
			let anySoldOutEssential = false;

			this.products.forEach((product) => {
				if (product.checked) {

					if (product.Product) {
						checkedProducts.push(product);
						// If no delivery
						if (!product.Product.Availability.IsDeliveryAvailable) {
							anyNoDelivery = true;
							if (product.IsNecessary) {
								anyNoDeliveryEssential = true;
							}
						}
					}
					else {
						soldoutProducts.push(product);
						anySoldOut = true;
						if (product.IsNecessary) {
							anySoldOutEssential = true;
						}
					}
				} else if (product.IsSupplementProduct) {
					supplementProducts.push(product);
				}
			});

			if (anyNoDelivery) {
				this.recipeService.showModal(this.translations.Recipe.Messages.ConfirmAddToBasketWhenNoDeliveryHeader, '<div>' + this.translations.Recipe.Messages.ConfirmAddToBasketWhenNoDeliveryBody + '</div>').then((response) => {
					if (response === 1) {
						this.addProductsToBasket(checkedProducts, supplementProducts, soldoutProducts,  type);
					}
				});
			}
			else {
				this.addProductsToBasket(checkedProducts, supplementProducts, soldoutProducts, type);
			}

		};


		private addProductsToBasket = (products: Array<RecipeProductSelectionViewModel> = [], supplementProducts: Array<RecipeProductSelectionViewModel> = [], soldoutProducts: Array<RecipeProductSelectionViewModel> = [], type:ERecipeMsgType = ERecipeMsgType.Added) => {
			if (products.length) {

				let numOfProductsToAdd = 0;
				products.forEach((product) => {
					if (product.Product && product.Product.Availability && product.Product.Availability.IsDeliveryAvailable) {
						numOfProductsToAdd++;
					}
				});

				this.$scope.$broadcast('RecipeProduct::toggleOpen', false); //~~ Close all open products ~~//
				this.recipeService.addProductsToBasket(this.spotdata.RecipeId, products, supplementProducts, soldoutProducts, this.servings).then(() => {
					this.trackingService.addRecipe(this.spotdata.RecipeId, products,  this.spotdata.Header);

					this.msgObj.productsCount = numOfProductsToAdd;
					this.msgObj.type = type;

					this.$element.addClass('recipe_show-msg');
					this.$element.removeClass('recipe_hide-msg');
					this.$timeout.cancel(this.msgTimer);
					this.msgTimer = this.$timeout(() => {
						this.$element.removeClass('recipe_show-msg');
						this.$element.addClass('recipe_hide-msg');
						this.$timeout(() => {
							this.$element.removeClass('recipe_hide-msg');
						}, 500);
					}, 4000);
				});
			}
		};


		public removeFromBasket = (updateProductsIfNotLoaded:boolean = true) => {
			return this.recipeService.removeFromBasket(this.spotdata.RecipeId).then(() => {
				if (updateProductsIfNotLoaded) {
					this.forceUpdateProducts(false);
				}
			});
		};

	}

	class RecipeComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = RecipeController;
			this.template = HtmlTemplates.recipe.html;
		}
	}

	angular.module(moduleId).component("recipe", new RecipeComponent());

}
