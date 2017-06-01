///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class CloseSearch implements ng.IDirective {
		public restrict: string;
		public scope: {};
		public link: any;

		constructor(searchurlService: SearchModule.SearchUrlService) {
			this.restrict = "A";
			this.scope = true;
			this.link = (scope, element) => {

				element.bind('click',
					() => {
						searchurlService.closeSearch();
					});

			};
		}
	}

	angular.module(moduleId).directive("closeSearch", DirectiveHelperService.factory(CloseSearch));

}
