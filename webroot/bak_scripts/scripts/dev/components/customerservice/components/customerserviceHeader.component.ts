///<reference path="../../../../references/references.ts"/>

namespace CustomerserviceModule {


    class CustomerserviceHeaderController {

        private onBack: (any) => void;
        private onClose: (any) => void;
        private onMinimize: (any) => void;
        private displayBackButton: boolean = true;

        private translations;

    	constructor(
            private $element: ng.IRootElementService,
            private translationsService: TranslationsModule.TranslationsService
        ) { 
            this.translations = translationsService.translations;
        }

        back() {
            this.onBack({$event: {}});
        }
        close() {
            this.onClose({$event: {}});
        }
        minimize() {
            this.onMinimize({$event: {}});
        }

        $onInit() {
            if(!this.$element.attr('on-back')) {
                this.displayBackButton = false;
            }
        }
 
    }

    class CustomerserviceHeaderComponent implements ng.IComponentOptions {

        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                header: '<',
                onBack: '&',
                onClose: '&',
                onMinimize: '&'
            };
            this.controller = CustomerserviceHeaderController;
            this.template = HtmlTemplates.customerserviceheader.html;
        }
    }

    angular.module(moduleId).component('customerserviceHeader', new CustomerserviceHeaderComponent());

}
