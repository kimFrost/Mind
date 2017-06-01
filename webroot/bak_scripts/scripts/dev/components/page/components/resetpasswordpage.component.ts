///<reference path="../../../../references/references.ts"/>

namespace PageModule {
    
    export interface IResetpasswordpageBindings {
        pagedata: any;
    }

    class ResetpasswordpageController implements IResetpasswordpageBindings {

        public pagedata: IPageData;

        constructor() {

        }

    }

    class ResetpasswordpageComponent implements ng.IComponentOptions {

        public bindings: IResetpasswordpageBindings;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '='
            };
            this.controller = ResetpasswordpageController;
            this.template = HtmlTemplates.resetpasswordpage.html;
        }
    }

    angular.module(moduleId).component("resetpasswordpage", new ResetpasswordpageComponent());

}
