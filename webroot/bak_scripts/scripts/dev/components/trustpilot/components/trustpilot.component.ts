///<reference path="../../../../references/references.ts"/>

namespace TrustpilotModule {

	class TrustpilotController {
		public text: string;
		public link: string;
		
		constructor(public trustpilotService: TrustpilotService) {
		}
	}

	class TrustpilotComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				text: '@',
				link: '@'
			};
			this.controller = TrustpilotController;
			this.template = HtmlTemplates.trustpilot.html;
		}
	}

	angular.module(moduleId).component("trustpilot", new TrustpilotComponent());

} 