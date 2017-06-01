/// <reference path="../../../../references/references.ts" />

namespace RibbonsLayoutModule {

	class RibbonsLayoutController {

		public fadeIn:boolean = false;

		constructor(private $timeout: ng.ITimeoutService) {
			this.$timeout( () => {
				this.fadeIn = true;
			}, 200);
		}

		public createRange(number) {
			const range = [];

			for (let i = 0; i < number; i++) {
				range.push(i);
			}

			return range;
		}
	}

	class RibbonsLayoutComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = RibbonsLayoutController;
			this.template = HtmlTemplates.ribbons.layout.html;
		}
	}

	angular.module(moduleId).component("ribbonsLayout", new RibbonsLayoutComponent());
} 