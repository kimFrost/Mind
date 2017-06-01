///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 26/05/16.
 */

namespace FilterModule {

    import TranslationsService = TranslationsModule.TranslationsService;
    class SelectedFiltersController {

        public selectedFacets:Array<any> = [];
        public translations:SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

        constructor(private filterUrlService:FilterUrlService,
                    private filterService:FilterService,
                    private translationsService:TranslationsService) {
            this.selectedFacets = this.filterService.selectedFacets;
            this.translations = this.translationsService.translations;
        }

        public unselectFacet(facet) {
            facet.IsSelected = false;
            this.filterUrlService.pushSelectedFiltersToUrl();
        }
        
        public clearAllFacets() {
            this.filterUrlService.pushSelectedFiltersToUrl(true);
        }

    }

    class SelectedFiltersComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                
            };
            this.controller = SelectedFiltersController;
            this.template = HtmlTemplates.selectedfilters.html;
        }
    }

    angular.module(moduleId).component("selectedFilters", new SelectedFiltersComponent());

}
