///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 01/07/16.
 *
 * Used to trigger search state on mobile
 * Usage:
 * <xxx trigger-search></xxx>
 *
 */

namespace SearchModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class SearchTriggerController {

		constructor(private $element, private searchurlService:SearchUrlService, private $scope, statesService: UtilsModule.StatesService) {

			// Click listener for element
			$element.bind('click', () => {
				this.searchurlService.isSearching = true;

				if (statesService.states.mobileNavigation) {
					statesService.setState("mobileNavigation", false);
				}
			});

		}

		$onDestroy() {
			this.$element.unbind();
		}
	}

	class SearchTriggerDirective implements ng.IDirective {
		public controller:any;
		public scope:any;

		constructor() {
			this.scope = {
			};
			this.controller = SearchTriggerController;
		}
	}

	angular.module(moduleId).directive("triggerSearch", DirectiveHelperService.factory(SearchTriggerDirective));

}
