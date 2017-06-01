///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 26/05/16.
 */

namespace FilterModule {
	class FilterImportantController {

		public facets: Array<any> = [];
		public sortingOptions: Array<any> = [];
		public sorting: string = "";
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public showFilters: boolean;
		public affix: string;

		constructor($rootScope: ng.IRootScopeService,
			private filterUrlService: FilterUrlService,
			private filterService: FilterService,
			contentService: PageModule.ContentService,
			metadataService: PageModule.MetaDataService,
			translationsService: TranslationsModule.TranslationsService) {

			this.sorting = filterService.sorting;
			this.facets = filterService.facets;
			this.sortingOptions = filterService.sortingOptions;
			this.translations = translationsService.translations;

			// Make sure to announce if 'filterpage'
			$rootScope.$on('PAGE_CHANGED', () => {
				this.showFilters = contentService.getTemplateIdentifier(metadataService.pageMetaData.TemplateId) === 'filterpage';
			});
		}

		public changeSorting() {
			this.filterService.sorting = this.sorting;
			this.updateFilter();
		}

		public updateFilter() {
			this.filterUrlService.pushSelectedFiltersToUrl();
		}
	}

	class FilterImportantComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				affix: '@'
			};
			this.controller = FilterImportantController;
			this.template = HtmlTemplates.filterimportant.html;
		}
	}

	angular.module(moduleId).component("filterImportant", new FilterImportantComponent());
}
