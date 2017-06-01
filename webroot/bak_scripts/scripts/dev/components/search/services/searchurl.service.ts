///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {
	export class SearchUrlService {
		public originalParameters: string = "";
		public searchQuery: string = "";
		public searchActive: boolean = false;
		public isSearching: boolean = false;

		private searchToRestore = "";

		constructor(private $rootScope: ng.IRootScopeService,
			private searchService: SearchService,
			private $httpParamSerializer,
			private $location: ng.ILocationService,
			private $timeout: ng.ITimeoutService,
			private $window: ng.IWindowService,
			private typeaheadService: TypeaheadService,
			private statesService: UtilsModule.StatesService,
			private responsiveService: UtilsModule.ResponsiveService) {

			this.$rootScope.$watch(() => {
				return this.searchActive;
			}, (newVal, oldVal) => {
				if (this.searchActive) {
					if (this.$location.search().search === undefined) {
						this.originalParameters = this.$httpParamSerializer(this.$location.search());
					}
				} else {
					if (oldVal) {
						this.$location.search(this.originalParameters).replace();
					}
				}
			});
			this.$rootScope.$watch(() => {
				return this.isSearching;
			}, (newVal) => {
				statesService.setState("searchActive", newVal);
			});

			// Remove search on pageChange
			$rootScope.$on('PAGE_CHANGED', () => {
				this.searchQuery = this.$location.search().search === undefined ? "" : this.$location.search().search;
			});

			$rootScope.$on('REFRESH_PRODUCTS', () => {
				this.searchToRestore = "";
			});

			this.$rootScope.$watch(() => {
				return this.searchQuery;
			}, () => {
				let searchObject: any = {};
				if (this.searchQuery !== "") {
					this.searchService.restoreSearch = this.searchQuery === this.searchToRestore;
					this.searchToRestore = this.searchQuery;

					searchObject = this.resetSearch(searchObject);

					if (this.responsiveService.responsiveState.device !== 'mobile') {
						this.searchService.search(this.searchQuery, this.searchParams(searchObject), true);
					}
				} else {
					this.searchService.restoreSearch = false;
					this.typeaheadService.clearitems();
				}
			});

			if (this.$location.search().search) {
				this.$timeout(() => { // timeout to fix first watch change on search component
					this.updateSearchQuery(this.$location.search().search, undefined, true);
				}, 50);
			}

		}

		public handleBlurMobile() {
			this.isSearching = false;

			if (this.searchQuery) {
				this.typeaheadService.setLatestSearch(this.searchQuery);
			}
		}

		public closeSearch() {
			if (this.isSearching || this.searchActive) {
				this.updateSearchQuery('');
				this.isSearching = false;
				this.searchActive = false;
				this.searchService.activeTab = 0;
				this.searchService.emptyResult = false;
			}
		}

		public updateSearchQuery(query, clear = false, searchMobile = false) {
			this.searchQuery = query;
			
			if (searchMobile && this.responsiveService.responsiveState.device === 'mobile') {
				this.mobileSearch();
			}

			if (!clear) {
				this.searchActive = this.searchQuery !== '';
			}
		}

		private resetSearch(obj) {
			obj.search = this.searchQuery;

			this.$location.search(obj).replace();
			this.typeaheadService.getTypeahead(this.searchQuery);
			this.searchService.invalidateData();
			this.searchService.resetFacets();
			return obj;
		}

		private searchParams(obj) {
			let params = "";
			for (let prop in obj) {
				if (prop !== "search") {
					params += prop + "=" + obj[prop] + "&";
				}
			}

			return params;
		}

		public mobileSearch() {
			let searchObject: any = {};
			
			if (this.searchQuery !== "") {
				searchObject = this.resetSearch(searchObject);

				this.searchService.search(this.searchQuery, this.searchParams(searchObject), true);
			} else {
				this.searchService.restoreSearch = false;
				this.typeaheadService.clearitems();
			}
		}

		public pushSelectedFiltersToUrl() {
			const searchObject = this.generateSearchObjectFromSelectedFacets();
			this.$location.search(searchObject).replace();
			var params = this.$httpParamSerializer(this.$location.search());
			this.searchService.restoreSearch = false;
			this.searchService.search(this.searchQuery, params, true);
		}

		private generateSearchObjectFromSelectedFacets() {
			const searchObject = {};

			const facets = this.searchService.facets;

			searchObject["sortorder"] = this.searchService.sorting; // Add sort to URL params
			searchObject["search"] = this.searchQuery; // Add sort to URL params

			facets.forEach((facet) => {
				facet.Items.forEach((item) => {
					if (item.IsSelected) {

						if (item.Type === "FacetQuery") {
							searchObject[item.UrlName] = "1";
						}
						if (item.Type === "FacetFieldItem") {
							if (searchObject[facet.UrlName]) {
								searchObject[facet.UrlName].push(item.UrlName);
							} else {
								searchObject[facet.UrlName] = [item.UrlName];
							}
						}

					}
				});
			});

			return searchObject;
		}
	}

	angular.module(moduleId).service("searchurlService", SearchUrlService);
}
