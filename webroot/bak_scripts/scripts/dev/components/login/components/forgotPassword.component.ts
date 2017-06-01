///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 08/11/2016.
 */

namespace UserModule {

	type IRequestResetPasswordResponse = UserModule.IRequestResetPasswordResponse; 

	type TranslationsService = TranslationsModule.TranslationsService;
	type ValidateFormService = UtilsModule.ValidateFormService;
	type RegexApiService = UtilsModule.RegexApiService;
	type UserService = UserModule.UserService;

	class ForgotPasswordController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public emailRegExPattern:any;
		public currentServerError:string = '';
		public states = {
			fetching: false,
			resetError: false,
			resetSuccess: false
		};

		constructor(
			private regexApiService: RegexApiService,
			private translationsService: TranslationsService,
			private validateFormService: ValidateFormService,
			private userService: UserService) {

			this.translations = translationsService.translations;
			this.emailRegExPattern = regexApiService.API().email;
		}

		$onInit() {};

		/**
		 * @author MKI
		 * @description If form is valid, the request to requestPasswordChange is submitted
		 * @param form
		 * @param userName
		 */
		public forgotPassword(form:ng.IFormController, userName:string):void {

			let isFormValid = this.validateFormService.validateForm(form);

			if (isFormValid) {
				this.states.fetching = true;
				this.states.resetError = false;
				this.states.resetSuccess = false;
				this.currentServerError = '';

				this.userService.requestPasswordChange(userName).then((response:IRequestResetPasswordResponse) => {
					this.states.fetching = false;
					if (response.success) {
						this.states.resetError = false;
						this.states.resetSuccess = true;
					} else {
						this.states.resetError = true;
						this.currentServerError = response.reponse.data.ErrorMessage;
					}
				});
			}
		}
	}

	class ForgotPasswordComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = ForgotPasswordController;
			this.template = HtmlTemplates.forgotPassword.template.html;
			this.bindings = {};
		}
	}

	angular.module(moduleId).component("forgotPassword", new ForgotPasswordComponent());
}
