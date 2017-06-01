///<reference path="../../../../references/references.ts"/>

namespace PageModule {

    export interface ICheckoutpageBindings {
        pagedata: any;
    }

    class CheckoutpageController implements IBlankpageBindings {

        public pagedata: IPageData;

        constructor(private trackingService: TrackingModule.TrackingService,
					private checkoutService: CheckoutModule.CheckoutService) {

        }

        $onInit() {
            this.trackingService.checkout(2);
	        this.checkoutService.isCheckoutActive = true;
        }

        $onDestroy() {
			this.checkoutService.isCheckoutActive = false;
        }

    }

    class CheckoutpageComponent implements ng.IComponentOptions {

        public bindings: ICheckoutpageBindings;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
                pagedata: '<'
            };
            this.controller = CheckoutpageController;
            this.template = HtmlTemplates.checkoutpage.html;
        }
    }

    angular.module(moduleId).component("checkoutpage", new CheckoutpageComponent());

}
