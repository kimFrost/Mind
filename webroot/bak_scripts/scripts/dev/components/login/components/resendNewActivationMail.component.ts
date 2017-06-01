///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 05/12/2016.
 */

namespace UserModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	export class ResendNewActivationStates{
		showStatusMessage:boolean = false;
		statusMessage:string = '';
		constructor(){}
	}

	class ResendActivationMailController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public text:string;
		public link:string;
		public viewStates;

		constructor(
			private loginHTTPService: LoginHTTPService,
			private translationsService: TranslationsService) {

			this.translations = translationsService.translations;
			this.viewStates = new ResendNewActivationStates();
		}

		$onDestroy(){
			this._resetViewStates();
		}

		/**
		 * @author MKI
		 * @description Showing or hiding status message
		 * @param emailIsResend
		 * @private
		 */
		private _showStatusMessage = (emailIsResend:boolean = false) => {

			this.viewStates.showStatusMessage = true;

			const RESEND_SUCCESS_MESSAGE = this.translations.Authentication.Login.UserNotActivatedStatusEmailResendOk;
			const RESEND_FAILED_MESSAGE = this.translations.Authentication.Login.UserNotActivatedStatusEmailResendFailed;

			let message = emailIsResend ? RESEND_SUCCESS_MESSAGE : RESEND_FAILED_MESSAGE;
			this._setStateStatusMessage(message);
		};


		/**
		 * @author MKI
		 * @description Set view state if activation email is successful resend
		 * @param message
		 * @private
		 */
		private _setStateStatusMessage(message:string = ''):void {
			this.viewStates.statusMessage = message;
		}


		/**
		 * @author MKI
		 * @description Resetting View states
		 * @private
		 */
		private _resetViewStates(){
			angular.merge(this.viewStates, new ResendNewActivationStates());
		}

		/**
		 * @author MKI
		 * @description Send activationId to HTTP service
		 * @param activationId
		 * @param event
		 */
		public clickActivationLink(activationId:string = '', event) {
			event.preventDefault();
			this.loginHTTPService.resendActivationEmail(activationId)
				.then(this._showStatusMessage)
				.catch(() => {
					this._showStatusMessage(false);
				});
		}
	}

	class ResendActivationMailComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = ResendActivationMailController;
			this.template = HtmlTemplates.resendActivationMail.template.html;
			this.bindings = {
				text: "@",
				link: "@"
			};
		}
	}

	angular.module(moduleId).component("resendActivationMail", new ResendActivationMailComponent());
}
