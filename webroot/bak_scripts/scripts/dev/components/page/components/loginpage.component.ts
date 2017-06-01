///<reference path="../../../../references/references.ts"/>

namespace PageModule {
    
    export interface ILoginpageBindings {
        pagedata: any;
    }

    class LoginpageController implements ILoginpageBindings {

        public pagedata: IPageData;

        constructor() {
        
        }

    }

    class LoginpageComponent implements ng.IComponentOptions {
        
        public bindings: ILoginpageBindings;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = LoginpageController;
            this.template = HtmlTemplates.loginpage.html;
        }
    }
    
    angular.module(moduleId).component("loginpage", new LoginpageComponent());

}
