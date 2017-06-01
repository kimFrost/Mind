///<reference path="../../../../references/references.ts"/>

namespace SocialModule {
	class SocialController {

		constructor(public socialService: SocialService) {
		}
	}

	class SocialComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = SocialController;
			this.template = HtmlTemplates.social.html;
		}
	}

	angular.module(moduleId).component("social", new SocialComponent());
} 