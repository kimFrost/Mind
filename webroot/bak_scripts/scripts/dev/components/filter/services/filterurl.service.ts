///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 11/05/16.
 */

namespace FilterModule {

	import SearchUrlService = SearchModule.SearchUrlService;
	export class FilterUrlService {

		public filterUrlParams:string = "";
		public urlpath:string = "";

		public pushSelectedFiltersToUrl(resetUrl: boolean = false): void {
			const searchObject = resetUrl ? {} : this.generateSearchObjectFromSelectedFacets();
			this.$location.search(searchObject).replace();
		}


		private generateSearchObjectFromSelectedFacets():IFilterUrlParamsModel {
			const searchObject: IFilterUrlParamsModel = {};

			const facets = this.filterService.facets;

			searchObject["sortorder"] = this.filterService.sorting; // Add sort to URL params

			facets.forEach( (facet) => {
				facet.Items.forEach( (item)=> {
					if(item.IsSelected) {

						if(item.Type === "FacetQuery") {
							searchObject[item.UrlName] = "1";
						}
						if(item.Type === "FacetFieldItem") {
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

		constructor(
			private $rootScope: ng.IRootScopeService,
			private $location: ng.ILocationService,
			private $httpParamSerializer,
			private filterService:FilterService,
			private searchurlService:SearchUrlService
		) {

			// Listen for url changes and call filter service
			var searchWasActive = false;
			this.$rootScope.$watch(() => {
				return $location.search();
			}, () => {
				if(!this.searchurlService.searchActive && !searchWasActive) { // Only apply query updates if search is not active
					this.filterUrlParams = this.$httpParamSerializer(this.$location.search());

					if(this.$location.search().sortorder !== undefined) {
						this.filterService.sorting =  this.$location.search().sortorder;
					}
					
					if (this.$location.path() === this.urlpath) {
						this.filterService.getFilters(this.filterUrlParams);
						this.filterService.publishFilterUpdate(this.filterUrlParams);
					}
				}

				this.urlpath = this.$location.path();
				
				searchWasActive = this.searchurlService.searchActive;

			});
		}

	}


	angular.module(moduleId).service("filterUrlService", FilterUrlService);

}
