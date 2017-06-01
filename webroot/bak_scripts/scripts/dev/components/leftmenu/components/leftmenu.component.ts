/**
 * Created by MST on 19-04-2016.
 */
///<reference path="../../../../references/references.ts"/>

namespace LeftMenuModule {

	class LeftMenuController {
		public parentLevels: Array<any>;
		public currentLevel: Array<any>;

		public show = false;

		constructor(public menuService: NavigationModule.MenuService, $scope: ng.IScope, statesService: UtilsModule.StatesService) {

			this.currentLevel = menuService.currentLevel;
			this.parentLevels = menuService.parentLevels;

			$scope.$watch(() => {
				return statesService.states.leftmenu;
			}, (newVal) => {
				this.show = newVal;
			});

		}
	}

	class LeftMenuComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = LeftMenuController;
			this.template = HtmlTemplates.leftmenu.html;
		}
	}

	angular.module(moduleId).component("leftmenu", new LeftMenuComponent());

}
