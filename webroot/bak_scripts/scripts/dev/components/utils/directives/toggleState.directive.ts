///<reference path="../../../../references/references.ts"/>

/**
 * Created by TTH on 11/06/16.
 *
 * Generic directive to toggle states in statesService.
 * Usage:
 * <element toggle-state="stateToToggle"></element>
 * The state-to-toggle must be added to statesNames object in states.service.ts
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ToggleState implements ng.IDirective {

		public restrict: string;
		public link: any;

		constructor(statesService: StatesService) {

			this.restrict = "A";
			this.link = (scope, element, attrs) => {

				// Click listener for element
				element.bind('click',
				() => {
					scope.$applyAsync(() => {
						// Toggle state in statesService
						statesService.toggleState(attrs.toggleState);
					});
				});
			};
		}
	}

	angular.module(moduleId).directive("toggleState", DirectiveHelperService.factory(ToggleState));

}
