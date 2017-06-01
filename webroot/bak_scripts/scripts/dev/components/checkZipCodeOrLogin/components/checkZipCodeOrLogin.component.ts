///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 04-11-2016.
 */
namespace CheckZipCodeOrLoginModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	class CheckZipCodeOrLoginController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public emailRegExPattern:any;
		public states:any;

		constructor(
			private translationsService: TranslationsService,
			private checkZipCodeOrLoginService: CheckZipCodeOrLoginService,
			private regexApiService: UtilsModule.RegexApiService) {

			this.translations = translationsService.translations;
			this.emailRegExPattern = regexApiService.API().email;
			this.states = this.checkZipCodeOrLoginService.getStates();
		}

		$onInit() {
			this.checkZipCodeOrLoginService.clearStates();
		};

		/**
		 * @author MKI
		 * @description If the form is valid then check zip code for delivery
		 * @param form
		 * @param zipCode
		 */
		public submitLookupZipCode(form:ng.IFormController, zipCode:number):void {

			let isFormValid = this.checkZipCodeOrLoginService.isFormValid(form);

			if (isFormValid) {
				this.checkZipCodeOrLoginService.checkZipCodeForDelivery(zipCode);
			}
		}

		/**
		 * @author MKI
		 * @description If the form validates all required fields, then start login user.
		 * @param form
		 * @param formData
		 */
		public submitLogin(form:ng.IFormController, formData:CheckZipCodeOrLoginInterfaces.LoginUserModel):void {
			let isFormValid = this.checkZipCodeOrLoginService.isFormValid(form);

			if (isFormValid) {
				this.checkZipCodeOrLoginService.loginUser(formData);
			}
		}

		/**
		 * @author MKI
		 * @description opens a dialog with forgot password component
		 */
		 public forgotPassword():void {
			 this.checkZipCodeOrLoginService.forgotPassword();
		 }

		 public hasLoginFailed() {
		 	return this.states.Errors.Show;
		 }
	}

	class CheckZipCodeOrLoginComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = CheckZipCodeOrLoginController;
			this.template = HtmlTemplates.checkZipCodeOrLogin.template.html;
			this.bindings = {};
		}
	}

	angular.module(moduleId).component("checkZipCodeOrLogin", new CheckZipCodeOrLoginComponent());
}
