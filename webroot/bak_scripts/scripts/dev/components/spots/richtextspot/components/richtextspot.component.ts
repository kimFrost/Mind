/// <reference path="../../../../../references/references.ts" />

namespace RichTextSpotModule {

	class RichTextSpotController {
		public spotdata;
		public imageOnly: boolean = false;

		constructor() {
			if (this.spotdata.ImageForJson !== null
				&& !this.spotdata.Header
				&& !this.spotdata.LinkText
				&& !this.spotdata.Text) {
				this.imageOnly = true;
			}
		}

		$onInit() {}
	}

	class RichTextSpotComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = RichTextSpotController;
			this.template = HtmlTemplates.richtextspot.html;
		}
	}

	angular.module(moduleId).component("richtextspot", new RichTextSpotComponent());
}
