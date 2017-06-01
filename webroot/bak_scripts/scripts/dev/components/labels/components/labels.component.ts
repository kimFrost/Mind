///<reference path="../../../../references/references.ts"/>

namespace LabelsModule {
	class LabelsController {
		public labelData: Array<string>;

		constructor(public settingsService: PageModule.SettingsService) {
		}
	}

	class LabelsComponent implements ng.IComponentOptions {
		public bindings: Object;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				labelData: '<'
			};
			this.controller = LabelsController;
			this.template = HtmlTemplates.labels.html;
		}
	}

	angular.module(moduleId).component("labels", new LabelsComponent());

}
