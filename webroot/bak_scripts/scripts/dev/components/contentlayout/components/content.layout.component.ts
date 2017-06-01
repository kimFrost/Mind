/// <reference path="../../../../references/references.ts" />

namespace ContentLayoutModule {
	class ContentLayoutController {
		constructor() {
		}

		public createRange(number) {
			const range = [];

			for (let i = 0; i < number; i++) {
				range.push(i);
			}

			return range;
		}
	}

	class ContentLayoutComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = ContentLayoutController;
			this.template = HtmlTemplates.content.layout.html;
		}
	}

	angular.module(moduleId).component("contentLayout", new ContentLayoutComponent());
} 