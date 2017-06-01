///<reference path="../../../../references/references.ts"/>

namespace MyNemligModule {

	type TranslationsService = TranslationsModule.TranslationsService;

    class OrderItemController {

		public translations: Object;
		public data: any;

		constructor(private $element,
					private translationsService:TranslationsService) {

			$element.addClass('order__item');
			this.translations = translationsService.translations;
        }

    }

    class OrderItemComponent implements ng.IComponentOptions {

        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
				data: '<'
            };
            this.controller = OrderItemController;
            this.template = HtmlTemplates.order.item.html;
        }
    }

    angular.module(moduleId).component("orderItem", new OrderItemComponent());

}
