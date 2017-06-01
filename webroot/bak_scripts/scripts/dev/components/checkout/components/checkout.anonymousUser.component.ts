///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */
namespace CheckoutModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	class AnonymousUserController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public user: Object;
		public formData: CheckoutInterfaces.IAnonymousFormDataModel;
		public states: Object;

		public emailRegexPattern:any;
		public phoneRegexPattern:any;

		constructor(
			public basketService: BasketModule.BasketService,
			private checkoutService: CheckoutService,
			private checkoutAnonymousService: CheckoutAnonymousService,
			private regexApiService: UtilsModule.RegexApiService,
			private translationsService: TranslationsService,
			private $scope:ng.IScope,
			private $rootScope: ng.IRootScopeService,
			public settingsService: PageModule.SettingsService) {

			//TODO may be unused and should not be under anonymous
			this.user = checkoutService.user;
			this.states = checkoutService.getStates();

			this.translations = translationsService.translations;
			this.emailRegexPattern = regexApiService.API().email;
			this.phoneRegexPattern = regexApiService.API().phone;
		}

		$onInit() {
			this.formData = this.checkoutAnonymousService.formData();
			this._watchOnFormData();
			this._watchOnAlternativeAddress();
		}


		/**
		 * @author MKI
		 * @description Watch on alternative delivery address change
		 * TODO can be change to listen on $scope instead & set up onChange
		 * @private
		 */
		private _watchOnAlternativeAddress():void {
		 	this.$rootScope.$watch( () => {
		 		return this.formData.InvoiceAddressIsDeliveryAddress;
		 	}, (newValue, oldValue) => {

		 		if(newValue !== oldValue) {
					this.checkoutAnonymousService.setInvoiceAddressIsDeliveryAddress(newValue);
		 		}
		 	});
		 }


		/**
		 * @author MKI
		 * @description Setup Watch'er on "this.formData" and stores values in session storage
		 * @private
		 */
		  private _watchOnFormData() {
		 	this.$scope.$watch(() => {
		 		return this.formData;
		 	}, (value) => {
		 		this.checkoutAnonymousService.setFormDataToStorage(value);
				this.checkoutAnonymousService.updateFormData(value);
		 	}, true);
		 }


		/**
		 * @author MKI
		 * @description toggle Private, Public, and State memberType
		 * @param memberType
		 * @returns {boolean}
		 */
		 public showInformationFor(memberType:string){
		 	return this.formData.MemberType === memberType || this.formData.MemberType === null;
		 }


		 /**
		  * @author MKI
		  * @description User wants to change the DeliveryZone and opens dialog box
		  */
		 public changeDeliveryZone():void {
		 	this.checkoutService.changeDeliveryZone();
		 }


		 /**
		  * @author MKI
		  * @description Hides the delivery Section and scroll back to basket section
		  */
		  public goBackToBasket():void {
		 	this.checkoutService.showDeliveryInformation(false);
		 }


		/**
		 *
		 * @param form
		 * @param formData
		 */
		public submitAnonymousForm(form:ng.IFormController, formData):void {

			let formIsValid = this.checkoutService.isFormValid(form);
			let deliveryAddressIsBillingAddress = this.formData.InvoiceAddressIsDeliveryAddress;

			if (formIsValid) {
				if(deliveryAddressIsBillingAddress){
					angular.merge(formData.DeliveryAddress, formData.InvoiceAddress);
				}

				this.checkoutService.prepareSubmitForm({
					FormName:'anonymous',
					FormData:formData
				} as CheckoutInterfaces.PrepareSubmitDataModel);
			}
		 }

	}

	class AnonymousUserComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = AnonymousUserController;
			this.template = HtmlTemplates.checkout.anonymousUser.template.html;
		}
	}

	angular.module(moduleId).component("checkoutAnonymousUser", new AnonymousUserComponent());
}
