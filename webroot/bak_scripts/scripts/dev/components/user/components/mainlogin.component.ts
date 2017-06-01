///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type StatesService =  UtilsModule.StatesService;

	class MainLoginController {

		public startResetPassword:boolean = false;

		constructor(private $location:ng.ILocationService,
					private statesService:StatesService) {

			if (this.$location.search().resetpassword === "true") {
				this.startResetPassword = true;
			}

		}

		$onInit() {
			// Hide minibasket and mobile nav
			this.statesService.setState('minibasketVisible', false);
			this.statesService.setState('mobileNavigation', false);
		}

	}

	class MainLoginComponent implements ng.IComponentOptions {
		public controller:any;
		public template:any;
		public transclude:any;

		constructor() {
			this.controller = MainLoginController;
			this.transclude = true;
			this.template = HtmlTemplates.mainlogin.html;
		}

	}

	angular.module(moduleId).component("mainLogin", new MainLoginComponent());
}
