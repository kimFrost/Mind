///<reference path="../../../../references/references.ts"/>


namespace UtilsModule {

	import DirectiveHelperService = Global.DirectiveHelperService;

	class CompareToDirective implements ng.IDirective {
		public scope:any;
		public link:any;
		public require:any;

		constructor() {
			this.require = "ngModel";
			this.scope = {
				otherModelValue: "=compareTo"
			};
			this.link = (scope, element, attributes, ngModel) => {
				ngModel.$validators.compareTo = function (modelValue) {
					return modelValue === scope.otherModelValue;
				};
				scope.$watch("otherModelValue", function () {
					ngModel.$validate();
				});
			};
		}
	}

	angular.module(moduleId).directive("compareTo", DirectiveHelperService.factory(CompareToDirective));

}

