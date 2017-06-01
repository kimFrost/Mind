///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type Translations = SCommerce.Core.Dictionary.Translations;

	class ChangePasswordController {

		public translations:Translations = {} as Translations;
		public resetPasswordMode:boolean = false;

		public states = {
			fetching: false,
			resetError: false,
			loginError: false,
			resetSuccess: false,
			showinput: true,
			showFeedbackMsg: false,
			feedbackIsError:false
		};

		public feedbackMsg:string;

		public userServiceStates:any;
		public token:string = '';


		constructor(private userService:UserService,
					private translationsService:TranslationsModule.TranslationsService,
					private $timeout: ng.ITimeoutService,
					private settingsService:PageModule.SettingsService,
					private $location: ng.ILocationService) {

			this.translations = translationsService.translations;
			this.userServiceStates = userService.states;

			this.readToken();
		}

		private readToken = () => {
			let token = this.$location.search().token;
			if (token) {
				this.token = token;
			}
		};

		public requestChangePassword = (newPassword:string, newPasswordConfirmed:string) => {
			if (this.token && !this.userServiceStates.isLoggedIn) {
				this.states.fetching = true;
				this.states.showFeedbackMsg = false;

				this.userService.changePasswordByRequest(newPassword, newPasswordConfirmed, this.token).then(() => {
					this.feedbackMsg = this.translations.Authentication.RequestChangePassword.Success;
					this.states.showFeedbackMsg = true;
					this.states.feedbackIsError = false;

					this.$timeout(() => {
						this.$location.url(this.settingsService.settings.LoginPageUrl);
					}, 1500);
					
				}).catch((error) => {
					this.states.fetching = false;
					var dataObj:any = error.data;
					this.states.feedbackIsError = true;
					this.feedbackMsg = dataObj.ErrorMessage;
					this.states.showFeedbackMsg = true;
				});
			}
			else {
				this.states.showFeedbackMsg = true;
				this.feedbackMsg = this.translations.Authentication.RequestChangePassword.ErrorTokenInvalid;
			}
		};

		public changePassword = (oldPassword:string, newPassword:string, newPasswordConfirmed:string) => {
			if (this.userServiceStates.isLoggedIn) {
				this.states.fetching = true;
				this.userService.changePassword(oldPassword, newPassword, newPasswordConfirmed).then((response) => {
					this.states.fetching = false;
					this.feedbackMsg = this.translations.Authentication.ChangePassword.Success;
					this.states.showFeedbackMsg = true;
					this.states.feedbackIsError = false;
				}).catch((error) => {
					this.states.fetching = false;
					var dataObj:any = error.data;
					this.feedbackMsg = dataObj.ErrorMessage;
					this.states.showFeedbackMsg = true;
					this.states.feedbackIsError = true;
				});
			}
		};

		$onDestroy() {
			this.states.fetching = false;
		}
	}

	class ChangePasswordComponent implements ng.IComponentOptions {
		public controller:any;
		public template:any;
		public transclude:any;
		public bindings:any;

		constructor() {
			this.controller = ChangePasswordController;
			this.transclude = true;
			this.template = HtmlTemplates.change.password.html;
			this.bindings = {
				allowCreate: "<"
			};
		}

	}

	angular.module(moduleId).component("changePassword", new ChangePasswordComponent());
}
