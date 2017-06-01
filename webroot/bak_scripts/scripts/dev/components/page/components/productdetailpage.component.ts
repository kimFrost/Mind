///<reference path="../../../../references/references.ts"/>

namespace PageModule {


    export interface IProductDetailPageBindings {
        pagedata: any;
    }

    class ProductDetailPageController implements IProductDetailPageBindings {

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

    class ProductDetailPageComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = ProductDetailPageController;
            this.template = HtmlTemplates.productdetailpage.html;
        }
    }

    angular.module(moduleId).component("productdetailpage", new ProductDetailPageComponent());

}
