///<reference path="../../../../../references/references.ts"/>

namespace FeatureImageSpotModule {

	class FeatureImageSpotController {

		public spotdata:any;
		public dataBinding:number;
		public functionBinding:() => any;
		public themeColors = {
			backgroundColor: "#fff",
			textColor: "#3e3e3d"
		};

		constructor(private trackingService: TrackingModule.TrackingService) {

			// Theme colors
			if (this.spotdata.BackgroundTheme) {
				this.themeColors.backgroundColor = this.spotdata.BackgroundTheme.Color;
			}
			if (this.spotdata.TextTheme) {
				this.themeColors.textColor = this.spotdata.TextTheme.Color;
			}

			// Setting default if no size is chosen by editor
			if (!this.spotdata.TextSize) {
				this.spotdata.TextSize = {};
				this.spotdata.TextSize.Size = "large";
			}

			// Setting default if no anchor position is chosen by editor
			if (this.spotdata.TextAnchor === null) {
				this.spotdata.TextAnchor = {};
				this.spotdata.TextAnchor.Position = "center";
			}
		}

		public trackClick(e?:Event) {
			if (e) {
				e.stopPropagation();
			}
			this.trackingService.trackPromoClick(this.spotdata);
		}

	}

	class FeatureImageSpotComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				spotdata: '='
			};
			this.controller = FeatureImageSpotController;
			this.template = HtmlTemplates.featureimagespot.html;

		}
	}

	angular.module(moduleId).component('featureimagespot', new FeatureImageSpotComponent());

} 
