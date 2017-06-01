///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type Translations = SCommerce.Core.Dictionary.Translations;

	class EditUserController {

		public translations:Translations = {} as Translations;
		public user:any;

		constructor() {

		}

	}

	class EditUserComponent implements ng.IComponentOptions {
		public controller:any;
		public template:any;
		public bindings:any;

		constructor() {
			this.controller = EditUserController;
			this.template = HtmlTemplates.edit.user.html;
			this.bindings = {
				user: "<"
			};
		}

	}

	angular.module(moduleId).component("editUser", new EditUserComponent());
}
