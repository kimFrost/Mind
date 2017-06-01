///<reference path="../../../../references/references.ts"/>

namespace AdModule {
	class AdController {
		public asBackground: boolean;
		public disableLink: boolean;
		public delay: number;
		public adData: any;

		constructor(
				private trackingService: TrackingModule.TrackingService,
				$element) {
					
			this.asBackground = this.asBackground ? this.asBackground : false;
			this.disableLink = this.disableLink ? this.disableLink : false;

			if (this.delay) {
				snabbt($element,
				{
					scale: [1, 1],
					fromScale: [0.8, 0.8],
					fromOpacity: 0,
					opacity: 1,
					delay: this.delay,
					duration: 200
				});
			} else {
				$element.css("opacity", "1");
			}
		}

		public trackClick(e?:Event) {
			if (e) {
				e.stopPropagation();
			}
			this.trackingService.trackPromoClick(this.adData);
		}
	}

	class AdComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				adData: '<',
				asBackground: '<',
				disableLink: '<',
				delay: '<'
			};
			this.controller = AdController;
			this.template = HtmlTemplates.ad.html;
		}
	}

	angular.module(moduleId).component("ad", new AdComponent());
}
