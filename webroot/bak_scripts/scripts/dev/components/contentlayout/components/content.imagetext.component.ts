/// <reference path="../../../../references/references.ts" />

namespace ContentLayoutModule {
	class ContentImagetextController {
		public data;

		constructor() {
		}
	}

	class ContentImagetextComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				data: '<'
			};
			this.controller = ContentImagetextController;
			this.template = HtmlTemplates.content.imagetext.html;
		}
	}

	angular.module(moduleId).component("contentImagetext", new ContentImagetextComponent());
} 