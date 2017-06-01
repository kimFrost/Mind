///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {


	class NemligLoaderController {

		public inverted:string;
		public circlePath:string;
		public nPath:string;
		private staticResourcesPath:string;

		constructor(private settingsService:PageModule.SettingsService) {
			this.staticResourcesPath = this.settingsService.settings.StaticResourcesPath;
			this.circlePath = this.staticResourcesPath + "/images/logos/progress_circle" + (this.inverted === "true"?"_inverted":"") + ".svg";
			this.nPath = this.staticResourcesPath + "/images/logos/progress_n" + (this.inverted === "true"?"_inverted":"") + ".svg";
		}


	}

	class NemligLoaderComponent implements ng.IComponentOptions {
		
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				inverted:"@"
			};
			this.controller = NemligLoaderController;
			this.template = "<img ng-src='{{$ctrl.circlePath}}' alt='nemlig loader' class='nemlig-loader__circle' /><img ng-src='{{$ctrl.nPath}}' alt='nemlig loader' class='nemlig-loader__n' />";
		}
	}
	
	angular.module(moduleId).component("nemligLoader", new NemligLoaderComponent());

}
