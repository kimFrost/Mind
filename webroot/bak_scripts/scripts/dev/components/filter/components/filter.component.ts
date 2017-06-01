///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 11/05/16.
 */

namespace FilterModule {
	type TranslationsService = TranslationsModule.TranslationsService;
	type ContentService = PageModule.ContentService;
	type MetaDataService = PageModule.MetaDataService;
	type ScrollService = UtilsModule.ScrollService;

	class FilterController {

		public facets:Array<any> = [];
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public showFilters: boolean;
		public affix: string;

		constructor($rootScope:ng.IRootScopeService,
					private filterUrlService:FilterUrlService,
					private scrollService: ScrollService,
					public filterService: FilterService,
					contentService: ContentService,
					metadataService:MetaDataService,
					translationsService: TranslationsService) {

			this.facets = filterService.facets;
			this.translations = translationsService.translations;
			
			// Make sure to announce if 'filterpage'
			$rootScope.$on('PAGE_CHANGED', () => {
				this.showFilters = contentService.getTemplateIdentifier(metadataService.pageMetaData.TemplateId) === 'filterpage';
			});
		}

		public updateFilter(resetUrl: boolean = false) {
			this.filterUrlService.pushSelectedFiltersToUrl(resetUrl);
			this.scrollService.scrollToTop();
		}

	}

	class FilterComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				affix: '@'
			};
			this.controller = FilterController;
			this.template = HtmlTemplates.filter.html;
		}
	}

	angular.module(moduleId).component("filter", new FilterComponent());


}
