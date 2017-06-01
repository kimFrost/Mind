///<reference path="../../../../references/references.ts"/>

namespace NavigationModule {
	class MegaMenuController {
		public menuData: any;
		public levelDepth: number;

		public items: any;
		public level = 0;

		public showAllText: string;

		constructor($rootScope: ng.IRootScopeService,
			$scope: ng.IScope,
			menuService: MenuService,
			public megaMenuService: MegaMenuService,
			private responsiveService: UtilsModule.ResponsiveService) {

			$rootScope.$on("MENU_SERVICE_READY", () => {
				this.items = menuService.getMenuLevels(this.menuData.Id, this.levelDepth);
			});
		}

		private setActive = () => {
			this.megaMenuService.activeId = this.menuData.Id;
			this.megaMenuService.activeLevel = this.level;
			this.megaMenuService.activeAd = this.menuData.Advertisement;
		};

		private resetActive = () => {
			this.megaMenuService.activeId = null;
			this.megaMenuService.activeLevel = 0;
			this.megaMenuService.activeAd = null;
		};

		public mouseSetActive = () => {
			if (!this.responsiveService.isTouch) {
				this.setActive();
			}
		};

		public mouseResetActive = () => {
			if (!this.responsiveService.isTouch) {
				this.resetActive();
			}
		};

		public touchToggleActive = () => {
			if (this.responsiveService.isTouch) {
				if (this.megaMenuService.activeId === this.menuData.Id) {
					this.resetActive();
				}
				else {
					this.setActive();
				}
			}
		};
	}

	class MegaMenuComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;
		public transclude: boolean;

		constructor() {
			this.bindings = {
				menuData: '<',
				levelDepth: '<',
				showAllText: '<'
			};

			this.transclude = true;
			this.controller = MegaMenuController;
			this.template = HtmlTemplates.megamenu.html;
		}
	}

	angular.module(moduleId).component("megaMenu", new MegaMenuComponent());
} 
