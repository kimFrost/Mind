///<reference path="../../../../references/references.ts"/>

namespace PageModule {
    
    export interface IFilterpageBindings {
        pagedata: any;
    }

    class FilterpageController implements IFilterpageBindings {

        public pagedata: IPageData;

        constructor() {
        
        }

        $onInit() {
             //console.log("on init");
        }

        $onDestroy() {
            // console.log("on destroy");
        }

    }

    class FilterpageComponent implements ng.IComponentOptions {
        
        public bindings: IFilterpageBindings;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = FilterpageController;
            this.template = HtmlTemplates.filterpage.html;
        }
    }
    
    angular.module(moduleId).component("filterpage", new FilterpageComponent());

}
