///<reference path="../../../../references/references.ts"/>

/**
 * Image on load
 * This directive listens to when an image is loaded and calls a function
 * 
 * MST on 10/06/16.
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ImageOnLoad implements ng.IDirective {
		public restrict: string;

		public scope: {
			imageonload: string;
		};

		public link: any;

		constructor() {

			this.restrict = "A";
			this.scope = {
				imageonload: "&"
			};
			this.link = (scope, element) => {
				element.bind('load', () => {
					scope.$apply(scope.imageonload)(true, element[0].src);
				});

				element.bind('error', () => {
					scope.$apply(scope.imageonload)(false, element[0].src);
				});

			};
		}
	}

	angular.module(moduleId).directive("imageonload", DirectiveHelperService.factory(ImageOnLoad));
}