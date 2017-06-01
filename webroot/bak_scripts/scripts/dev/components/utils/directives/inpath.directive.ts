///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class InpathDirective implements ng.IDirective {
		public link: any;

		constructor($rootScope: ng.IRootScopeService, $location: ng.ILocationService) {
			this.link = (scope, element) => {
				const path = element[0].pathname ? element[0].pathname : element.find("a")[0].pathname;

				if (path) {
					$rootScope.$on("PAGE_CHANGED", () => {
						path === $location.url() ? element.addClass("inpath") : element.removeClass("inpath");
					});
				}
			};
		}
	}

	angular.module(moduleId).directive("inpath", DirectiveHelperService.factory(InpathDirective));
}