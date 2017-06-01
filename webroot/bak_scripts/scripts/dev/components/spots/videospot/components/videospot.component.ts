///<reference path="../../../../../references/references.ts"/>

namespace VideoSpotModule {

    class VideoSpotController {

        public spotdata: string;
        public dataBinding: number;
        public functionBinding: () => any;

        constructor() {}

        $onInit() {}

        $onDestroy() {}

    }

    class VideoSpotComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                spotdata: '='
            };
            this.controller = VideoSpotController;
            this.template = HtmlTemplates.videospot.html;
        }
    }

    angular.module(moduleId).component("videospot", new VideoSpotComponent());

} 
