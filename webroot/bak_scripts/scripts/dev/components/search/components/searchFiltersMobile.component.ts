///<reference path="../../../../references/references.ts"/>

namespace SearchModule {
	class SearchFiltersMobileController {
		public facets:Array<any> = [];
		public sortingOptions:Array<any> = [];
		public sorting:string = "";
		public translations:SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public showFilters:boolean;
		public facetIdPrefix = 'search-filter-mobile'; // To prevent dublicate ids in template

		constructor(private searchurlService:SearchUrlService,
					private searchService:SearchService,
					private translationsService:TranslationsModule.TranslationsService,
					$scope:ng.IScope) {

			$scope.$watch(() => {
				return searchurlService.searchActive;
			}, (newVal) => {
				if (searchService.activeTab === 0) {
					this.showFilters = newVal;
				} else {
					this.showFilters = false;
				}
			});

			$scope.$watch(() => {
				return searchService.activeTab;
			}, (newVal) => {
				if (newVal === 0) {
					this.showFilters = searchurlService.searchActive;
				} else {
					this.showFilters = false;
				}
			});

			this.sorting = searchService.sorting;
			this.sortingOptions = searchService.sortingOptions;
			this.facets = searchService.facets;
			this.translations = translationsService.translations;
		}

		public changeSorting(sorting:string) {
			this.sorting = sorting || this.sorting;
			this.searchService.sorting = this.sorting;
			this.updateFilter();
		}

		public resetFilters() {
			this.searchService.resetFacets();
			if (this.sortingOptions.length > 0) {
				this.changeSorting(this.sortingOptions[0].UrlName);
			}
			else {
				this.updateFilter();
			}
		}

		public updateFilter() {
			this.searchurlService.pushSelectedFiltersToUrl();
		}
	}

	class SearchFiltersMobileComponent implements ng.IComponentOptions {
		public controller:any;
		public template:string;

		constructor() {
			this.controller = SearchFiltersMobileController;
			this.template = HtmlTemplates.filtermobile.html;
		}
	}

	angular.module(moduleId).component("searchFiltersMobile", new SearchFiltersMobileComponent());

}
