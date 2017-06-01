///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 08-09-2016.
 */
namespace ChangeAddressModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	class ChangeAddressController {
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public formData:Object = {};
		public states:Object = {};
		public showZipVal:boolean = true;

		public disabled:boolean = true;

		public zipCodeInputField;
		public nameCompanyInputField;

		private zipcodeFieldSelector: string = 'change-address__zipcode-input';
		private nameFieldSelector: string = 'change-address__name-input';

		constructor(
			private $element,
			private $rootScope: ng.IRootScopeService,
			private $timeout: ng.ITimeoutService,
			private changeAddressService: ChangeAddressService,
			private translationsService: TranslationsService) {
			this.translations = translationsService.translations;
		}

		$onInit() {
			this.changeAddressService.clearStates();
			this.changeAddressService.initChangeAddress();

			this.states = this.changeAddressService.getStates();
			this.formData = this.changeAddressService.formData;
		}

		$postLink() {
			this.setFieldFocus(this.zipcodeFieldSelector);

			// If step 2 is initialized, set focus to first input field in partial
			this.$rootScope.$on('CHANGE-ADDRESS_step-2', () => {
				this.setFieldFocus(this.nameFieldSelector);
			});
		}


		// Set focus to input field
		/**
		 * @author TTH
		 * @param {any} elementIdentifier: HMTL class name
		 */
		public setFieldFocus (elementClassName) {
			this.$timeout(() => {
				this.$element[0].getElementsByClassName(elementClassName)[0].focus();
			});
		}


		/**
		 * @author MKI
		 * @description Call service that closing the dialog box and reset states
		 */
		public closeDialog():void {
			// Close dialog
			this.changeAddressService.closeChangeAddress();
			this.changeAddressService.clearStates();
		}


		/**
		 * @author MKI / TTH
		 * @description If the form is valid then check zip code for delivery
		 * @param form
		 * @param zipCode
		 */
		public submitLookupZipCode(form:ng.IFormController, zipCode:number):void {

			let isFormValid = this.changeAddressService.isFormValid(form, false);
			this.showZipVal = !isFormValid;

			if (isFormValid) {
				this.changeAddressService.checkZipCodeForDelivery(zipCode);
			}

		}


		/**
		 * @author MKI
		 * @description If the form is valid then prepare to submitForm
		 * @param form
		 * @param formData
		 */
		public submitChangeAddress(form:ng.IFormController, formData):void {

			let isFormValid = this.changeAddressService.isFormValid(form, false);

			if (isFormValid) {
				this.changeAddressService.prepareSubmitForm(formData);
			}
		}
	}

	class ChangeAddressComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = ChangeAddressController;
			this.template = HtmlTemplates.changeAddress.template.html;
		}
	}

	angular.module(moduleId).component("changeAddress", new ChangeAddressComponent());
}
