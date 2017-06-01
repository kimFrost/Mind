///<reference path="../../../../references/references.ts"/>

/**
 * View logged in
 * 
 * MST on 08/08/16.
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class ViewLoggedIn implements ng.IDirective {
		public restrict: string;
		public scope: {};
		public link: any;

		constructor(userService: UserModule.UserService) {

			this.restrict = "A";
			this.scope = true;
			this.link = (scope) => {

				scope.userService = userService;
				scope.isLoggedIn = true;
				
				scope.$watch( () => {
					return scope.userService.states.isLoggedIn;
				}, (newVal, oldVal) => {
					scope.isLoggedIn = newVal;
				});
				
				
			};
		}
	}

	angular.module(moduleId).directive("viewLoggedIn", DirectiveHelperService.factory(ViewLoggedIn));

}
