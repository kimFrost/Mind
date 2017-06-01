/**
 * Created by mikkel on 02/08/16.
 */

namespace UserModule {

	type DialogService = DialogModule.DialogService;
	type BasketService = BasketModule.BasketService;
	type TranslationsService = TranslationsModule.TranslationsService;

	export interface ICreateUserInvoiceAddress {
		FirstName: string;
		MiddleName: string;
		LastName: string;
		StreetName: string;
		HouseNumber: string;
		Floor: string;
		Side: string;
		HouseNumberLetter: string;
		Door: string;
		PostalCode: string;
		PostalDistrict: string;
		CompanyName: string;
		MobileNumber: string;
		PhoneNumber: string;
	}

	export interface ICreateUserDeliveryAddress {
		StreetName: string;
		HouseNumber: string;
		Floor: string;
		Side: string;
		HouseNumberLetter: string;
		Door: string;
		ContactPerson: string;
		PostalCode: string;
		PostalDistrict: string;
		CompanyName: string;
		MobileNumber: string;
		PhoneNumber: string;
	}

	export interface ICreateUserData {
		Password: string;
		ConfirmedPassword: string;
		LoginName: string;
		Email: string;
		MemberType: number;
		AddressesAreEqual: boolean;
		HasNewsLetterSubscription: boolean;
		HasNewsBySMSSubscription: boolean;
		HasNewsLetterWithOffersSubscription: boolean;
		HasNewsLetterWithMealplansSubscription: boolean;
		EAN: string;
		CVR: string;
		Notes: string;
		InvoiceAddress: ICreateUserInvoiceAddress;
		DeliveryAddress: ICreateUserDeliveryAddress;
	}

	class CreateUserInvoiceAddress implements ICreateUserInvoiceAddress {
		FirstName = '';
		MiddleName = '';
		LastName = '';
		StreetName = '';
		HouseNumber = '';
		Floor = '';
		Side = '';
		HouseNumberLetter = '';
		Door = '';
		PostalCode = '';
		PostalDistrict = '';
		CompanyName = '';
		MobileNumber = '';
		PhoneNumber = '';
		constructor() {}
	}

	class CreateUserDeliveryAddress implements ICreateUserDeliveryAddress {
		StreetName = '';
		HouseNumber = '';
		Floor = '';
		Side = '';
		HouseNumberLetter = '';
		Door = '';
		ContactPerson = '';
		PostalCode = '';
		PostalDistrict = '';
		CompanyName = '';
		MobileNumber = '';
		PhoneNumber = '';
		constructor() {}
	}

	class CreateUserData implements ICreateUserData {
		Password = '';
		ConfirmedPassword = '';
		LoginName = '';
		Email = '';
		MemberType = null; // Have to be null to force error if none selected
		AddressesAreEqual = true;
		HasNewsLetterSubscription = false;
		HasNewsBySMSSubscription = false;
		HasNewsLetterWithOffersSubscription = false;
		HasNewsLetterWithMealplansSubscription = false;
		EAN = '';
		CVR = '';
		Notes = '';
		InvoiceAddress = new CreateUserInvoiceAddress();
		DeliveryAddress = new CreateUserDeliveryAddress();
		constructor() {}
	}

	interface ICheckDelivery {
		deliveryZoneState: number;
		zipCode: number;
		city: string;
		streetName: string;
		houseNumber: number;
		accepted: boolean;
	}

	export class CreateUserService {

		public user: MemberViewModel = null;

		public states = {
			isLoggedIn: false
		};

		// Local delivery zone status
		public deliveryZoneStatus = TimeslotModule.DeliveryZoneStates.None;
		public validPostalDistrictName: string;
		
		private userData: ICreateUserData;

		public checkDeliveryObj = {} as ICheckDelivery;

		constructor(private dialogService:DialogService,
					private basketService:BasketService,
					private translationsService:TranslationsService,
					private trackingService: TrackingModule.TrackingService,
					private $http:ng.IHttpService,
					private $location, 
					private $timeout,
					private settingsService: PageModule.SettingsService,
					private $q:ng.IQService) {

		}

		private _getFormData() {
			if (!this.userData) {
				this.resetFormData();
			}
			return this.userData;
		}

		public resetFormData = (form = null) => {
			this.userData = new CreateUserData();
			// Set pristine if form is sent as optional parameter
			if (form && form.$setPristine) {
				form.$setPristine();
			}
		};

		public getFormData = () => {
			return this._getFormData();
		};
	

		/**
		 * @author TTH
		 * @description Update the invoice address on user data object
		 * @param addressData
		 * @extends this.userDataInvoiceAddress object
		 */
		public updateUserDataInvoiceAddress(addressData) {
			if (!this.userData) {
				this.resetFormData();
			}
			angular.extend(this.userData.InvoiceAddress, addressData);
		}

		/**
		 * @author KFN
		 * @description Update the delivery address on user data object
		 * @param addressData
		 * @extends this.userDataDeliveryAddress object
		 */
		public updateUserDataDeliveryAddress(addressData) {
			if (!this.userData) {
				this.resetFormData();
			}
			angular.extend(this.userData.DeliveryAddress, addressData);
		}

		public updateCreateUserFormData(addressData) {

			if (!this.userData) {
				this.resetFormData();
			}
			if (this.userData.AddressesAreEqual) {
				this.updateUserDataInvoiceAddress(addressData);
			}
			else {
				this.updateUserDataDeliveryAddress(addressData);
			}
		}


		public showFeedback = (headline:string, msg:string, redirectToHomePage:boolean=false) => {
			this._showModal(headline, `<div class="testDialogMessageOnProfilePage">${msg}</div>`, redirectToHomePage);
		};


		private _showModal(header:string, body:string, redirectToHomePage:boolean=false):ng.IPromise<any> {

			var defer = this.$q.defer();

			let dialogObj = {
					header: header,
					content: body,
					close: true,
					size: 'medium',
				} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((index) => {
				defer.resolve(index);

				if(redirectToHomePage) {
					var redirectUrl = "/";
					this.$timeout(() => {
						this.$location.url(redirectUrl);
					});
				}
			});

			return defer.promise;
		}

		public createUser = (payload):ng.IPromise<any> => {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/CreateUser";
			settings.method = "POST";
			settings.data = payload;

			this.$http(settings).then((response) => {
				this.trackingService.trackCustomPageView('/create-user/success');
				defer.resolve(response.data);
			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject(error.data);
			});

			return defer.promise;
		};

		public activeUser = (payload):ng.IPromise<any> => {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/ActivateUser";
			settings.method = "POST";
			settings.data = payload;

			this.$http(settings).then((response) => {
				defer.resolve(response.data);
			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject(error.data);
			});

			return defer.promise;
		};

		public updateUser = (payload):ng.IPromise<any> => {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/UpdateUser";
			settings.method = "POST";
			settings.data = payload;

			this.$http(settings).then((response) => {
				this.basketService.get(); // Trigger basket update
				defer.resolve(response.data);
			}).catch((error) => {
				console.log("ERROR: ", error);

				defer.reject(error.data);
			});

			return defer.promise;
		};


		/**
		 * @author TTH
		 * @description Add Post Code. Handle API posting and validation locally and detached from timeslot
		 * @param zipCode
		 * @param initiateFlow
		 */
		public addPostCode(zipCode: number, initiateFlow: boolean = true): ng.IPromise<boolean> {
			let defer = this.$q.defer();

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/' + 'CheckPostCode',
				data: zipCode
			}).then((response) => {
				var result: any = response.data;

				this.validPostalDistrictName = result.PostalDistrictName;

				// Full delivery
				if (result.IsFullDeliverable) {
					this.deliveryZoneStatus = TimeslotModule.DeliveryZoneStates.Full;
				}

				// Partial delivery
				else if (result.IsPartlyDeliverable) {
					this.deliveryZoneStatus = TimeslotModule.DeliveryZoneStates.Partial;
				}

				// No delivery
				else {
					this.deliveryZoneStatus = TimeslotModule.DeliveryZoneStates.NotAvailable;
				}

				defer.resolve(result);

			}, (response) => {
				console.error("ERROR addPostCode: ", response);

				defer.reject(response);
			});
			return defer.promise;
		}


		/**
		 * @author TTH
		 * @description Check street address and number
		 */
		public checkDeliveryAddress(deliveryZone): ng.IPromise<boolean> {
			let defer = this.$q.defer();

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/CheckDeliveryAddress',
				data: deliveryZone
			}).then((response) => {
				defer.resolve(response.data);
			}).catch((response) => {
				console.error("ERROR addDeliveryAddress: ", response);
				defer.reject(response.data);
			});
			return defer.promise;
		}


		/**
		 * @author TTH
		 * @description Add street address and number
		 */
		public addDeliveryAddress(deliveryZone): ng.IPromise<any> {
			let defer = this.$q.defer();

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/AddDeliveryAddress',
				data: deliveryZone
			}).then((response) => {
				defer.resolve(response);
			}).catch((response) => {
				console.error("ERROR addDeliveryAddress: ", response);
				defer.reject(response);
			});
			return defer.promise;

		}

	}

	angular.module(moduleId).service("createUserService", CreateUserService);

}
