///<reference path="../../../../../references/references.ts"/>

namespace CombiSpotModule {

    class CombiSpotController {

        public spotdata: string;
        public dataBinding: number;
        public functionBinding: () => any;

        constructor() {
        }

        $onInit() {
        }

        $onDestroy() {
        }

    }

    class CombiSpotComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                spotdata: '='
            };
            this.controller = CombiSpotController;
            this.template = HtmlTemplates.combispot.html;
        }
    }

    angular.module(moduleId).component("combispot", new CombiSpotComponent());

} 
