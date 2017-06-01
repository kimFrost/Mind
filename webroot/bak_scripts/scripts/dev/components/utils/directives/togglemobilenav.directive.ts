///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ToggleMobileNav implements ng.IDirective {
		public restrict: string;
		public link: any;

		constructor(statesService: StatesService, searchurlService: SearchModule.SearchUrlService) {

			this.restrict = "A";
			this.link = (scope, element) => {
				element.on("click", () => {
					if (statesService.states.mobileNavigation) {
						statesService.setState("mobileNavigation", false);
					} else {
						statesService.setState("mobileNavigation", true);

						if (statesService.states.showingSearch) {
							searchurlService.updateSearchQuery("");
						}
					}
				});
			};
		}
	}

	angular.module(moduleId).directive("toggleMobileNav", DirectiveHelperService.factory(ToggleMobileNav));
}
