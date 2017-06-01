///<reference path="../../../../references/references.ts"/>


namespace UtilsModule {

	import DirectiveHelperService = Global.DirectiveHelperService;

	class MaxValueDirective implements ng.IDirective {
		public restrict: string;
		public scope:any;
		public link:any;
		public require:any;

		constructor() {
			this.restrict = "A";
			this.require = "ngModel";
			this.link = (scope, element, attributes, ctrl) => {
				ctrl.$validators.maxValue = function (modelValue, viewValue) {
					return Math.round(modelValue) <= attributes.maxValue;
				};
			};
		}
	}

	angular.module(moduleId).directive("maxValue", DirectiveHelperService.factory(MaxValueDirective));

}

