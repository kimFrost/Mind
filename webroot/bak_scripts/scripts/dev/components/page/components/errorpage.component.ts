///<reference path="../../../../references/references.ts"/>

namespace PageModule {
	class ErrorPageController {
		public pagedata: any;
		public content: any;

		constructor() {

			let hasSpotContent = this.pagedata['content'];

			if(hasSpotContent){
				this.content = this.pagedata.content[0];
			}
		}
	}

	class ErrorPageComponent implements ng.IComponentOptions {
		public bindings: any;
		public template: string;
		public controller: any;

		constructor() {
			this.bindings = {
				pagedata: '='
			};
			this.controller = ErrorPageController;
			this.template = HtmlTemplates.errorpage.html;
		}
	}

	angular.module(moduleId).component("errorpage", new ErrorPageComponent());

}
