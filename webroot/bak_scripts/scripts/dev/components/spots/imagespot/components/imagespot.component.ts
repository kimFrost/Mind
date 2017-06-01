///<reference path="../../../../../references/references.ts"/>

namespace ImageSpotModule {

    class ImageSpotController {

        public spotdata: string;
        public dataBinding: number;
        public functionBinding: () => any;

        constructor() {}

        $onInit() {}

        $onDestroy() {}

    }

    class ImageSpotComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                spotdata: '='
            };
            this.controller = ImageSpotController;
            this.template = HtmlTemplates.imagespot.html;
        }
    }

    angular.module(moduleId).component("imagespot", new ImageSpotComponent());

} 
