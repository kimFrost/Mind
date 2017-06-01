///<reference path="../../../../references/references.ts"/>

namespace ProductlistModule {
	class ProductlistTabsController {
		public spotdata: any;
		public activeId: number = 0;
		public hasThemeBackground: boolean;
		public themeColors = {
			backgroundColor: "",
			textColor: ""
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

		public setActiveId(index) {
			this.activeId = index;
		}
	}

	class ProductlistTabsComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = ProductlistTabsController;
			this.template = HtmlTemplates.productlist.tabs.html;
		}
	}

	angular.module(moduleId).component("productlistTabs", new ProductlistTabsComponent());
}
