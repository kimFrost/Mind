///<reference path="../../../../references/references.ts"/>

/**
 * @author TTH
 * @description Directive to close timeslot selector from other elements via click/tap
 * @example <element close-timeslot-selector></element>
 * 
 */

namespace TimeslotModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class CloseTimeslotSelector implements ng.IDirective {

		public restrict: string;
		public link: any;

		constructor(timeslotService: TimeslotService) {

			this.restrict = "A";
			this.link = (scope, element, attrs) => {

				// Click listener for element
				element.bind('click',
				() => {
					scope.$applyAsync(() => {
						timeslotService.closeTimeslotSelector();
					});
				});
			};
		}
	}

	angular.module(moduleId).directive("closeTimeslotSelector", DirectiveHelperService.factory(CloseTimeslotSelector));

}
