///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type Translations = SCommerce.Core.Dictionary.Translations;

	class CreateUserLockedController {

		public translations:Translations = {} as Translations;
		public user:any;

		constructor() {

		}

	}

	class CreateUserLockedComponent implements ng.IComponentOptions {
		public controller:any;
		public template:any;
		public bindings:any;

		constructor() {
			this.controller = CreateUserLockedController;
			this.template = HtmlTemplates.create.user.locked.html;
			this.bindings = {
				user: "<"
			};
		}

	}

	angular.module(moduleId).component("createUserLocked", new CreateUserLockedComponent());
}
