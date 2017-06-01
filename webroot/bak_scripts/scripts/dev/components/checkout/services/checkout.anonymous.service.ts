///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 10/10/2016.
 */

namespace CheckoutModule {

	const STORAGE_NAME = 'checkoutData';

	export class AnonymousFormData {
		InvoiceAddress = {PostalCode:"", PostalDistrict:"",StreetName:"",HouseNumber:""};
		DeliveryAddress = {PostalCode:"", PostalDistrict:"",StreetName:"",HouseNumber:""};
		InvoiceAddressIsDeliveryAddress = true;
		MemberType = 'Private';

		constructor(){}
	}

	export class CheckoutAnonymousService {

		private anonymousCheckoutFormData = {} as CheckoutInterfaces.IAnonymousFormDataModel;

		constructor(
			private $rootScope: ng.IRootScopeService,
			private basketService: BasketModule.BasketService,
			private storageService: UtilsModule.StorageService,
			private testConditionService: UtilsModule.TestConditionService){

			this._initializeAnonymousFormData();
			this._watchOnTimeSlot();
		}

		/**
		 * @author MKI
		 * @description Initialize the Form data
		 * @private
		 */
		private _initializeAnonymousFormData() {

			let storedFormData = this._getDataFromStorage();
			let hasStoredData = this.testConditionService.test.isDefined(storedFormData);

			if (hasStoredData){
				this._updateFormData(storedFormData);
			} 
			else {
				this._updateFormData(new AnonymousFormData()); 
				let deliveryAddress =  this.basketService.basket.DeliveryAddress;
				if (deliveryAddress) {
					this.setPostalCodeAndDistrict(deliveryAddress);
				}
			}
		}

		/**
		 * @author MKI
		 * @description Watch for changes on time slot
		 * @private
		 */
		private _watchOnTimeSlot() {
			this.$rootScope.$on('deliveryZone_UPDATED', (event, args) => {
				this.setPostalCodeAndDistrict(args);
			});
		}

		/**
		 * @author MKI
		 * @description
		 * @param deliveryAddress
		 */
		private setPostalCodeAndDistrict(deliveryAddress){

			if (!deliveryAddress.PostalDistrict) {
				deliveryAddress.PostalDistrict = deliveryAddress.City;
			}

			const invoiceAddressIsDeliveryAddress = this.anonymousCheckoutFormData.InvoiceAddressIsDeliveryAddress;
			const {PostalCode, PostalDistrict, StreetName, HouseNumber} = deliveryAddress;

			if (invoiceAddressIsDeliveryAddress){
				this._updateAddress({ PostalCode, PostalDistrict, StreetName, HouseNumber}, 'invoice');
			}
			else {
				this._updateAddress({ PostalCode, PostalDistrict, StreetName, HouseNumber}, 'delivery');
			}
		}


		/**
		 * @author MKI
		 * @description Update The Address information on either invoice or delivery address
		 * @param addressInformation
		 * @param invoiceOrDelivery
		 * @private
		 */
		private _updateAddress(addressInformation: Object = {}, invoiceOrDelivery:string = 'invoice' ){

			let address;

			if (invoiceOrDelivery === 'invoice') {
				address = this.anonymousCheckoutFormData.InvoiceAddress;
			}
			else {
				address = this.anonymousCheckoutFormData.DeliveryAddress;
			}

			angular.merge(address, addressInformation);
		}


		/**
		 * @author MKI
		 * @description Toggle for Invoice & Delivery
		 * @param invoiceIsSameAsDelivery
		 */
		public setInvoiceAddressIsDeliveryAddress(invoiceIsSameAsDelivery: boolean = true){

			const { PostalCode, PostalDistrict, StreetName, HouseNumber} = this.basketService.basket.DeliveryAddress;

			if (invoiceIsSameAsDelivery){
				this._updateAddress({ PostalCode, PostalDistrict, StreetName, HouseNumber}, 'invoice');
			} 
			else {
				this._updateAddress({ PostalCode, PostalDistrict, StreetName, HouseNumber}, 'delivery');
			}
		}


		/**
		 * @author MKI
		 * @description Update the anonymous form data
		 * @param newData
		 * @private
		 */
		private _updateFormData(newData) {
			angular.extend(this.anonymousCheckoutFormData, newData);
		}

		/**
		 * @author MKI
		 * @description Get stored Form data from session storage
		 * @returns {any}
		 * @private
		 */
		private _getDataFromStorage() {
			return this.storageService.get(STORAGE_NAME);
		}

		/**
		 * @author MKI
		 * @description Set the form data to be stored in Session storage
		 * @param formData
		 */
		public setFormDataToStorage(formData):void {
			this.storageService.set(STORAGE_NAME, formData);
		}

		/**
		 * @author MKI
		 * @description return the AnonymousForm Data
		 * @returns {CheckoutInterfaces.IAnonymousFormDataModel}
		 */
		public formData() {
			return this.anonymousCheckoutFormData;
		}

		/**
		 * @author MKI
		 * @description New up a clean form data
		 */
		public clearFormData(): void {
			this.anonymousCheckoutFormData = new AnonymousFormData();
		}

		/**
		 * @author MKI
		 * @description Update the form data
		 * @param data
		 */
		public updateFormData(data):void {
			if(!data){return;}

			this._updateFormData(data);
		}
}

angular.module(moduleId).service("checkoutAnonymousService", CheckoutAnonymousService);
}
