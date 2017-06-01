///<reference path="../../../../references/references.ts"/>

namespace PageModule {


    export interface IRecipePageBindings {
        pagedata: any;
    }

    class RecipePageController implements IRecipePageBindings {

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

    class RecipePageComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = RecipePageController;
            this.template = HtmlTemplates.recipepage.html;
        }
    }

    angular.module(moduleId).component("recipepage", new RecipePageComponent());

}
