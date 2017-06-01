///<reference path="../../../../references/references.ts"/>

namespace MyNemligModule {

	type TranslationsService = TranslationsModule.TranslationsService;

    class OrderSummaryController {

		public translations: Object;
		public data: any;

		constructor(private $element,
					public translationsService:TranslationsService) {

			$element.addClass('order__summary');
			this.translations = translationsService.translations;
        }

    }

    class OrderSummaryComponent implements ng.IComponentOptions {

        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
				data: '<'
            };
            this.controller = OrderSummaryController;
            this.template = HtmlTemplates.order.summary.html;
        }
    }

    angular.module(moduleId).component("orderSummary", new OrderSummaryComponent());

}
