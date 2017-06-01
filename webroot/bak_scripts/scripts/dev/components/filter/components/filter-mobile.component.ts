///<reference path="../../../../references/references.ts"/>

/**
 * Created by TTH on 11/05/16.
 */

namespace FilterModule {
	class FilterMobileController {
		public facets: Array<any> = [];
		public sortingOptions:Array<any> = [];
		public sorting:string = "";
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public showFilters: boolean;
		public showOnlyImportantFilters: boolean;
		public facetIdPrefix = 'filter-mobile'; // To prevent dublicate ids in template
		public affix: string;

		constructor($rootScope: ng.IRootScopeService,
			private filterUrlService: FilterUrlService,
			public filterService: FilterService,
			translationsService: TranslationsModule.TranslationsService,
			contentService: PageModule.ContentService,
			metadataService: PageModule.MetaDataService
		) {
			// Make sure to announce if 'filterpage'
			$rootScope.$on('PAGE_CHANGED', () => {
				this.showFilters = contentService.getTemplateIdentifier(metadataService.pageMetaData.TemplateId) === 'filterpage' || contentService.getTemplateIdentifier(metadataService.pageMetaData.TemplateId) === 'favoritepage';
				this.showOnlyImportantFilters = contentService.getTemplateIdentifier(metadataService.pageMetaData.TemplateId) === 'favoritepage';
			});
			
			this.sorting = filterService.sorting;
			this.sortingOptions = filterService.sortingOptions;
			this.facets = filterService.facets;
			this.translations = translationsService.translations;
		}

		public changeSorting(sorting:string) {
			this.sorting = sorting || this.sorting;
			this.filterService.sorting = this.sorting;
			this.updateFilter();
		}

		public updateFilter(resetUrl: boolean = false) {
			this.filterUrlService.pushSelectedFiltersToUrl(resetUrl);
		}

	}

	class FilterMobileComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				affix: '@'
			};
			this.controller = FilterMobileController;
			this.template = HtmlTemplates.filtermobile.html;
		}
	}

	angular.module(moduleId).component("filterMobile", new FilterMobileComponent());


}
