///<reference path="../../../../references/references.ts"/>

namespace PageModule {
    
    export interface IBlankpageBindings {
        pagedata: any;
    }

    class BlankpageController implements IBlankpageBindings {

        public pagedata: IPageData;

        constructor(private newsletterDialogService:NewsletterModule.NewsletterDialogService) {

        }

        $onInit() {
             //console.log("on init");
        }

        $onDestroy() {
            // console.log("on destroy");
        }

    }

    class BlankpageComponent implements ng.IComponentOptions {
        
        public bindings: IBlankpageBindings;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = BlankpageController;
            this.template = HtmlTemplates.blankpage.html;
        }
    }
    
    angular.module(moduleId).component("blankpage", new BlankpageComponent());

}