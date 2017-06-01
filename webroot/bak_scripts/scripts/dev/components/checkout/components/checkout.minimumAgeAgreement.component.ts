///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 05-08-2016.
 */
namespace CheckoutModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	const LOWEST_DANISH_MINIMUM_AGE = 15;
	const CHECKOUT_WEB_PATH = '/webapi/checkout/';

	class MinimumAgeAgreementController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public acceptMinimumAge: boolean;
		private minimumAgeIs: number;
		private minimumAge: number;

		constructor(
			private $scope,
			private $log:ng.ILogService,
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private dialogService: DialogModule.DialogService,
			private translationsService: TranslationsService) {

			this.translations = translationsService.translations;
			this.minimumAge = this.minimumAgeIs || LOWEST_DANISH_MINIMUM_AGE;
		}


		$onInit(){
			this._watchOnMinimumAge();
		}

		//TODO this can be refactored to avoid Watch
		// Watch on property binding "minimumAgeIs" and setting minimumAge
		private _watchOnMinimumAge():void {
			this.$scope.$watch(() => {
				return this.minimumAgeIs;
			}, (val) => {
				this.minimumAge = val;
			}, true);
		}

		// Makes a HTTP request to the server and get´s the minimum age information
		private getMinimumAgeInformation(){
			let defer = this.$q.defer();

			this.$http({
					method: 'GET',
					url: CHECKOUT_WEB_PATH + 'GetAgeRestrictions'}
					).then((response)=> {
				defer.resolve(response.data);
			}, (error) => {
				this.$log.log(error);
				defer.reject();
			});
			return defer.promise;
		}

		// Opens a dialog box and show´s the 'Content'
		private openDialogWithContent(content):void {
			const defaultDialogSettings = {
				header: `${this.translationsService.translations.Checkout.Dialog.AgeRequirement} ${this.minimumAge} ${this.translationsService.translations.Checkout.Dialog.Age}`,
				content: `<div> ${content} </div>`,
				close: true,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.Checkout.Dialog.Close,
						confirm: false,
						callback: false
					},
					button2: {
						text: `${this.translationsService.translations.Checkout.Dialog.AgeRequirementAccept} ${this.minimumAge} ${this.translationsService.translations.Checkout.Dialog.Age}`,
						confirm: true,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(defaultDialogSettings).then((response)=>{
				if (response === 2) {
					this.acceptMinimumAge = true;
					this.dialogService.closeDialog();
				}
			});
		}

		// Display a error dialog to user if the http request to get minimum age information
		private _errorLoadingMinimumAge():void{

			const defaultDialogSettings = {
				header: `${this.translations.Checkout.CheckoutTechnicalErrors.TechnicalErrorHeadline}`,
				content: `<div> ${this.translations.Checkout.Agreements.MinimumAge.MininimumAgeFailedLoadingContent}</div>`,
				close: true,
				size: 'medium'
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(defaultDialogSettings);
		}

		// Fetch the minimumAge information from the server and when loaded, then display it in a dialog
		public showMinimumAgeInformation(evn) {
			evn.preventDefault();
			this.getMinimumAgeInformation().then((response)=>{
				this.openDialogWithContent(response);
			}).catch(()=>{
				this._errorLoadingMinimumAge();
			});
		}
	}

	class MinimumAgeAgreementsComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = MinimumAgeAgreementController;
			this.template = HtmlTemplates.checkout.agreementMinimumAge.template.html;
			this.bindings = {
				acceptMinimumAge: '=',
				minimumAgeIs: '<'
			};
		}
	}

	angular.module(moduleId).component("minimumAgeAgreements", new MinimumAgeAgreementsComponent());
}
