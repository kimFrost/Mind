///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ScrollToTopIfSamePage implements ng.IDirective {
		public restrict: string;
		public scope: {};
		public link: any;

		constructor(scrollService: ScrollService, $location: ng.ILocationService) {
			this.restrict = "A";
			this.scope = true;
			this.link = (scope, element) => {

				element.on("click", () => {
					if (element.attr("href") === $location.path()) {
						scrollService.scrollToTop();
					}
				});

			};
		}
	}

	angular.module(moduleId).directive("scrollToTopIfSamePage", DirectiveHelperService.factory(ScrollToTopIfSamePage));

}
