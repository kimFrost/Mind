///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 05-08-2016.
 */
namespace CheckoutModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	import ChangeAddressService = ChangeAddressModule.ChangeAddressService;

	export class FastTrackFormData {
		PaymentCard:string = null;
		CheckForOrdersToMerge:boolean = true;
		Notes: string;
	}

	class FastTrackController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public states:CheckoutInterfaces.StateModel;
		public user = {} as CheckoutInterfaces.UserModel;

		public formData = new FastTrackFormData();
		public showDriverMessage: boolean = true;

		constructor(
			private $rootScope: ng.IRootScopeService,
			private checkoutService: CheckoutService,
			private checkoutFastTrackService: CheckoutFastTrackService,
			private translationsService: TranslationsService,
			private changeAddressService: ChangeAddressService) {

			this.user = checkoutService.user;
			this.states = checkoutService.getStates();
			this.translations = translationsService.translations;
		}

		$onInit() {

			// Make sure that user is updated always when checkou service updates user object
			//Todo no need to watch here. do that in service and bind to it
			this.$rootScope.$watch(() => {
				return this.checkoutService.user;
			}, () => {
				this.user = this.checkoutService.user;
				this.updateFormData();
			}, true);
		}


		public toggleMessageArea () {
			this.showDriverMessage = !this.showDriverMessage;
		}


		/**
		 * @author TTH
		 * @description Update formdata with data from user data
		 * @param userData
		 * @private
		 */
		private updateFormData ():void {
			this.formData.Notes = this.checkoutService.user.MessageToDriver;
			if (this.formData.Notes !== '') {
				this.showDriverMessage = true;
			}
		}


		/**
		 * @author MKI
		 * @description Adding the card Information to formData
		 * @param cardInformation
		 * @private
		 * TODO missing Interface on "cardInformation"
		 */
		private _addPaymentCardInfo(cardInformation):void {
			if(!cardInformation){
				this.formData.PaymentCard = null;
			}else{
				this.formData.PaymentCard = cardInformation.CardId;
			}
		}


		/**
		 * @author MKI
		 * @description  User clicks change Address icon and the change address dialog kicks off
		 */
		public changeAddress() {
			this.changeAddressService.changeAddress();
		}


		/**
		 * @author MKI
		 * @description Callback from payment cards component, that use the default card or the newly selected card
		 * @param card
		 */
		public selectedCard(card): void {
			this._addPaymentCardInfo(card);
			this.checkoutService.updateSelectedPaymentCard(card);
		}


		/**
		 * @author MKI
		 * @description When user clicks "Betal" it validates the form and if no errors occur then proceed
		 * @param form
		 * @param formData
		 */
		public submitFastTrackForm(form:ng.IFormController, formData:CheckoutInterfaces.FormDataModel) {
			let validForm = this.checkoutService.isFormValid(form);

			if(validForm) {
				this.checkoutFastTrackService.submitForm(formData);
			}
		}


		/**
		 * @author MKI
		 * @description User want´s to pay with another payment card. If all required fields valid then proceed to payment
		 * @param form
		 * @param formData
		 */
		public payWithAnotherCard(form:ng.IFormController, formData:CheckoutInterfaces.FormDataModel) {

			const scrollToValidationError = false;

			let validForm = this.checkoutService.isFormValid(form, scrollToValidationError);

			if(validForm) {
				this.checkoutFastTrackService.payWithAnotherCard(formData);
			}
		}

	}

	class FastTrackComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = FastTrackController;
			this.template = HtmlTemplates.checkout.fastTrack.template.html;
		}
	}

	angular.module(moduleId).component("checkoutFastTrack", new FastTrackComponent());
}
