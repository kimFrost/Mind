/**
 * Created by TTH on 11/06/16.
 *
 * Directive to toggle the filter overlay.
 * Usage:
 * <element toggle-filter-overlay></element>
 * The state-to-toggle must be added to statesNames object in states.service.ts
 */

namespace FilterModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ToggleFilterOverlay implements ng.IDirective {

		public restrict: string;
		public link: any;

		constructor(statesService: UtilsModule.StatesService) {

			this.restrict = "A";
			this.link = (scope, element) => {

				// Click listener for element
				element.bind('click', (e) => {
						e.preventDefault();

						if (statesService.states.filterVisible === false) {
							statesService.setState("filterVisible", true);
						} else {
							// Toggle state in statesService
							statesService.setState("filterVisible", false);
						}
					});
			};
		}
	}

	angular.module(moduleId).directive("toggleFilterOverlay", DirectiveHelperService.factory(ToggleFilterOverlay));

}
