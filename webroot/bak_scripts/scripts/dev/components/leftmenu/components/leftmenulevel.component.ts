/**
 * Created by MST on 19-04-2016.
 */
///<reference path="../../../../references/references.ts"/>

namespace LeftMenuModule {

	export interface ILeftMenuLevelBindings {
		item:any;
		level:any;
	}

	class LeftMenuLevelController implements ILeftMenuLevelBindings {
		public item;
		public level;

		constructor() {
		}
	}

	class LeftMenuLevelComponent implements ng.IComponentOptions {

		public controller: any;
		public template: string;
		public bindings:ILeftMenuLevelBindings;

		constructor() {
			this.bindings = {
				item: '<',
				level:'<'
			};
			this.controller = LeftMenuLevelController;
			this.template = HtmlTemplates.leftmenulevel.html;
		}
	}

	angular.module(moduleId).component("leftmenulevel", new LeftMenuLevelComponent());

}
