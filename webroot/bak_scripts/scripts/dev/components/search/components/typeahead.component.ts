///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {
	class TypeaheadController {
		constructor(public typeaheadService: TypeaheadService,
			public searchurlService: SearchUrlService,
			public translationsService: TranslationsModule.TranslationsService,
			public responsiveService: UtilsModule.ResponsiveService) {
		}
		
		public setSearchQuery(item) {
			if (item.Type === 'suggestion') {
				this.searchurlService.updateSearchQuery(item.Name, undefined, true);
			}

			if (this.responsiveService.responsiveState.device === 'mobile') {
				this.searchurlService.handleBlurMobile();
			}
		}

		public setSearchFromQuery(query) {
			this.searchurlService.updateSearchQuery(query, undefined, true);
			this.searchurlService.isSearching = false; // To prevent latest search from not hiding suggestion overlay
		}

		public closeSearch() {
			this.searchurlService.isSearching = false;
		}
	}

	class TypeaheadComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = TypeaheadController;
			this.template = HtmlTemplates.typeahead.html;
		}
	}

	angular.module(moduleId).component("typeahead", new TypeaheadComponent());
}
