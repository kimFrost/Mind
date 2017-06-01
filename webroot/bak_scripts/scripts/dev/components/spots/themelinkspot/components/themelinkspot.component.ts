/// <reference path="../../../../../references/references.ts" />

namespace ThemeLinkSpotModule {

	class ThemeLinkSpotController {

		public spotdata: any;
		public hasThemeBackground: boolean;
		public themeColors = {
			backgroundColor: "#ffffff",
			textColor: "#3e3e3d"
		};

		constructor() {
			// Theme colors
			if (this.spotdata.BackgroundTheme) {
				this.themeColors.backgroundColor = this.spotdata.BackgroundTheme.Color;
				this.hasThemeBackground = true;
			}
			if (this.spotdata.TextTheme) {
				this.themeColors.textColor = this.spotdata.TextTheme.Color;
			}
		}

		$onInit() {}
	}

	class ThemeLinkSpotComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = ThemeLinkSpotController;
			this.template = HtmlTemplates.themelinkspot.html;
		}
	}

	angular.module(moduleId).component("themelinkspot", new ThemeLinkSpotComponent());
} 