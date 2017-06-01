///<reference path="../../../../references/references.ts"/>

namespace PageModule {
	class PageLoadingController {
		public spot: any;

		constructor($rootScope:ng.IRootScopeService,
					$timeout,
					$element) {

			var timeout = null;

			$rootScope.$on('$stateChangeStart', () => {
				timeout = $timeout( () => {
					$element.removeClass("page-loading__hidden");
				}, 150);
			});

			$rootScope.$on('$stateChangeSuccess', () => {
				$timeout.cancel(timeout);
				$element.addClass("page-loading__hidden");
			});

			$rootScope.$on('$stateChangeError', () => {
				$timeout.cancel(timeout);
				$element.addClass("page-loading__hidden");
			});
		}
	}

	class PageLoadingComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = PageLoadingController;
			this.template = "<nemlig-loader class='nemlig-loader nemlig-loader_large'></nemlig-loader>";
		}
	}
	
	angular.module(moduleId).component("pageloading", new PageLoadingComponent());

}
