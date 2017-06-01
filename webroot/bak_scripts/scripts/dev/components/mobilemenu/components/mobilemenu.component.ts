/**
 * Created by MST on 28-04-2016.
 */
///<reference path="../../../../references/references.ts"/>

namespace MobileMenuModule {
	type MenuService = NavigationModule.MenuService;
	type TranslationsService = TranslationsModule.TranslationsService;
	type SettingsService = PageModule.SettingsService;

	class MobileMenuController {
		public parentLevels: Array<any>;
		public currentLevel: Array<any>;
		public homepageTitle: string = "";

		constructor(menuService: MenuService,
			public translationsService: TranslationsService,
			public settingsService: SettingsService) {

			this.homepageTitle = this.settingsService.settings.HomePageTitle;

			this.currentLevel = menuService.currentLevel;
			this.parentLevels = menuService.parentLevels;
		}
	}

	class MobileMenuComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = MobileMenuController;
			this.template = HtmlTemplates.mobilemenu.html;
		}
	}

	angular.module(moduleId).component("mobilemenu", new MobileMenuComponent());
}
