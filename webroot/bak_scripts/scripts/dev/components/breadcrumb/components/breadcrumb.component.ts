///<reference path="../../../../references/references.ts"/>
/**
 * Created by MST on 27-04-2016.
 */

namespace BreadcrumbModule {
	class BreadcrumbController {
		public pages:Array<any> = [];

		constructor(private menuService: NavigationModule.MenuService) {
			this.pages = menuService.breadcrumb;
		}
	}

	class BreadcrumbComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = BreadcrumbController;
			this.template = HtmlTemplates.breadcrumb.html;
		}
	}

	angular.module(moduleId).component("breadcrumb", new BreadcrumbComponent());

}
