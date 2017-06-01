///<reference path="../../../../references/references.ts"/>

namespace PageModule {


    export interface ILeftMenuPageBindings {
        pagedata: any;
    }

    class LeftMenuPageController implements ILeftMenuPageBindings {

        public pagedata: IPageData;
        public dataBinding: number;
        public functionBinding: () => any;
        
        constructor($scope) {
            $scope.pagedata = this.pagedata;
        }

        $onInit() {
            // console.log("on init");
        }

        $onDestroy() {
            // console.log("on destroy");
        }

    }

    class LeftMenuPageComponent implements ng.IComponentOptions {
        
        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = LeftMenuPageController;
            this.template = HtmlTemplates.leftmenupage.html;
        }
    }
    
    angular.module(moduleId).component("leftmenupage", new LeftMenuPageComponent());

}
