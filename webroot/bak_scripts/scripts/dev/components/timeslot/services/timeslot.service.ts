
///<reference path="../../../../references/references.ts"/>

/**
 * Author: MST
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type DeliveryAddressArgs = SCommerce.Website.Code.WebAPI.Models.Delivery.DeliveryAddressregistrationViewModel;
	type DeliveryTimeValidationViewModel = SCommerce.Website.Code.WebAPI.Models.Delivery.DeliveryTimeValidationViewModel;

	// States for delivery zone (zipcode, address)
	export enum DeliveryZoneStates {
		NotAvailable = 0,
		None = 1,
		Partial = 2,
		Full = 3
	}

	export interface ITimeSlot {
		id: number;
		date: Date;
		startHour: number;
		endHour: number;
		reserved: boolean;
		formattedDeliveryTime: string;
	}

	export class TimeslotService {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};



		// Settings
		// Map to keep track of how many days each breakpoint uses in the date block navigation
		public BreakpointsForTimeslotDays = {
			xxxsmall: 6,
			xxsmall: 8,
			xsmall: 8,
			small: 8,
			medium: 8,
			large: 8,
			xlarge: 8,
			xxlarge: 8,
			xxxlarge: 8,
			mega: 8
		};

		// Amount of days to show in the timeslot picker. Must be divided by 8, 6 and 4
		public deliveryDaysAmount: number = this.BreakpointsForTimeslotDays[this.responsiveService.responsiveState.breakpoint]; // 48; 64; 56;
		public maxDeliveryDarysAmount: number = 48;

		// Object containing information about the delivery zone (postalcode, streetname etc)
		public deliveryZone: DeliveryAddressArgs = {} as DeliveryAddressArgs;

		// Object containing information about the active timeslot (id, date, starthour etc)
		public activeTimeslot: ITimeSlot = {} as ITimeSlot;

		// Delivery zone status
		public timeslotIsReadyToInit: boolean = false;
		public deliveryZoneStatus: number = DeliveryZoneStates.NotAvailable;
		public deliveryZoneAccepted: boolean = false;
		public timeslotIsSelected: boolean = false;
		public deliveryDays: Array<any> = [];
		public deliveryMessages: Array<any> = [];
		public tempZipCode: string = '';
		public latestKnownZipcode: number; // Store inputted zipcode from user here

		// Changes in basket when a new timeslot is trying to update
		public unconfirmedTimeslot:any = {};
		public timeslotChanges: DeliveryTimeValidationViewModel = {} as DeliveryTimeValidationViewModel;

		public basketData: any = null;
		public userLoggedIn: boolean = false;

		// Booleans for components to watch for changes that can initiate states
		private isGettingDays: boolean = false;
		public deliveryDaysReady = false; // To know when device flow can remove loader


		constructor(private $q: ng.IQService,
			private $http: ng.IHttpService,
			private $rootScope: ng.IRootScopeService,
			private dialogService: DialogModule.DialogService,
			private trackingService: TrackingModule.TrackingService,
			private settingsService:PageModule.SettingsService,
			private userService: UserModule.UserService,
			private basketService: BasketModule.BasketService,
			private timeslotStateService: TimeslotStateService,
			private responsiveService: UtilsModule.ResponsiveService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;			

			// Watch changes in basket service data
			// This is also the initializer for the timeslot module. 
			// Nothing initializes before we have basket
			// ====================================
			$rootScope.$watch(() => {
				return this.basketService.basket;
			}, (basket) => {

				if (Object.keys(basket).length !== 0 && basket.constructor === Object) {

					// If deliveryTimeslot is not reserved, reset the timeslot selector, and update correct deliveryZoneStatus
					if (!basket.DeliveryTimeSlot.Reserved) {
						this.resetDeliveryZoneAndTimeslot(this.deliveryZoneStatus);
					}

					// If we know the delivery address
					if (this.basketService.basket.DeliveryAddress !== undefined) {

						this.basketData = basket;

						// FULL delivery possible
						if (this.basketData.DeliveryAddress.PostalCode !== 0 && this.basketData.DeliveryAddress.PostalDistrict !== null) {
							this.updateDeliveryZoneAndTimeslot();
						}
						// NO delivery address available, need user input
						else {
							this.deliveryZoneStatus = DeliveryZoneStates.NotAvailable;
							this.deliveryZoneAccepted = false;
							this.timeslotIsReadyToInit = true;
						}
					}

				}
			}, true);

			// Watch responsiveState to trigger the create navigation function
			$rootScope.$watch(() => {
				return this.responsiveService.responsiveState.breakpoint;
			}, (breakpoint, oldBreakpoint) => {

				if (breakpoint !== oldBreakpoint) {
					this.deliveryDaysAmount = this.BreakpointsForTimeslotDays[this.responsiveService.responsiveState.breakpoint];
				}
			});


			/**
			 * Watch the logged in state
			 */
			$rootScope.$watch(() => {
				return this.userService.states.isLoggedIn;
			}, (isLoggedIn) => {

				if (isLoggedIn) {
					this.userLoggedIn = true;
					this.deliveryZoneAccepted = true;
				} else {
					this.resetDeliveryZoneAndTimeslot(DeliveryZoneStates.None);
					this.timeslotStateService.setStatusbuttonState(StatusButtonStates.DeliveryZoneUnknown);
				}
				
			}, true);

		}

		/**
		 * @description Opens timeslot selector and gets deliverydays if necessary
		 * @param getDays
		 */
		public openTimeslotSelector(getDays: boolean = true) {
			
			this.timeslotStateService.setDeviceFlowState(DeviceFlowStates.Show);
			this.timeslotStateService.setSelectorState(SelectorStates.Active);
			this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);

			if (!getDays) {

				this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
				this.timeslotStateService.setSelectorState(SelectorStates.Active);
				this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
				this.timeslotStateService.setDeviceFlowState(DeviceFlowStates.Show);

				this.isGettingDays = false;

				return;
			} 

			if (!this.isGettingDays) {
				this.isGettingDays = true;

				this.getDeliveryDays()
					.then(() => {

						this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);

						this.isGettingDays = false;
					});
			}
		}

		/**
		 * @author TTH
		 * @description Closes the timeslot selector
		 */
		public closeTimeslotSelector() {
			this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
			this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
			this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
			this.timeslotStateService.setDeviceFlowState(DeviceFlowStates.Hide);
		}


		// Update local variables and states
		public updateDeliveryZoneAndTimeslot() {

			this.deliveryZoneStatus = DeliveryZoneStates.Full;
			this.deliveryZoneAccepted = true;

			// Update deliveryZone object
			this.deliveryZone.PostalCode = this.basketData.DeliveryAddress.PostalCode;
			this.deliveryZone.City = this.basketData.DeliveryAddress.PostalDistrict;
			this.deliveryZone.StreetName = this.basketData.DeliveryAddress.StreetName;
			this.deliveryZone.HouseNumber = this.basketData.DeliveryAddress.HouseNumber;

			// Broadcast that the deliveryZone object has been updated
			this.$rootScope.$broadcast('deliveryZone_UPDATED', this.deliveryZone);

			// Update activeTimeslot object, if timeslot has been selected by user
			this.activeTimeslot.formattedDeliveryTime = this.basketData.FormattedDeliveryTime;

			if (this.basketData.DeliveryTimeSlot.Reserved) {
				this.timeslotIsSelected = true;

				// If timeslot is selected, we must set the deliveryDaysAmount to the full amount to be able to recreate the dates navigation in the timeslot selector correctly
				this.deliveryDaysAmount = this.maxDeliveryDarysAmount;

				this.activeTimeslot.id = this.basketData.DeliveryTimeSlot.Id;
				this.activeTimeslot.date = this.basketData.DeliveryTimeSlot.Date;
				this.activeTimeslot.startHour = this.basketData.DeliveryTimeSlot.StartTime;
				this.activeTimeslot.endHour = this.basketData.DeliveryTimeSlot.EndTime;
				this.activeTimeslot.reserved = this.basketData.DeliveryTimeSlot.Reserved;

				this.timeslotIsReadyToInit = true;

				this.$rootScope.$broadcast('activeTimeslot_UPDATED');
			}

			// If timeslot has no been selected
			this.timeslotIsReadyToInit = true;

		}


		/**
		 * @author TTH
		 * @description Reset timeslot in client
		 */
		public resetActiveTimeslot() {
			// Timeslot data
			this.activeTimeslot.formattedDeliveryTime = "";
			this.timeslotIsSelected = false;
			this.activeTimeslot.id = null;
			this.activeTimeslot.date = null;
			this.activeTimeslot.startHour = null;
			this.activeTimeslot.endHour = null;
			this.activeTimeslot.reserved = false;

			// Broadcast changes
			this.$rootScope.$broadcast('activeTimeslot_UPDATED');
			this.$rootScope.$broadcast('REFRESH_PRODUCTS');
		}

		// Reset the data for the timeslot and delivery zone
		public resetDeliveryZoneAndTimeslot(deliveryZoneState: DeliveryZoneStates) {

			this.deliveryZoneStatus = deliveryZoneState;

			this.deliveryZoneAccepted = false;

			// Timeslot data
			this.activeTimeslot.formattedDeliveryTime = "";
			this.timeslotIsSelected = false;
			this.activeTimeslot.id = null;
			this.activeTimeslot.date = null;
			this.activeTimeslot.startHour = null;
			this.activeTimeslot.endHour = null;
			this.activeTimeslot.reserved = false;

			// Deliveryzone data
			this.deliveryZone.PostalCode = 0;
			this.deliveryZone.City = "";
			this.deliveryZone.StreetName = "";
			this.deliveryZone.HouseNumber = null;

			this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);

			if (this.userLoggedIn) {
				this.timeslotStateService.setPromptState(PromptStates.Visible);
			}


			// Broadcast changes
			this.$rootScope.$broadcast('activeTimeslot_UPDATED');
			this.$rootScope.$broadcast('deliveryZone_UPDATED', this.deliveryZone);
			// this.$rootScope.$broadcast('REFRESH_PRODUCTS');
		}

		// Generic dialog method for 
		private showErrorMessage(message: string) {

			let dialogSettings = {
				header: this.translations.ServerErrorMessages.Error500Header,
				content: `<div>${message}</div>`,
				close: true,
				size: 'small'
			};

			// Open Dialog that informs user about failing service
			this.dialogService.openDialog(dialogSettings);
		}


		// ===========================
		// HTTP Services
		// ===========================

		public checkPostCode(zipCode:number): ng.IPromise<any> {
			let defer = this.$q.defer();

			// Save latest known zipcode for lookup purposes if user gets to no-delivery flow
			this.latestKnownZipcode = zipCode;

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/' + 'CheckPostCode',
				data: zipCode
			}).then((response) => {

				var result: any = response.data;

				if (result.IsFullDeliverable) {
					defer.resolve({deliveryZoneState:DeliveryZoneStates.Full, zipCode:zipCode, city: result.PostalDistrictName});

				} else if(result.IsPartlyDeliverable) {
					defer.resolve({deliveryZoneState:DeliveryZoneStates.Partial, zipCode:zipCode, city: result.PostalDistrictName});

				} else {
					defer.reject();
				}
			});

			return defer.promise;

		}

		public checkStreetNames(deliveryZone: DeliveryAddressArgs): ng.IPromise<any> {
			let defer = this.$q.defer();

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/' + 'CheckDeliveryAddress',
				data: deliveryZone
			}).then((response) => {
				defer.resolve(response.data);
			}).catch((response) => {
				console.error("ERROR CheckStreetNames: ", response);
				defer.reject(response);
			});

			return defer.promise;
		}

		/**
		 * Add Post Code
		 * @author TTH
		 * @description Validates deliveryZone based on ZipCode and sets states accordingly
		 *
		 * @param zipCode: number
		 * @param initiateFlow: boolean (if true, it will always follow the timeslot flow to the end)
		 * @param updateDeliveryZone: boolean (if true, it only updates a local variable, but not the deliveryZone object)
		 * @returns {IPromise<T>}
		 */
		public addPostCode(zipCode:number, initiateFlow:boolean = true, updateDeliveryZone:boolean = true): ng.IPromise<boolean> {
			let defer = this.$q.defer();

			// Make sure we know what the inputted zipcode is
			this.latestKnownZipcode = zipCode;

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/' + 'AddPostCode',
				data: zipCode
			}).then((response) => {

				var result: any = response.data;

				// if tempcheck we just update the temp variable for check address component
				this.tempZipCode = zipCode.toString();

				// Tracking postalcode
				if (result.IsFullDeliverable) {
					this.trackingService.trackAddPostalCode(zipCode, 'Full deliverable');
				} 
				else if (result.IsPartlyDeliverable) {
					this.trackingService.trackAddPostalCode(zipCode, 'Partly deliverable');
				}
				else {
					this.trackingService.trackAddPostalCode(zipCode, 'Not deliverable');
				}

				// If a temp check, we only update the local variable, but not the deliveryZone object
				// This is for the partial flow, so the user does not update anything unless completing the partial flow
				if (updateDeliveryZone) {

					// Full delivery available
					if (result.IsFullDeliverable) {

						// Reset delivery zone
						this.resetDeliveryZoneAndTimeslot(DeliveryZoneStates.Full);

						this.deliveryZoneStatus = DeliveryZoneStates.Full;
						this.deliveryZoneAccepted = true;

						// Update deliveryZone object ot fit the state of full delivery
						this.deliveryZone.PostalCode = zipCode;
						this.deliveryZone.City = result.PostalDistrictName;
						this.deliveryZone.StreetName = "";
						this.deliveryZone.HouseNumber = null;

						this.settingsService.setZipCode(zipCode.toString());

						this.$rootScope.$broadcast('deliveryZone_UPDATED', this.deliveryZone);

						if (initiateFlow) {
							this.dialogService.closeDialog();
							this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
							this.timeslotStateService.setSelectorState(SelectorStates.Active);
						}

					// Partial delivery available
					} else if (result.IsPartlyDeliverable) {

						// Update deliveryZone status
						this.deliveryZoneStatus = DeliveryZoneStates.Partial;

						// Update deliveryZone object ot fit the state of full delivery
						this.deliveryZone.PostalCode = zipCode;
						this.deliveryZone.City = result.PostalDistrictName;
						this.deliveryZone.StreetName = "";
						this.deliveryZone.HouseNumber = null;

						// Let device flow know that the partial step is currently active
						this.$rootScope.$broadcast('previousStepCheckAddress');

						if (initiateFlow) {

							if (window.innerWidth >= UtilsModule.Breakpoints.Large) {
								this.timeslotStateService.initCheckAddress(this.deliveryZone.PostalCode);
							}
						}

					// No delivery available
					} else {

						// Reset the timeslot and delivery zone, and update the deliveryZone status
						this.resetDeliveryZoneAndTimeslot(DeliveryZoneStates.None);

						if (initiateFlow) {
							this.timeslotStateService.setTimeslotState(TimeslotStates.AddToWaitlist);
						}
					}
				}

				defer.resolve(this.deliveryZoneAccepted);

			}, (response) => {
				console.error("ERROR addPostCode: ", response);

				this.$rootScope.$broadcast('addPostCode_FAIL');

				defer.reject(response);
			});
			return defer.promise;
		}


		// Add Delivery Address
		// When deliveryZoneStatus is PARTIAL, we need to know the street name to complete validation of deliveryZone
		// ============================================================================
		public addDeliveryAddress(deliveryZone: DeliveryAddressArgs, initiateFlow: boolean = true): ng.IPromise<boolean> {
			let defer = this.$q.defer();

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/' + 'AddDeliveryAddress',
				data: deliveryZone
			}).then((response) => {
				var result: any = response.data;

				// Update deliveryZone object
				this.deliveryZoneAccepted = result.DeliveryAvailable;

				if (this.deliveryZoneAccepted) {
					// Update deliveryZone object
					this.deliveryZone = deliveryZone;
					this.deliveryZone.City = result.PostalDistrict.PostalDistrictName;
					this.deliveryZoneStatus = DeliveryZoneStates.Full;

					this.$rootScope.$broadcast('deliveryZone_UPDATED', this.deliveryZone);

					this.settingsService.setZipCode(this.deliveryZone.PostalCode.toString());
				} else {
					this.deliveryZoneStatus = DeliveryZoneStates.None;
					this.deliveryZoneAccepted = false;

					if (initiateFlow) {
						this.timeslotStateService.setTimeslotState(TimeslotStates.AddToWaitlist);
					}
				}

				defer.resolve(this.deliveryZoneAccepted);
			}, (response) => {
				console.error("ERROR addDeliveryAddress: ", response);

				this.$rootScope.$broadcast('addDeliveryAddress_FAIL');

				defer.reject();
			});
			return defer.promise;

		}

		// Get delivery days
		// ======================================
		public getDeliveryDays(amount: number = this.deliveryDaysAmount): ng.IPromise<any> {
			let defer = this.$q.defer();

			this.$http({
					method: 'GET',
					url: '/webapi/Delivery/' + 'GetDeliveryDays?days=' + amount
				})
				.then((response) => {
					var result: any = response.data;

					// Update deliveryDays object
					this.deliveryDays.splice(0, this.deliveryDays.length);

					// Collect all days
					result.DayRangeHours.forEach((day) => {
						this.deliveryDays.push(day);
					});

					this.deliveryMessages = result.Messages;

					this.deliveryDaysReady = true;
					this.$rootScope.$broadcast('getDeliveryDays_SUCCESS');

					defer.resolve(response);
				},
				(response) => {
					console.error("ERROR getDeliveryDays: ", response);

					this.$rootScope.$broadcast('getDeliveryDays_FAIL');

					defer.reject(response);
				});

			return defer.promise;
		};

		// Get NEXT delivery days
		// ======================================
		public getNextDeliveryDays(startDate:string, amount:number): ng.IPromise<any> {
			let defer = this.$q.defer();

			if (!amount || !startDate) {
				defer.reject("Required arguments missing in method 'getNextDeliveryDays()'");
			}

			this.$http({
					method: 'GET',
					url: '/webapi/Delivery/' + 'GetNextDeliveryDays?startDate=' + startDate + '&days=' + amount
				})
				.then((response) => {
					var result: any = response.data;

					// Update deliveryDays object, by removing the last date in array, 
					// because we fetch dates based on the last known date in array.
					this.deliveryDays.splice(this.deliveryDays.length - 1, this.deliveryDays.length);

					// Collect all days
					result.DayRangeHours.forEach((day) => {
						this.deliveryDays.push(day);
					});

					this.deliveryMessages = result.Messages;

					defer.resolve(result);
				},
				(response) => {
					console.error("ERROR getDeliveryDays: ", response);

					this.$rootScope.$broadcast('getDeliveryDays_FAIL');

					defer.reject(response);
				});

			return defer.promise;
		};


		
		// Update timeslot
		// ======================================
		public updateTimeslot(timeslotItem: any, forceUpdate: boolean = false): ng.IPromise<any> {
			let defer = this.$q.defer();
			let timeslotId = timeslotItem.Id;

			this.$http({
				method: 'GET',
				url: '/webapi/Delivery/' + (forceUpdate ? 'UpdateDeliveryTime' : 'TryUpdateDeliveryTime') + '?timeslotId=' + timeslotId
			}).then((response) => {
				var result: DeliveryTimeValidationViewModel = response.data as DeliveryTimeValidationViewModel;

				// If timeslot is successfully reserved
				if (result.IsReserved) {
					this.timeslotIsSelected = true;

					this.timeslotStateService.setDeviceFlowState(DeviceFlowStates.Hide);

					// Check wether there are differences that would prevent the timeslot to be selected
					if (result.CouponLineDiffs.length === 0 && result.ProductLineDiffs.length === 0 && result.BundleLineDiffs.length === 0) {

						// Update activeTimeslot object
						this.activeTimeslot.id = timeslotItem.Id;
						this.activeTimeslot.startHour = timeslotItem.StartHour;
						this.activeTimeslot.endHour = timeslotItem.EndHour;
						this.activeTimeslot.date = timeslotItem.Date;

						this.timeslotChanges = {} as DeliveryTimeValidationViewModel;
						this.unconfirmedTimeslot = {};

						this.timeslotIsSelected = true;

						const siteSettings = this.settingsService.settings;
						siteSettings.TimeslotUtc = result.TimeslotUtc;
						siteSettings.DeliveryZoneId = result.DeliveryZoneId;

						if(result.ShowDeadlineAlert) {
							this.timeslotStateService.initClosesSoon(result.MinutesTillDeadline);
						}

						this.$rootScope.$broadcast('activeTimeslot_UPDATED');
						this.$rootScope.$broadcast('REFRESH_PRODUCTS');

						// Get basket and update formatted delivery time
						this.basketService.get()
							.then((basket) => {
								this.activeTimeslot.formattedDeliveryTime = basket.FormattedDeliveryTime;

								// Tell animation block what's up
								this.$rootScope.$broadcast('timeslotUpdate_SUCCESS');

								this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
							});

						// TODO: Update visible products
					} else {
						this.unconfirmedTimeslot = timeslotItem;
						this.timeslotChanges = result;
						this.timeslotStateService.setTimeslotState(TimeslotStates.ConfirmBasketChanges);
					}

					// var timeslotStartUtc = "2016101813"; // TODO: Change to data from response
					// this.settingsService.setTimeslotStart(timeslotStartUtc);

					defer.resolve();
				} else {
					
					if (result.PriceChangeDiff !== 0 || result.CouponLineDiffs.length > 0) {
						this.unconfirmedTimeslot = timeslotItem;
						this.timeslotChanges = result;

						// Init basket changes dialogue
						this.timeslotStateService.setTimeslotState(TimeslotStates.ConfirmBasketChanges);
					}
				}
			}, (response) => {
				console.error("ERROR updateTimeslot: ", response);

				// Feedback to components and user
				this.showErrorMessage(this.translations.Timeslot.TimeslotServerMessages.UpdateTimeslot500);
				this.$rootScope.$broadcast('timeslotUpdate_FAIL');

				// Timeslot update failed.. Do a rollback to selector and reset selection data
				this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
				defer.reject();
			});

			return defer.promise;
		};

	}

	angular.module(moduleId).service("timeslotService", TimeslotService);
}
