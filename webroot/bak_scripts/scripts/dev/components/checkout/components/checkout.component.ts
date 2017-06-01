///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 15-12-2016.
 */
namespace CheckoutModule {

	class CheckoutController {

		public states: Object;

		constructor(
			private checkoutService: CheckoutService) {
			this.states = checkoutService.getStates();
		}
	}

	class CheckoutComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = CheckoutController;
			this.template = HtmlTemplates.checkout.template.html;
		}
	}

	angular.module(moduleId).component("checkout", new CheckoutComponent());
}
