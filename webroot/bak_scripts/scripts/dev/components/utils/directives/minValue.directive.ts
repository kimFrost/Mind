///<reference path="../../../../references/references.ts"/>


namespace UtilsModule {

	import DirectiveHelperService = Global.DirectiveHelperService;

	class MinValueDirective implements ng.IDirective {
		public restrict: string;
		public scope:any;
		public link:any;
		public require:any;

		constructor() {
			this.restrict = "A";
			this.require = "ngModel";
			this.link = (scope, element, attributes, ctrl) => {
				ctrl.$validators.minValue = function (modelValue, viewValue) {
					return Math.round(modelValue) >= attributes.minValue;
				};
			};
		}
	}

	angular.module(moduleId).directive("minValue", DirectiveHelperService.factory(MinValueDirective));

}

