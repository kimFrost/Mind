///<reference path="../../../../references/references.ts"/>

namespace PageModule {


    class RenderPartialController {

        public spot: any;

        constructor() {

        }

        $onInit() {
             //console.log("on init");
        }

        $onDestroy() {
            // console.log("on destroy");
        }

    }

    class RenderPartialComponent implements ng.IComponentOptions {
        
        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                spot: '<'
            };
            this.controller = RenderPartialController;
            this.template = HtmlTemplates.renderpartial.html;
        }
    }
    
    angular.module(moduleId).component("renderPartial", new RenderPartialComponent());

}
