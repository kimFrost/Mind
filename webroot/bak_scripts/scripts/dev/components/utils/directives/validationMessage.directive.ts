///<reference path="../../../../references/references.ts"/>

/**
 * Image on load
 * This directive restricts to enter "Return" key on element
 *
 * MKI on 05/08/16.
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ValidationMsg implements ng.IDirective {
		public restrict: string;
		public replace: boolean;
		public transclude: boolean;
		public template: Function;

		constructor() {

			this.restrict = "EA";
			this.replace = true;
			this.transclude = true;
			this.template = this.attachElement;
		}

		public attachElement(tElem, tAttrs) {
			var form = tAttrs.targetform ? tAttrs.targetform : tElem.closest('form').attr('name');
			var field = form + '.' + tAttrs.for;
			return '<div class="errorMsg ng-hide" ng-messages="' + field + '.$error" ng-show="' + field + '.$dirty && ' + field + '.$touched || ' + form + '.$submitted" role="alert" ng-transclude></div>';
		}
	}

	angular.module(moduleId).directive("validationMsg", DirectiveHelperService.factory(ValidationMsg));
}
