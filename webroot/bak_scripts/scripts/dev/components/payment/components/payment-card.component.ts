///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 13-09-2016.
 */
namespace PaymentModule {

	class PaymentCardController {

		public cardType:string;
		public cardSize = 'small';

		constructor() {}

	}

	class PaymentCardComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = PaymentCardController;
			this.template = HtmlTemplates.paymentCard.template.html;
			this.bindings = {
				cardType: "<",
				cardSize: "<"
			};
		}


	}

	angular.module(moduleId).component("paymentCard", new PaymentCardComponent());
}
