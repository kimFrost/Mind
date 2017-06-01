///<reference path="../../../../references/references.ts"/>

/**
 * This directive restricts to enter "Return" key on element
 *
 * MKI on 05/08/16.
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class NoReturnKey implements ng.IDirective {
		public restrict: string;
		public scope: {

		};
		public link: any;

		constructor() {

			this.restrict = "A";
			this.scope = {};
			this.link = (scope, element) => {

				element.on('keypress', function(event) {
					if (event.keyCode === 13) {
						event.preventDefault();
					}
				});
			};
		}
	}

	angular.module(moduleId).directive("noReturnKey", DirectiveHelperService.factory(NoReturnKey));

}
