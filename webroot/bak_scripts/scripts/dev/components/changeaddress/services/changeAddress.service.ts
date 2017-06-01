///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 02-09-2016.
 */
namespace ChangeAddressModule {
	type TranslationsService = TranslationsModule.TranslationsService;
	type TimeslotService = TimeslotModule.TimeslotService;
	type TimeslotStateService = TimeslotModule.TimeslotStateService;
	type ValidateFormService = UtilsModule.ValidateFormService;

	export class FormData {
		CompanyName:string = '';
		StreetName:string = '';
		HouseNumber:number = null;

		Floor:string = '';
		Side:string = '';
		Door:string = '';
		HouseNumberLetter:string = '';

		PostalCode:number = 0;
		PostalDistrict:string = '';
		MakeThisDefaultAddress:boolean = false;

		constructor(){}
	}

	export class ChangeAddressStates {
		HideChangeDeliveryAddressFields:boolean = true;
		ShowErrorMessage:boolean = false;
		ShowErrorMessageForUpdate:boolean = false;
		IsPending:boolean = false;

		constructor(){}
	}


	export class ChangeAddressService {

		private defaultFormData = new FormData();
		public formData = new FormData();

		private defaultState = new ChangeAddressStates();
		private state = new ChangeAddressStates();

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		constructor(
			private $q:ng.IQService,
			private $rootScope: ng.IRootScopeService,
			private changeAddressHTTPService: ChangeAddressHTTPService,
			private dialogService: DialogModule.DialogService,
			private timeslotStateService: TimeslotStateService,
			private timeslotService: TimeslotService,
			private translationsService: TranslationsService,
			private validateFormService: ValidateFormService) {
				this.translations = translationsService.translations;
			} 


		/**
		 * @author MKI
		 * @description Set state if Address Delivery Field area should be visible
		 * @param value
		 * @private
		 */
		private _setStateHideDeliveryAddressFields(value:boolean = true):void {
			this._states().set({
				HideChangeDeliveryAddressFields: value
			});

			// If showing the change address form, set focus to name field
			if (!this.state.HideChangeDeliveryAddressFields) {
				this.$rootScope.$broadcast('CHANGE-ADDRESS_step-2');
			}
		}

		/**
		 * @author MKI
		 * @description addToPostCode fails and informs user
		 * @private
		 */
		private _addPostCodeFailed = () => {
			this._zipCodeIsNotValidForDelivery();
		};


		/**
		 * @author MKI
		 * @description If nemlig.com delivers to Postal code then show Delivery address fields
		 * @private
		 */
		private _addPostCodeSuccess = (data) => {

			let PostalCode = data.zipCode;
			let PostalDistrict = data.city;

			// If delivery to postal code then show change address fields
			this._setStateHideDeliveryAddressFields(false);

			// Remove Loader
			this._setPendingState(false);

			// Set and update the zip code and postal district on the formData object
			this._setPostalCodeAndDistrictOnFormData({ PostalCode, PostalDistrict });

		};


		/**
		 * @author MKI
		 * @description Checking if Nemlig.com delivers to particular Postal code
		 * @param zipCode
		 * @private
		 */
		private _addPostCodeToTimeSlotService(zipCode:number):void {

			this.timeslotService.checkPostCode(zipCode)
				.then(this._addPostCodeSuccess)
				.catch(this._addPostCodeFailed);
		}


		/**
		 * @author MKI
		 * @description Change the delivery address in timeslot or set the default address on User
		 * @param deliveryInformation
		 * @returns {IPromise<T>}
		 * @private
		 */
		//private _changeAddressOrMakeDefault = (deliveryInformation) => {
		//	let defer = this.$q.defer();
		//	let makeAddressDefault = deliveryInformation.MakeThisDefaultAddress;

		//	if (makeAddressDefault) {
		//		this.changeAddressHTTPService.ChangeDeliveryAddress(deliveryInformation)
		//			.then(() => {
		//				defer.resolve();
		//			})
		//			.catch((err)=>{
		//				defer.reject(err);
		//			});
		//	} else {
		//		defer.resolve();
		//	}
		//	this.timeslotService.resetDeliveryZoneAndTimeslot(TimeslotModule.DeliveryZoneStates.Full);
		//	this.timeslotService.openTimeslotSelector();

		//	return defer.promise;
		//};

		/**
		 * @author MKI
		 * @description reset states and close the change address dialog
		 * @private
		 */
		private _closeChangeAddressDialog = () => {
			// Reset device flow
			this.timeslotStateService.setDeviceFlowState(1);
			this.timeslotStateService.setDeviceFlowLoaderState(1);
			
			// Close dialog
			this.dialogService.closeDialog();
		};

		/**
		 * @author MKI
		 * @description
		 * @param addressInformation
		 * @private
		 */
		private _addDeliveryInformationToTimeSlot(addressInformation) {

			this.timeslotService.addDeliveryAddress(addressInformation)
				.then(() => {
					// Make sure user has to choose a new timeslot to the new address
					this.timeslotService.resetActiveTimeslot();
					this.timeslotService.openTimeslotSelector();
					this._closeChangeAddressDialog();
				})
				.catch((err) => {
					let errorMessage = this.translations.Checkout.ChangeAddress.ChangeAddressCouldtNotUpdateErrorText;
					this._displayErrorMessage(`${errorMessage} ${err}`);
				});
		}



		/**
		 * @author MKI
		 * @description Display´s error message to user if Zip code is not valid for delivery
		 * @param message
		 * @private
		 */
		private _displayErrorMessage(message:string):void {

			this._states().set({
				ShowErrorMessageForUpdate: true,
				ErrorMessage: message
			});
		}

		/**
		 * @author MKI
		 * @description Initiate For and reset all states
		 * @private
		 */
		private _initializeChangeAddress():void {
			this._resetFormDataAndStates();
		}


		/**
		 * @author MKI
		 * @description  Opens a dialog modal with the <change-address> Component
		 * @private
		 */
		private _openDialog():void {

			const defaultDialogSettings = {
				header:  this.translations.Checkout.ChangeAddress.ChangeAddressDialogHeading,
				content: `<change-address></change-address>`,
				close: true,
				size: 'small'
			};

			this.dialogService.openDialog(defaultDialogSettings);
		}


		/**
		 * @author MKI
		 * @description Reset form states and form data
		 * @private
		 */
		private _resetFormDataAndStates():void {
			angular.merge(this.formData, this.defaultFormData);
			angular.merge(this.state, this.defaultState);
		}



		/**
		 * @author MKI
		 * @description Update formData with PostalCode & PostalDistrict
		 * @param postalInformation
		 * @private
		 */
		private _setPostalCodeAndDistrictOnFormData(postalInformation):void {

			let information = {
				PostalDistrict: postalInformation.PostalDistrict,
				PostalCode: postalInformation.PostalCode
			};	

			angular.merge(this.formData, information);
		}


		/**
		 * @author MKI
		 * @description Set pending State
		 * @param value
		 * @private
		 */
		private _setPendingState(value:Boolean){
			this._states().set({
				IsPending: value
			});
		}


		/**
		 * @author MKI
		 * @description Getting and setting states
		 * @returns {{get: (()=>ChangeAddressInterfaces.IStateModel), clear: (()=>ChangeAddressInterfaces.IStateModel), set: ((stateProperties:any)=>undefined)}}
		 * @private
		 */
		private _states(){
			return {
				get: () => {
					return this.state;
				},

				clear: () => {

					let defaultStates = new ChangeAddressStates();
					this._states().set(defaultStates);

					return this._states().get();
				},

				set: (stateProperties) =>{
					let newProperties: Object = {};

					for (let prop in stateProperties) {

						let statePropertyName = prop;
						let statePropertyKey = stateProperties[statePropertyName];

						newProperties[statePropertyName] = statePropertyKey;
					}
					angular.merge(this.state, newProperties);
				}
			};
		};

		/**
		 * @author MKI
		 * @description ZipCode is not valid for delivery cancel loader and show error message
		 * @private
		 */
		private _zipCodeIsNotValidForDelivery() {
			this._setPendingState(false);
			this._states().set({
				ShowErrorMessage: true
			});
		}


		//////////////////////////////////// PUBLIC //////////////////////////////////////////


		/**
		 * @author MKI
		 * @description Kick Off the change address dialog
		 */
		public changeAddress():void {
			this._openDialog();
		}


		/**
		 * @author MKI
		 * @description When user clicks "Tjek Postnummer" then validate ZipCode. If success then show new input fields or error message
		 * @param zipCode
		 */
		public checkZipCodeForDelivery(zipCode):void{

			this._states().clear();
			this._setPendingState(true);
			this._addPostCodeToTimeSlotService(parseInt(zipCode));
		}


		/**
		 * @author MKI
		 * @description Close & Cancel the changeAddress
		 */
		public closeChangeAddress():void {
			this._closeChangeAddressDialog();
		}


		/**
		 * @author MKI
		 * @description Clear all state
		 * @returns {ChangeAddressModule.ChangeAddressStates}
		 */
		public clearStates() {
			return this._states().clear();
		}


		/**
		 * @author MKI
		 * @description Init Service that makes sure all states are ready and set
		 */
		public initChangeAddress():void {
			this._initializeChangeAddress();
		}


		/**
		 * @author MKI
		 * @description Returns the states object the the view or component can use
		 * @returns {ChangeAddressModule.ChangeAddressStates}
		 */
		public getStates() {
			return this._states().get();
		};



		/**
		 * @author MKI / TTH
		 * @description extend form data with default FormData and add data to time slot
		 * @param formData
		 */
		//TODO refac to new name. ChangeToNewAddress
		public prepareSubmitForm(formData:ChangeAddressInterfaces.IFormDataModel):void {

			let defaultFormData = new FormData();
			let data = angular.extend({}, defaultFormData, formData);

			this._addDeliveryInformationToTimeSlot(data);
		}

		/**
		 * @author MKI
		 * @description Validates the form and return condition if the form validates
		 * @param form
		 * @param scrollToError
		 * @returns {boolean}
		 */
		public isFormValid(form:ng.IFormController, scrollToError:boolean = true):boolean {
			return this.validateFormService.validateForm(form, scrollToError);
		}

	}

	angular.module(moduleId).service("changeAddressService", ChangeAddressService);
}
