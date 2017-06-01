///<reference path="../../../../references/references.ts"/>

namespace PageModule {
    
    export interface ISitemappageBindings {
        pagedata: any;
    }

    class SitemappageController implements ISitemappageBindings {

        public pagedata: IPageData;
        public sitemapData = [];

        constructor(private newsletterDialogService:NewsletterModule.NewsletterDialogService) {
            this.structureSitemapData();
        }

        private structureSitemapData () {
            let sitemapNodes = this.pagedata.content.filter(function (item) {
                return item.MenuNodes;
            });

            this.sitemapData = sitemapNodes[0];
        }

    }

    

    class SitemappageComponent implements ng.IComponentOptions {
        
        public bindings: ISitemappageBindings;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = SitemappageController;
            this.template = HtmlTemplates.sitemappage.html;
        }
    }
    
    angular.module(moduleId).component("sitemappage", new SitemappageComponent());

}