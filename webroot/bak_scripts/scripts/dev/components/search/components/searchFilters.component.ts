///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 26/05/16.
 */

namespace SearchModule {
	class SearchFiltersController {

		public facets:Array<any> = [];
		public sortingOptions:Array<any> = [];
		public sorting:string = "";
		public translations:SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public showFilters: boolean;
		public affix: string;

		constructor($scope:ng.IScope,
					private searchService:SearchService,
					private searchurlService:SearchUrlService,
					translationsService:TranslationsModule.TranslationsService) {

			this.sorting = searchService.sorting;
			$scope.$watch(() => {
				return searchService.sorting;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.sorting = searchService.sorting;
				} 
			});

			this.facets = searchService.facets;
			this.sortingOptions = searchService.sortingOptions;
			this.translations = translationsService.translations;
		}

		public changeSorting() {
			this.searchService.sorting = this.sorting;
			this.updateFilter();
		}

		public updateFilter() {
			this.searchurlService.pushSelectedFiltersToUrl();
		}
	}

	class SearchFiltersComponent implements ng.IComponentOptions {
		public bindings: Object;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				affix: '@'
			};
			this.controller = SearchFiltersController;
			this.template = HtmlTemplates.filterimportant.html;
		}
	}

	angular.module(moduleId).component("searchFilters", new SearchFiltersComponent());

}
