///<reference path="../../../../references/references.ts"/>

namespace BundleModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	class BundleItemController {

        constructor(public translationsService:TranslationsService) {

        }

        $onInit() {

        }

        $onDestroy() {
			
        }
    }

    class BundleItemComponent implements ng.IComponentOptions {

        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
                data: "<"
            };
            this.controller = BundleItemController;
            this.template = HtmlTemplates.bundleItem.html;
        }
    }

    angular.module(moduleId).component("bundleItem", new BundleItemComponent());

}
