///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {
	class SearchOverlayController {
		public active = false;

		constructor(private $scope: ng.IScope, private searchurlService: SearchUrlService, statesService: UtilsModule.StatesService) {

			$scope.$watch(() => {
				return this.searchurlService.searchActive;
			}, (newVal) => {
				this.active = newVal;
				statesService.setState("showingSearch", newVal);
			});
		}
	}

	class SearchOverlayComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = SearchOverlayController;
			this.template = HtmlTemplates.searchoverlay.html;
		}
	}

	angular.module(moduleId).component("searchoverlay", new SearchOverlayComponent());
}
