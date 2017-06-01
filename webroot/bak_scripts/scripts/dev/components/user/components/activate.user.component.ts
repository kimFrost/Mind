///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type Translations = SCommerce.Core.Dictionary.Translations;

	class ActivateUserController {

		public translations: Translations = {} as Translations;
		public user: any;
		public token: string;
		public redirectUrl: string;
		public fetching:boolean = true;

		constructor(
			private translationsService: TranslationsModule.TranslationsService,
			private $location:any,
			private userService: UserService,
			public settingsService: PageModule.SettingsService) {

			this.redirectUrl = settingsService.settings.LoginPageUrl;

			var params = this.$location.search();
			if (!params) {
				params = {};
			}
			var guid = params.guid;
			if (!params.setpassword) {
				params.setpassword = '';
			}
			var setPassword = (params.setpassword.toLowerCase() === 'true');
			
			this.userService.activateUser(guid, setPassword).then( response => {
				this.user['IsActivated'] = response.isActivated;
				this.user['SetPassword'] = response.SetPassword;
				this.fetching = false;
			});
			this.translations = translationsService.translations;

		}

	}

	class ActivateUserComponent implements ng.IComponentOptions {
		public controller: any;
		public template: any;
		public bindings: any;

		constructor() {
			this.controller = ActivateUserController;
			this.template = HtmlTemplates.activate.user.html;
			this.bindings = {
				user: "<"
			};
		}

	}

	angular.module(moduleId).component("activateUser", new ActivateUserComponent());
}
