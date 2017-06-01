///<reference path="../../../../references/references.ts"/>

namespace PageModule {

    class SitemapLevelController {

        public itemdata: any;

        constructor(private newsletterDialogService:NewsletterModule.NewsletterDialogService) {}
    }

    class SitemapLevelComponent implements ng.IComponentOptions {
        
        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                itemdata: '<'
            };
            this.controller = SitemapLevelController;
            this.template = HtmlTemplates.sitemaplevel.html;
        }
    }
    
    angular.module(moduleId).component("sitemaplevel", new SitemapLevelComponent());

}