///<reference path="../../../../../references/references.ts"/>

namespace TextSpotModule {

	class TextSpotController {

		public spotdata:any;
		public hasBackgroundOverlay: boolean;
		public themeColors = {
			backgroundColor: "#fff",
			textColor: "#3e3e3d"
		};

		constructor() {
			this.hasBackgroundOverlay = this.spotdata.BackgroundImageOverlay;
			
			// Theme colors
			if (this.spotdata.BackgroundTheme) {
				this.themeColors.backgroundColor = this.spotdata.BackgroundTheme.Color;
			}
			if (this.spotdata.TextTheme) {
				this.themeColors.textColor = this.spotdata.TextTheme.Color;
			}
		}

		$onInit() {
		}

		$onDestroy() {
		}

	}

	class TextSpotComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				spotdata: '='
			};
			this.controller = TextSpotController;
			this.template = HtmlTemplates.textspot.html;
		}
	}

	angular.module(moduleId).component("textspot", new TextSpotComponent());

} 
