/// <reference path="../../../../references/references.ts" />

namespace UtilsModule {

	type SettingsService = PageModule.SettingsService;

	export class GeneralUtilService {

		constructor(
			private $timeout:ng.ITimeoutService,
			private $location:ng.ILocationService,
			private $window:ng.IWindowService,
			private settingsService: SettingsService) {}


		/**
		 * @author MKI
		 * @description Change location URL to URLPath
		 * @param URLPath
		 */
		public goToUrl(URLPath:string ='/'):void {
			this.$timeout( () => {
				this.$location.url(URLPath);
			});
		}

		/**
		 * @author MKI
		 * @description Go back 1 or multiple steps in browser
		 */
		public goBack(steps: number = -1) {
			this.$window.history.go(steps);
		}

		/**
		 * @author KFN
		 * @description Change location URL to URLPath
		 */
		public goToBasket():void {
			this.goToUrl(this.settingsService.settings.BasketPageUrl);
		}

		/**
		 * @author KFN
		 * @description Change location URL to frontpage
		 */
		public goToFrontPage():void {
			this.goToUrl('/');
		}
	}

	angular.module(moduleId).service("generalUtilService", GeneralUtilService);
}
