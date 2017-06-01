///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 05-08-2016.
 */
namespace CheckoutModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	class TermsAndAgreementsController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public showCheckBox: boolean;
		public acceptTermsAndAgreement: boolean;

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private dialogService: DialogModule.DialogService,
			private translationsService: TranslationsService) {
			this.translations = translationsService.translations;
		}


		private getTermsAndAgreements(){
			let defer = this.$q.defer();

			this.$http({
					method: 'GET',
					url: '/webapi/checkout/' + 'GetTermsAndAgreements'}
					).then((response)=> {
				defer.resolve(response.data);
			}, (error) => {
				console.log("ERROR: ", error);
				defer.reject('Could Not load Terms of agreements');
			});
			return defer.promise;
		}

		private openDialogWithContent(content) {
			const defaultDialogSettings = {
				header: this.translations.Checkout.TermsAndAgreements.TermsAndConditionAndPrivacyPolitics,
				content: `<div> ${content} </div>`,
				close: true,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.Checkout.Dialog.Close,
						confirm: false,
						callback: false
					}
				}
			} as DialogModule.IDialogSettings;

			if(this.showCheckBox){
				let extendedSettings = {
					button2: {
						text: this.translationsService.translations.Checkout.Dialog.Accept,
						confirm: true,
						callback: true
					}
				};

				angular.extend(defaultDialogSettings.buttons, extendedSettings);
			}

			this.dialogService.openDialog(defaultDialogSettings).then((response)=>{
				if (response === 2) {
					this.acceptTermsAndAgreement = true;
					this.dialogService.closeDialog();
				}
			});
		}

		public showTermsOfAgreement(e) {
			e.preventDefault();
			this.getTermsAndAgreements().then((response)=>{
				this.openDialogWithContent(response);
			}).catch((errorMessage)=>{
				console.log(errorMessage);
			});
		}
	}

	class TermsAndAgreementsComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = TermsAndAgreementsController;
			this.template = HtmlTemplates.checkout.agreementTermsAndConditions.template.html;
			this.bindings = {
				showCheckBox: '<',
				acceptTermsAndAgreement: '='
			};
		}
	}

	angular.module(moduleId).component("termsAndAgreements", new TermsAndAgreementsComponent());
}
