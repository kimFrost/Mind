///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {

	interface ISearchViewModel extends SCommerce.Website.Code.WebAPI.Models.Search.SearchViewModel {
		teaserRecipes: Array<SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeListItemViewModel>;
	}

	export class SearchService {
		public fetching = false;

		private skip = 0;
		private recipeSkip = 0;
		private searchParameters = "";
		private searchQuery = "";
		private reset = true;

		public productLoadAmount = 50;
		public productMaxAmount = 200;
		public sorting = "default";
		public sortingOptions: Array<any> = [];

		public facets: Array<any> = [];
		public selectedFacets: Array<any> = [];

		public result = {
			teaserRecipes: []
		} as ISearchViewModel;

		public activeTab = 0;

		public productsInvalid = true;
		public recipesInvalid = true;

		private updateSearchSubjects;
		private trackSearchSubject;
		
		public emptyResult = false;

		public restoreSearch = false;

		constructor(private $q: ng.IQService,
			private $location: ng.ILocationService,
			private settingsService: PageModule.SettingsService,
			private dialogService: DialogModule.DialogService,
			private $Ohttp: any,
			private trackingService: TrackingModule.TrackingService,
			private translationsService: TranslationsModule.TranslationsService,

			$rootScope: ng.IRootScopeService) {

			$rootScope.$on('REFRESH_PRODUCTS', () => {
				this.restoreSearch = false;
				this.productsInvalid = true;
				this.recipesInvalid = true;
				this.search(this.searchQuery, this.searchParameters, true);
			});
		}

		public loadMoreProducts() {
			this.restoreSearch = false;
			this.search(this.searchQuery, this.searchParameters, false);
		}

		public loadMoreRecipes() {
			this.restoreSearch = false;
			this.search(this.searchQuery, "", false);
		}

		public invalidateData() {
			this.productsInvalid = true;
			this.recipesInvalid = true;
		}

		public resetFacets = () => {
			this.selectedFacets.forEach((facet) => {
				facet.IsSelected = false;
			});
			this.selectedFacets.length = 0;
		};

		public showRedirectModal() {
			var content = this.translationsService.translations.Search.SearchProductNotFoundModal.Content;
			const dialogSettings = {
				header: this.translationsService.translations.Search.SearchProductNotFoundModal.Header,
				content: `<div>${content}</div>`,
				close: true,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.Search.SearchProductNotFoundModal.Button,
						confirm: true,
						callback: false
					}
				}
			};
			this.dialogService.openDialog(dialogSettings);
		}

		public search(search: string, filterParams: string, reset: boolean): void {
			this.searchQuery = search;
			
			if (!this.restoreSearch && this.searchQuery !== ""){
				this.reset = reset;

				this.fetching = true;
				const siteSettings = this.settingsService.settings;
				const includeFavorites = siteSettings.UserId ? "1" : "0";
				const deliveryZoneId = siteSettings.DeliveryZoneId;
				const timeslotUtcParam = siteSettings.TimeslotUtc;
				const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;

				let amount = reset || this.result.Products.Products.length === 0 ? 10 : this.productLoadAmount;
				const urlQuery = search;
				let url = `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Search/Search`;
				
				if (this.activeTab === 0) {
					this.skip = this.reset ? 0 : this.result.Products.Products.length;
					if (this.skip === 10) {
						amount = 40; // take only 40 to match with reranking page size
					}
					this.searchParameters = filterParams;
					url += "?query=" + encodeURIComponent(urlQuery) + "&take=" + amount + "&skip=" + this.skip + "&recipeCount=2&" + filterParams;
				} else if (this.activeTab === 1) {
					const recipeAmount = 10;
					this.recipeSkip = this.reset ? 0 : this.result.Recipes.length;
					url += "?query=" + encodeURIComponent(urlQuery) + "&take=" + recipeAmount + "&skip=" + this.recipeSkip + "&productCount=0";
				}

				if (!this.updateSearchSubjects) {
					this.updateSearchSubjects = new Rx.Subject();
					this.trackSearchSubject =  new Rx.Subject();

					this.trackSearchSubject
						.debounce(2000)
						.subscribe(_=> {
							this.trackingService.pageVisit(this.result.Products.NumFound);
							this.trackingService.productView(this.result.Products.Products, 'Search');
							if (this.result.Ads.length) {
								this.trackingService.productView(this.result.Ads.filter(ad => ad.IsProduct).map(ad => {
									return ad.Product;
								}), '', 'Annonce: ');
							}
						});

					this.updateSearchSubjects
						.flatMapLatest((url) => {
							return this.$Ohttp({
								method: "GET",
								url: url
							})
							.catch(() => {
								Rx.Observable.empty();
							});
						})
						.subscribe(response => {
							this.trackSearchSubject.onNext();

							let data: any = response.data;
							this.emptyResult = data.ProductsNumFound + data.RecipesNumFound === 0;
							
							if (this.activeTab === 0) {
								this.productsInvalid = false;

								if (this.reset) {
									if (this.result.Products && this.result.Products.Products.length !== 0) {
										this.result.Products.Products.splice(0, this.result.Products.Products.length);
									}
									if (this.result.teaserRecipes && this.result.teaserRecipes.length !== 0) {
										this.result.teaserRecipes.splice(0, this.result.teaserRecipes.length);
									}
									if (this.result.Recipes && this.result.Recipes.length !== 0) {
										this.result.Recipes.splice(0, this.result.Recipes.length);
									}
									if (this.result.Ads && this.result.Ads.length !== 0) {
										this.result.Ads.splice(0, this.result.Ads.length);
									}

									angular.merge(this.result, data);

									if (data.Recipes[0]) {
										this.result.teaserRecipes.push(data.Recipes[0]);
									}
									if (data.Recipes[1]) {
										this.result.teaserRecipes.push(data.Recipes[1]);
									}
								}
								else {
									data.Products.Products.forEach((item) => {
										this.result.Products.Products.push(item);
									});
								}

								this.facets.splice(0, this.facets.length);
								data.Facets.FacetGroups.forEach((facet) => {
									this.facets.push(facet);

									facet.Items.forEach((item) => {
										if (item.IsSelected) {
											this.selectedFacets.push(item);
										}
									});
								});

								this.sortingOptions.splice(0, this.sortingOptions.length);
								data.Facets.SortingList.forEach((sort) => {
									this.sortingOptions.push(sort);
									if (sort.IsSelected) {
										this.sorting = sort.UrlName;
									}
								});

								if (this.result.ProductsNumFound === 0 && this.result.RecipesNumFound !== 0) {
									this.activeTab = 1;
									this.search(this.searchQuery, "", true);
								}
							} else if (this.activeTab === 1) {
								this.recipesInvalid = false;

								if (this.reset) {
									if (this.result.Products && this.result.Products.Products.length !== 0) {
										this.result.Products.Products.splice(0, this.result.Products.Products.length);
									}
									if (this.result.teaserRecipes && this.result.teaserRecipes.length !== 0) {
										this.result.teaserRecipes.splice(0, this.result.teaserRecipes.length);
									}
									if (this.result.Recipes && this.result.Recipes.length !== 0) {
										this.result.Recipes.splice(0, this.result.Recipes.length);
									}
									if (this.result.Ads && this.result.Ads.length !== 0) {
										this.result.Ads.splice(0, this.result.Ads.length);
									}

									angular.merge(this.result, data);
								} else {
									data.Recipes.forEach((item) => {
										this.result.Recipes.push(item);
									});
								}
								
								if (this.result.RecipesNumFound === 0 && (this.result.ProductsNumFound !== 0 && this.reset)) {
									this.activeTab = 0;
									this.search(this.searchQuery, "", true);
								}
							}

							this.fetching = false;
						});
				}

				this.updateSearchSubjects.onNext(url);
			}
		}
	}

	angular.module(moduleId).service("searchService", SearchService);
}
