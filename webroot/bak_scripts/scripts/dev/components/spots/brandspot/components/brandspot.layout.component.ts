///<reference path="../../../../../references/references.ts"/>

namespace BrandSpotModule {

	class BrandSpotLayoutController {

		public spotdata: string;
		public dataBinding: number;
		public functionBinding: () => any;

		constructor() {}

		$onInit() {}

		$onDestroy() {}

	}

	class BrandSpotLayoutComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = BrandSpotLayoutController;
			this.template = HtmlTemplates.brandspotslayout.html;
		}
	}

	angular.module(moduleId).component("brandspotslayout", new BrandSpotLayoutComponent());

} 
