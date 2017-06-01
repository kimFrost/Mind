/// <reference path="../../../../references/references.ts" />

namespace ContentLayoutModule {
	class ContentBackgroundController {
		constructor() {
		}
	}

	class ContentBackgroundComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				data: '<'
			};
			this.controller = ContentBackgroundController;
			this.template = HtmlTemplates.content.background.html;
		}
	}

	angular.module(moduleId).component("contentBackground", new ContentBackgroundComponent());
} 