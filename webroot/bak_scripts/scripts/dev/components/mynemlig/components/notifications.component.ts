///<reference path="../../../../references/references.ts"/>


namespace MyNemligModule {

	class NotificationsController {

		public spotdata:any;

		constructor(public translationsService: TranslationsModule.TranslationsService) {

		}

	}

	class NotificationsComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = NotificationsController;
			this.template = HtmlTemplates.notifications.html;
		}
	}

	angular.module(moduleId).component("notifications", new NotificationsComponent());

}
