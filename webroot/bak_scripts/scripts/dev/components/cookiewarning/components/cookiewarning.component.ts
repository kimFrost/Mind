///<reference path="../../../../references/references.ts"/>

namespace CookieWarningModule {
	class CookieWarningController {
		public modeldata: SCommerce.Website.Code.Cookie.ICookieWarningModel;

		constructor(public cookieWarningService: CookieWarningService) {
		}
	}

	class CookieWarningComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				modeldata: '<'
			};
			this.controller = CookieWarningController;
			this.template = HtmlTemplates.cookiewarning.html;
		}
	}

	angular.module(moduleId).component("cookieWarning", new CookieWarningComponent());

} 