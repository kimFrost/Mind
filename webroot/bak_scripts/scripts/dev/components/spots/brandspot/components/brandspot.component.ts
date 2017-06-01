///<reference path="../../../../../references/references.ts"/>

namespace BrandSpotModule {

	class BrandSpotController {

		public spotdata: string;
		public dataBinding: number;
		public functionBinding: () => any;

		constructor() {}

		$onInit() {}

		$onDestroy() {}

	}

	class BrandSpotComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '='
			};
			this.controller = BrandSpotController;
			this.template = HtmlTemplates.brandspot.html;
		}
	}

	angular.module(moduleId).component("brandspot", new BrandSpotComponent());

} 
