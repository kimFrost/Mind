///<reference path="../../../../references/references.ts"/>

namespace PageModule {

	export interface ICreateUserPageBindings {
		pagedata: any;
	}

	class CreateUserPageController implements ICreateUserPageBindings {

		public pagedata:IPageData;

		constructor(private $element:ng.IRootElementService) {

			$element.addClass('create-user-page');
		}

	}

	class CreateUserPageComponent implements ng.IComponentOptions {

		public bindings:ICreateUserPageBindings;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				pagedata: '<'
			};
			this.controller = CreateUserPageController;
			this.template = HtmlTemplates.createuserpage.html;
		}
	}

	angular.module(moduleId).component("createuserpage", new CreateUserPageComponent());

}
