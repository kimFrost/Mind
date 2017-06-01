///<reference path="../../../../references/references.ts"/>

namespace RecipeModule {
	type RecipeProductGroupViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductGroupViewModel;
	type ProductListItemViewModel = SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;
	type SettingsService = PageModule.SettingsService;
	type TranslationsService = TranslationsModule.TranslationsService;
	type DialogService = DialogModule.DialogService;

	type TranslationsViewModel = SCommerce.Core.Dictionary.Translations;


	interface IRecipeProductSelectionViewModelEnriched extends SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductSelectionViewModel {
		checked: boolean;
		quantityToBasket:number;
	}

	class RecipeProductController {

		public productData:IRecipeProductSelectionViewModelEnriched;
		public sortingFilter:string;
		public recipeInBasket:boolean;
		public translations:TranslationsViewModel;

		public loadSize:number = 6;
		public filterParams:string = "";
		public totalProducts:number;

		public products:Array<ProductListItemViewModel> = [] as Array<ProductListItemViewModel>;

		public pageIndex:number = 1;

		public servings:number;
		public createdForServings:number;

		public serviceStates:Object;

		public states = {
			extended: false,
			opened: false,
			loading: false,
			productsLoaded: false
		};

		constructor(private $element,
					public recipeService:RecipeService,
					private $q:ng.IQService,
					private dialogService:DialogService,
					private settingsService:SettingsService,
					public translationsService:TranslationsService,
					private $scope:ng.IScope) {

			$element.addClass('recipe-product');

			this.productData.checked = !this.productData.IsSupplementProduct;

			this.translations = translationsService.translations;

			this.serviceStates = recipeService.states;

			$scope.$on('recipeProductItem:SelectProduct', (e, product) => {
				this.switchProduct(product);
			});

			$scope.$on('RecipeProduct::toggleOpen', (e, state) => {
				this.toggleOpen(state);
			});

			$scope.$on('Recipe::productsUpdated', (e) => {
				this.states.productsLoaded = false;
			});
		}

		

		public toggleOpen = (state) => {
			state = (state === undefined) ? !this.states.opened : state;
			this.states.opened = state;

			if (this.states.opened) {
				if (!this.states.productsLoaded) {
					this.loadProductItems(0, true);
				}
				this.$element.addClass('recipe-product_open');
			}
			else {
				this.$element.removeClass('recipe-product_open');
			}

		};

		public switchProduct = (product) => {
			if (!this.recipeInBasket) {
				const index = this.recipeService.currentActiveProductIds.indexOf(this.productData.Product.Id);
				this.recipeService.currentActiveProductIds[index] = product.Id;

				this.productData.Product = product;
				this.toggleOpen(false);
			}
		};

		private loadProductItems(index:number, reset?:boolean):ng.IPromise<any> {

			var defer = this.$q.defer();
			if (!this.states.productsLoaded) {
				this.states.loading = true;
			}

			if (this.sortingFilter) {
				this.filterParams = 'sortorder=' + this.sortingFilter;
			}
			else {
				this.filterParams = '';
			}

			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId;
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;
			const productListUrl:string = `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Recipe/GetRecipeProductListItemsByProductGroupId?productGroupId=`;

			const url = productListUrl + this.productData.ProductGroupId +
				"&pageindex=" + index +
				"&pagesize=" + this.loadSize +
				"&personsCreatedForAmount=" + this.createdForServings +
				"&personsAmount=" + this.servings +
				"&measureKg=" + this.productData.MeasureKg +
				"&measureLiter=" + this.productData.MeasureLiter +
				"&measurePieces=" + this.productData.MeasurePieces +
				"&" + this.filterParams;

			this.recipeService.getProductItems(url).then((productGroup:RecipeProductGroupViewModel) => {
				this.totalProducts = productGroup.NumFound;

				if (reset) {
					this.products.splice(0, this.products.length);
				}

				productGroup.Products.forEach((product) => {
					this.products.push(product);
				});
				
				this.pageIndex = index;
				this.states.productsLoaded = true;
				
				defer.resolve();
			}).finally(() => {
				this.states.loading = false;
			});

			return defer.promise;
		}

		public loadMore = () => {
			return this.loadProductItems(this.pageIndex + 1, false);
		};

		public showDeliveryInfo = () => {
			if (this.productData.Product && this.productData.Product.Availability && this.productData.Product.Availability.ReasonMessageKeys) {
				let header = this.productData.Product.Availability.ReasonMessageKeys[0];
				let body = this.productData.Product.Availability.ReasonMessageKeys[1];
				let dialogObj = {
						header: header,
						content: `<div>${body}</div>`,
						close: true,
						size: 'medium'
					} as DialogModule.IDialogSettings;

				this.dialogService.openDialog(dialogObj);
			}
		};
	}

	class RecipeProductComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				productData: '<',
				sortingFilter: '<',
				recipeInBasket: '<',
				servings: '<',
				createdForServings: "<"
			};
			this.controller = RecipeProductController;
			this.template = HtmlTemplates.recipeProduct.html;
		}
	}

	angular.module(moduleId).component("recipeProduct", new RecipeProductComponent());

}
