///<reference path="../../../../references/references.ts"/>

namespace MyNemligModule {

	class PrintOrderController {

		public order:any;

		constructor(private $window) {}

		$onInit() {
			var data = this.$window.printData;

			if (data) {
				this.order = data;
				setTimeout(() => {
					window.print();
				}, 500);
			}
		}

	}

	class PrintOrderComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {};
			this.controller = PrintOrderController;
			this.template = HtmlTemplates.print.order.html;
		}
	}

	angular.module(moduleId).component("printOrder", new PrintOrderComponent());

}
