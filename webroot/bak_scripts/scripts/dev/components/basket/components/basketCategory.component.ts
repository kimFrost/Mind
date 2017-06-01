///<reference path="../../../../references/references.ts"/>

namespace BasketModule {

	class BasketCategoryController {

		constructor(private $element) {
			$element.addClass('basket__category');

		}

		$onInit() {

		}

		$onDestroy() {

		}
	}

	class BasketCategoryComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				category: '<'
			};
			this.controller = BasketCategoryController;
			this.template = HtmlTemplates.basketCategory.html;
		}
	}

	angular.module(moduleId).component("basketCategory", new BasketCategoryComponent());

}
