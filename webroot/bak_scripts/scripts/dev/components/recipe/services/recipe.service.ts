///<reference path="../../../../references/references.ts"/>

/**
 * Created by Kim Frost on 01/08/16.
 */


namespace RecipeModule {
	type RecipeProductGroupViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductGroupViewModel;
	type RecipeContainmentViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeContainmentViewModel;
	type RecipeProductSelectionViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductSelectionViewModel;
	type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;
	type BasketService = BasketModule.BasketService;
	type DialogService = DialogModule.DialogService;
	type SettingsService = PageModule.SettingsService;

	export class RecipeService {
		public states = {
			recipeInBasket: false
		};

		public currentActiveProductIds = [];

		constructor(private $q: ng.IQService,
			private $http: ng.IHttpService,
			private $timeout: ng.ITimeoutService,
			private settingsService: SettingsService,
			private basketService: BasketService,
			private dialogService: DialogService,
			private $rootScope: ng.IRootScopeService,
			private translationsService: TranslationsModule.TranslationsService) {

		}


		public showModal(header: string, body: string): ng.IPromise<any> {
			var defer = this.$q.defer();

			let dialogObj = {
				header: header,
				content: body,
				close: false,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.General.Responses.Yes,
						confirm: true,
						callback: true
					},
					button2: {
						text: this.translationsService.translations.General.Responses.No,
						confirm: false,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((index) => {
				this.dialogService.closeDialog();
				defer.resolve(index);
			});

			return defer.promise;
		}

		public getProductsBySorting(recipeId: string, sorting: string, servings: number, bCacheBust: boolean = false): ng.IPromise<RecipeContainmentViewModel> {
			var defer = this.$q.defer();
			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId;
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;
			let url = `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Recipe/GetProductSelections?recipeId=${recipeId}&sortorder=${sorting}&personsAmount=${servings}`;
			if (bCacheBust) {
				url += "&data=" + Date.now();
			}
			this.$http({ method: 'GET', url: url }).then((response: any) => {
				this.currentActiveProductIds = response.data.Products.filter(group => group.Product).map(group => {
					return group.Product.Id;
				});

				defer.resolve(response.data);
			}, (response) => {
				defer.reject();
			});

			return defer.promise;
		}

		public getProductItems(url): ng.IPromise<RecipeProductGroupViewModel> {
			var defer = this.$q.defer();

			this.$http({
				method: 'GET',
				url: url
			}).then((response) => {

				var productGroup: RecipeProductGroupViewModel = {} as RecipeProductGroupViewModel;
				angular.merge(productGroup, response.data);

				defer.resolve(productGroup);

			}).finally(() => {
				defer.reject();
			});

			return defer.promise;
		}

		public removeFromBasket = (recipeId: string): ng.IPromise<BasketViewModel> => {
			return this.basketService.removeRecipe(recipeId);
		};

		public addProductsToBasket = (recipeId: string, products: Array<RecipeProductSelectionViewModel>, supplementProducts: Array<RecipeProductSelectionViewModel> = [], soldoutProducts: Array<RecipeProductSelectionViewModel> = [], servings: number): ng.IPromise<BasketViewModel> => {
			return this.basketService.updateRecipeWithProducts(recipeId, products, supplementProducts, soldoutProducts, servings);
		};

	}

	angular.module(moduleId).service("recipeService", RecipeService);
}
