///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type Translations = SCommerce.Core.Dictionary.Translations;
	type TimeslotService = TimeslotModule.TimeslotService;
	type TimeslotDialogService = TimeslotModule.TimeslotDialogService;
	type TimeslotStateService = TimeslotModule.TimeslotStateService;
	type AddressLocationService = AddressLocationModule.AddressLocationService;
	type DialogService = DialogModule.DialogService;
	type ValidateFormService = UtilsModule.ValidateFormService;

	import DeliveryZoneStates = TimeslotModule.DeliveryZoneStates;

	// Local Delivery Zone. 
	// Contains only the properties needed for the validation of postalcode process
	export interface IUserDeliveryAddress {
		StreetName: string;
		HouseNumber: string;
		PostalCode: number;
		PostalDistrict: string;
	};

	class CreateUserController {

		public formData: any = {};
		public feedbackMsg: string;
		public editMode: boolean;
		public emailRegexPattern: any;
		public phoneRegexPattern: any;
		public lockedMode: boolean;
		public options: Object;
		public translations: Translations = {} as Translations;
		public user: any;
		public zipcodeUpdateTimer = null;

		// Variables for the Check Address forms
		public deliveryZoneState = TimeslotModule.DeliveryZoneStates.NotAvailable;
		public showPartialFlow: boolean = false;
		public showStreetAddressError: boolean = false;
		public checkDeliveryAddressFormData: IUserDeliveryAddress;


		public states = {
			lockFields: false,
			checkingZipcode: false,
			validCheckedZipcode: false,
			fetchingStreetNames: false,
			updatingForm: false,
			validPostalCode: false,
			creatingUser: false,
			showFeedbackMsg: false,
			bAllowTimeslotUpdateZipcode: true
		};


		constructor(private $element,
			private $q: ng.IQService,
			private $http: ng.IHttpService,
			private $scope: ng.IScope,
			private $location: ng.ILocationService,
			private $timeout: ng.ITimeoutService,
			private addressLocationService: AddressLocationService,
			private dialogService: DialogService,
			private createUserService: CreateUserService,
			private translationsService: TranslationsModule.TranslationsService,
			private basketService: BasketModule.BasketService,
			private userService: UserService,
			private regexApiService: UtilsModule.RegexApiService,
			private settingsService: PageModule.SettingsService,
			private timeslotService: TimeslotService,
			private timeslotStateService: TimeslotStateService,
			private timeslotDialogService: TimeslotDialogService,
			private validateFormService: ValidateFormService,
			private xamarinService: XamarinModule.XamarinService) {

			this.emailRegexPattern = regexApiService.API().email;
			this.phoneRegexPattern = regexApiService.API().phone;
			this.formData = createUserService.getFormData();
			this.options = addressLocationService.get();
			this.translations = translationsService.translations;
		}

		$onInit() {
			if (this.editMode || this.lockedMode) {
				this.states.bAllowTimeslotUpdateZipcode = false; // Disallow zipcode update if in lockmode or editmode. Will be handled in changeDeliveryZone
				if (this.user) {
					angular.merge(this.formData, this.user);
				}
			}
			this._watchOnDeliveryZoneChange();
			if (this.lockedMode) {
				this.states.lockFields = true;
			}
			this._watchOnAddressesAreEqual();

		}

		$onDestroy() {
			// Clear fields
			this.clearFields();
		}

		private _watchOnAddressesAreEqual() {
			this.$scope.$watch(() => {
				return this.formData && this.formData.AddressesAreEqual;
			}, () => {
				if (this.formData) {
					if (this.formData.AddressesAreEqual) {
						if (this.editMode) {
							this.checkPostalCode(this.formData.InvoiceAddress.PostalCode, true);
						}
						else {
							if (this.timeslotService.deliveryZoneAccepted && this.timeslotService.deliveryZone) {
								this.checkPostalCode(this.timeslotService.deliveryZone.PostalCode, true);
							}
						}
					}
					else {
						if (!this.editMode) {
							this.checkPostalCode(this.timeslotService.deliveryZone.PostalCode, true);
						}
					}
				}
			});
		}

		// Watch for TSP delivery PostalCode change
		private _watchOnDeliveryZoneChange() {
			this.$scope.$on('deliveryZone_UPDATED', (event, deliveryZone) => {

				// Timeout is required to allow bAllowTimeslotUpdateZipcode to be updated if
				this.$timeout(() => {
					if (this.states.bAllowTimeslotUpdateZipcode) {
						if (deliveryZone && deliveryZone.PostalCode > 0) {
							this.checkPostalCode(deliveryZone.PostalCode, true);
						}
					}
				}, 500);

			});
		}

		public disableGuard = (fieldSelector, fieldObj) => {
			fieldObj.$setTouched();

			const el = angular.element(document.querySelector(fieldSelector))[0];
			if (el) {
				setTimeout(() => {
					el.focus();
				}, 0);
			}
		};

		public clearFields(form = null) {
			this.formData = this.createUserService.resetFormData(form);
		}

		public hasNewsLetterSubscriptionChange(value) {
			if (!value) {
				this.formData.HasNewsLetterWithOffersSubscription = false;
				this.formData.HasNewsLetterWithMealplansSubscription = false;
			}
			else {
				this.formData.HasNewsLetterWithOffersSubscription = true;
				this.formData.HasNewsLetterWithMealplansSubscription = false;
			}
		}

		public changeDeliveryZone(): void {
			this.timeslotDialogService.initCheckAddress(0, false).then(() => {

				if (!this.checkDeliveryAddressFormData) {
					this.resetUserDeliveryAddress();
				}
				
				if (this.editMode) {
					// Set allow change zipcode from timeslot for a limited time if in edit mode 
					this.states.bAllowTimeslotUpdateZipcode = true;
					this.$timeout.cancel(this.zipcodeUpdateTimer);
					this.zipcodeUpdateTimer = this.$timeout(() => {
						this.states.bAllowTimeslotUpdateZipcode = false;
					}, 5000); // Time is only for service response, not user response
				}
				
				if (this.createUserService.checkDeliveryObj.deliveryZoneState) {

					if (this.formData.AddressesAreEqual) {
						this.formData.InvoiceAddress.PostalCode = this.createUserService.checkDeliveryObj.zipCode;
						this.formData.InvoiceAddress.PostalDistrict = this.createUserService.checkDeliveryObj.city;
						this.formData.InvoiceAddress.StreetName = this.createUserService.checkDeliveryObj.streetName;
						this.formData.InvoiceAddress.HouseNumber = this.createUserService.checkDeliveryObj.houseNumber;
					}
					else {
						this.formData.DeliveryAddress.PostalCode = this.createUserService.checkDeliveryObj.zipCode;
						this.formData.DeliveryAddress.PostalDistrict = this.createUserService.checkDeliveryObj.city;
						this.formData.DeliveryAddress.StreetName = this.createUserService.checkDeliveryObj.streetName;
						this.formData.DeliveryAddress.HouseNumber = this.createUserService.checkDeliveryObj.houseNumber;
					}
				}

			});
		}

		public validateForm = (form: any): boolean => {
			return this.validateFormService.validateForm(form);
		};

		/**
		 * @author TTH
		 * @description Reset the delivery address object
		 */
		private resetUserDeliveryAddress() {
			this.checkDeliveryAddressFormData = {} as IUserDeliveryAddress;
			this.showStreetAddressError = false;
		}

		/**
		 * @author TTH
		 * @description Update the data object for the "Create user" form
		 */
		private updateCreateUserFormData() {
			this.createUserService.updateCreateUserFormData(this.checkDeliveryAddressFormData);
		}

		/**
		 * @author TTH
		 * @description Logic before calling API for street address validation
		 */
		public checkStreetAddress() {
			this.states.checkingZipcode = true;
			this.showStreetAddressError = false;

			// Call api with address details
			this.createUserService.checkDeliveryAddress(this.checkDeliveryAddressFormData)
				// If success
				.then((addressIsValid) => {
					if (addressIsValid) {
						// Update user data in service
						this.updateCreateUserFormData();

						this.states.validCheckedZipcode = true;
						this.showPartialFlow = false;
						this.showStreetAddressError = false;
					} else {
						// show Error message
						this.showStreetAddressError = true;
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.finally(() => {
					this.states.checkingZipcode = false;
				});
		}

		/**
		 * @author TTH
		 * @description Reset states flows, fields to make the postalcode input editable again
		 */
		public editPostalCodeField() {

			if (this.showPartialFlow) {
				this.resetUserDeliveryAddress();
				this.updateCreateUserFormData();
				this.showPartialFlow = false;
			}
		}


		/**
		 * @author KFN/TTH (refactoring)
		 * @description Handle logic before, and after, submitting zipcode to api for validation
		 * @param zipcode
		 * @param bypass
		 */
		public checkPostalCode = (zipcode: number = 0, bypass: boolean = false) => {

			if (!this.checkDeliveryAddressFormData) {
				this.resetUserDeliveryAddress();
			}

			if (zipcode === 0) {
				zipcode = this.checkDeliveryAddressFormData.PostalCode;
			}

			if (zipcode) {
				if (bypass) {
					this.updatePostalCode(zipcode, !this.formData.AddressesAreEqual);

				} else {
					// Initiate loader animation
					this.states.checkingZipcode = true;

					// Add post code
					this.createUserService.addPostCode(zipcode).then(() => {

						// Disable loader
						this.states.checkingZipcode = false;


						// Update local state: Full, Partial or None
						this.deliveryZoneState = this.createUserService.deliveryZoneStatus;

						// Update local data
						this.checkDeliveryAddressFormData.PostalDistrict = this.createUserService.validPostalDistrictName;

						// Determine the correct status of delivery
						// Full Delivery
						if (this.deliveryZoneState === TimeslotModule.DeliveryZoneStates.Full) {
							// Update user data in service
							this.updateCreateUserFormData();

							this.basketService.get();
							this.states.validCheckedZipcode = true;
							this.showPartialFlow = false;
						}

						// Partial: get full address before showing rest of form
						else if (this.deliveryZoneState === TimeslotModule.DeliveryZoneStates.Partial) {
							// Update user data in service
							this.updateCreateUserFormData();

							this.states.validCheckedZipcode = false;

							// Show address field
							this.showPartialFlow = true;
						}

						// No delivery
						else if (this.deliveryZoneState === TimeslotModule.DeliveryZoneStates.NotAvailable) {
							this.states.validCheckedZipcode = false;
							this.showPartialFlow = false;

							// Show no delivery modal
							this.timeslotDialogService.initNoDelivery();
						}

					}, () => {
						this.states.checkingZipcode = false;
					});
				}
			}
		};

		public updatePostalCode = (postalCode: number, alt: boolean, reset: boolean = false) => {
			if (postalCode) {
				let formatedPostalCode = postalCode.toString();
				if (formatedPostalCode.length >= 3 && formatedPostalCode.length <= 4) {

					// Is only invoice address and not triggered from alt delivery section
					if (this.formData.AddressesAreEqual && !alt) {
						if (this.formData.InvoiceAddress.PostalCode !== postalCode) {
							reset = true;
						}

						if (!this.editMode && !this.lockedMode || reset) {
							this.formData.InvoiceAddress.StreetName = '';
							this.formData.InvoiceAddress.HouseNumber = '';
						}

						this.formData.InvoiceAddress.PostalDistrict = '';
						this.formData.InvoiceAddress.PostalCode = postalCode;

						this.addPostCode(postalCode, alt).then(() => {
							this.states.validPostalCode = true;
						}, () => {
							this.states.validPostalCode = false;
						});
					}
					// Is both invoice and delivery and triggered from alt delivery section
					else if (!this.formData.AddressesAreEqual && alt) {

						if (this.formData.DeliveryAddress.PostalCode !== postalCode) {
							reset = true;
						}

						if (!this.editMode && !this.lockedMode || reset) {
							this.formData.DeliveryAddress.StreetName = '';
							this.formData.DeliveryAddress.HouseNumber = '';
						}

						this.formData.DeliveryAddress.PostalDistrict = '';
						this.formData.DeliveryAddress.PostalCode = postalCode;

						this.addPostCode(postalCode, alt).then(() => {
							this.states.validPostalCode = true;
						}, () => {
							this.states.validPostalCode = false;
						});
					}

				}
			}
		};

		public addPostCode(postalCode: number, alt: boolean): ng.IPromise<boolean> {
			let defer = this.$q.defer();
			this.states.fetchingStreetNames = true;

			this.timeslotService.checkPostCode(postalCode).then((response) => {
				this.states.fetchingStreetNames = false;
				
				// If any delivery
				if (response.deliveryZoneState === DeliveryZoneStates.Full || response.deliveryZoneState === DeliveryZoneStates.Partial) {
					if (alt) {
						this.formData.DeliveryAddress.PostalDistrict = response.city;
					}
					else {
						this.formData.InvoiceAddress.PostalDistrict = response.city;
					}
				}
				else {
					if (alt) {
						this.formData.DeliveryAddress.PostalDistrict = this.translations.CreateUser.CreateUserCity.NoDelivery;
					}
					else {
						this.formData.InvoiceAddress.PostalDistrict = this.translations.CreateUser.CreateUserCity.NoDelivery;
					}
				}

				defer.resolve(true);
			}, () => {
				console.log("addPostCode ERROR");
				this.states.fetchingStreetNames = false;
				if (alt) {
					this.formData.DeliveryAddress.PostalDistrict = this.translations.CreateUser.CreateUserCity.NotFound;
				}
				else {
					this.formData.InvoiceAddress.PostalDistrict = this.translations.CreateUser.CreateUserCity.NotFound;
				}
				defer.reject(false);
			});

			return defer.promise;
		};


		public showModal = (headline: string, msg: string) => {
			this.createUserService.showFeedback(headline, msg);
		};


		public createUser = (formData, form) => {

			let copy = JSON.parse(JSON.stringify(formData));

			if (copy.AddressesAreEqual) {
				copy.DeliveryAddress = this.createUserService.getFormData().DeliveryAddress;
			}

			copy.LoginName = copy.Email;

			if (this.editMode) {
				this.states.creatingUser = true;
				this.createUserService.updateUser(copy).then((response) => {
					this.states.creatingUser = false;
					this.createUserService.showFeedback('', this.translations.EditUser.EditUserGeneral.SuccessMsg);

				}).catch((response) => {
					this.states.creatingUser = false;
					this.createUserService.showFeedback(this.translations.CreateUser.CreateUserGeneral.ErrorTitle, response.ErrorMessage);
				});
			}
			else if (this.lockedMode) {
				this.states.creatingUser = true;
				this.createUserService.activeUser(copy).then((response) => {
					this.states.creatingUser = false;
					this.createUserService.showFeedback('', this.translations.ActivateUser.ActivateUserGeneral.SuccessMsg);
					this.xamarinService.navigateToShopPage();

					// Navigate to login page
					this.$timeout(() => {
						this.dialogService.closeDialog();
						this.$location.url(this.settingsService.settings.LoginPageUrl);
					}, 5000);

				}).catch((response) => {
					this.states.creatingUser = false;
					this.createUserService.showFeedback(this.translations.CreateUser.CreateUserGeneral.ErrorTitle, response.ErrorMessage);
				});
			}
			else {
				this.states.creatingUser = true;
				this.createUserService.createUser(copy).then((response) => {
					this.states.creatingUser = false;
					this.createUserService.showFeedback('', this.translations.CreateUser.CreateUserGeneral.SuccessMsg, true);
					this.xamarinService.navigateToShopPage();

					this.clearFields(form);

				}).catch((response) => {
					this.states.creatingUser = false;
					this.createUserService.showFeedback(this.translations.CreateUser.CreateUserGeneral.ErrorTitle, response.ErrorMessage);
				});
			}
		};

	}

	class CreateUserComponent implements ng.IComponentOptions {
		public controller: any;
		public template: any;
		public transclude: any;
		public bindings: any;

		constructor() {
			this.controller = CreateUserController;
			this.transclude = true;
			this.template = HtmlTemplates.create.user.html;
			this.bindings = {
				editMode: "<",
				lockedMode: "<",
				user: "<"
			};
		}

	}

	angular.module(moduleId).component("createUser", new CreateUserComponent());
}
