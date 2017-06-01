///<reference path="../../../../references/references.ts"/>

/**
 * View logged in
 * 
 * MST on 08/08/16.
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class Logout implements ng.IDirective {
		public restrict: string;
		public scope: {};
		public link: any;

		constructor(userService:UserModule.UserService) {

			this.restrict = "A";
			this.scope = true;
			this.link = (scope, element, attrs) => {

				element.bind('click',
				() => {
					userService.logout(true);
				});
				
			};
		}
	}

	angular.module(moduleId).directive("logout", DirectiveHelperService.factory(Logout));

}
