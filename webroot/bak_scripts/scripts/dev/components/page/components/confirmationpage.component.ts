///<reference path="../../../../references/references.ts"/>

namespace PageModule {


    class ConfirmationpageController {

        public pagedata: IPageData;

        constructor() {
        
        }

    }

    class ConfirmationpageComponent implements ng.IComponentOptions {
        
        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '='
            };
            this.controller = ConfirmationpageController;
            this.template = HtmlTemplates.confirmationpage.html;
        }
    }
    
    angular.module(moduleId).component("confirmationpage", new ConfirmationpageComponent());

}
