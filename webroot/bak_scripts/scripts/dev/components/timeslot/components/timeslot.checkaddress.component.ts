///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type DialogService = DialogModule.DialogService;
	type DeliveryAddressArgs = SCommerce.Website.Code.WebAPI.Models.Delivery.DeliveryAddressregistrationViewModel;
	type TranslationsService = TranslationsModule.TranslationsService;

	class TimeslotpickerCheckAddressController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public postalCode: number;
		public initiateFlow: boolean;

		public partlyState: boolean = false;
		public zipcode: string = '';
		public streetName: string = '';
		public houseNumber: string = '';
		public busy: boolean = false;

		public zipCodeInput;
		public streetNameInput;
		public streetNameInvalid: boolean = false;

		constructor(private $element,
			private $scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			private timeslotStateService: TimeslotStateService,
			private timeslotService: TimeslotService,
			private dialogService: DialogService,
			private $rootScope: ng.IRootScopeService,
			private createUserService: UserModule.CreateUserService,
			translationsService: TranslationsService) {


			// Translations
			this.translations = translationsService.translations;

			if (this.initiateFlow === undefined) {
				this.initiateFlow = true;
			}

			if (this.postalCode > 0 && this.checkPartly()) {
				this.zipcode = this.postalCode.toString();
			}
		}

		//
		public checkZipcode() {
			this.busy = true;

			if (this.initiateFlow) {
				// Set loader state for devices flow
				this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Active);

				// Check post code
				this.timeslotService.addPostCode(parseInt(this.zipcode), false).then(() => {
						this.busy = false;

						// IF full delivery, get new set of timeslots, then show timeslot selector
						if (this.timeslotService.deliveryZoneStatus === DeliveryZoneStates.Full) {
							this.dialogService.closeDialog();

							// When Zip is valid, but we do not need to show the timeslot selector
							this.timeslotService.openTimeslotSelector();
						}
						// Partial delivery flow
						else if (this.timeslotService.deliveryZoneStatus === DeliveryZoneStates.Partial) {

							// Set zip code to temporary in case user bolts before setting new zipcode
							this.zipcode = this.timeslotService.tempZipCode;

							this.partlyState = true;
							this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
							this.$rootScope.$broadcast('previousStepCheckAddress');

							this.streetNameFieldFocus();
						}
						// No delivery flow
						else if (this.timeslotService.deliveryZoneStatus === DeliveryZoneStates.None) {

							// Reset the data for the timeslot and delivery zone
							this.timeslotService.resetDeliveryZoneAndTimeslot(DeliveryZoneStates.None);

							// Set zip code to temporary in case user bolts before setting new zipcode
							this.zipcode = this.timeslotService.tempZipCode;

							// Let device flow know that the partial step is currently active
							this.$rootScope.$broadcast('previousStepCheckAddress');
							this.timeslotStateService.setTimeslotState(TimeslotStates.AddToWaitlist);
							this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
						}
					});
			} else {
				this.timeslotService.checkPostCode(parseInt(this.zipcode)).then((response) => {
					this.busy = false;
					angular.merge(this.createUserService.checkDeliveryObj, response);

					if (response.deliveryZoneState === DeliveryZoneStates.Full) {
						this.createUserService.checkDeliveryObj.streetName = "";
						this.createUserService.checkDeliveryObj.houseNumber = null;

						this.dialogService.closeDialog();
					}
					else if (response.deliveryZoneState === DeliveryZoneStates.Partial) {
						this.partlyState = true;
					}
				}).catch(() => {
					this.busy = false;
					this.createUserService.checkDeliveryObj.deliveryZoneState = 0;
					this.timeslotStateService.setTimeslotState(TimeslotStates.AddToWaitlist);
				});
			}
		}


		public checkStreetAddress() {
			var deliveryAddress: DeliveryAddressArgs = {} as DeliveryAddressArgs;

			this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Active);
			this.busy = true;

			deliveryAddress.PostalCode = parseInt(this.zipcode);
			deliveryAddress.StreetName = this.streetName;
			deliveryAddress.HouseNumber = parseInt(this.houseNumber);

			if (this.initiateFlow) {
				this.timeslotService.addDeliveryAddress(deliveryAddress, false).then((deliveryZoneAccepted) => {
					if (deliveryZoneAccepted) {
						this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
						this.busy = false;

						// Reset inputs
						this.partlyState = false;
						this.streetName = "";
						this.houseNumber = "";

						// Reset the active timeslot, to force user to pick new one because the delivery address has changed
						this.timeslotService.resetActiveTimeslot();
						this.timeslotService.openTimeslotSelector();

						// No matter what, we close the dialog box to finish the checkaddress flow
						this.dialogService.closeDialog();
					} else {
						// Address was not valid. Let user know and stay on check address step
						this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
						this.busy = false;
						this.streetNameInvalid = true;
					}
				});
			} else {
				this.timeslotService.checkStreetNames(deliveryAddress).then((accepted) => {
					angular.merge(this.createUserService.checkDeliveryObj, { streetName: this.streetName, houseNumber: parseInt(this.houseNumber), accepted: accepted });

					if (accepted) {
						this.busy = false;

						this.partlyState = false;
						this.streetName = "";
						this.houseNumber = "";
						
						this.dialogService.closeDialog();
					} else {
						this.busy = false;
						this.streetNameInvalid = true;
					}
				});
			}
		}


		private zipcodeFieldFocus() {
			this.$timeout(() => {
				this.zipCodeInput.focus();
			});
		}

		private streetNameFieldFocus() {
			this.$timeout(() => {
				this.streetNameInput.focus();
			});
		}


		private checkPartly() {
			this.partlyState = this.timeslotService.deliveryZoneStatus === DeliveryZoneStates.Partial;
			return this.partlyState;
		}

		$onInit() {
			this.zipCodeInput = this.$element[0].getElementsByClassName('checkaddress-zipcode-input')[0];
			this.streetNameInput = this.$element[0].getElementsByClassName('street-suggestion')[0].getElementsByTagName('input')[0];

			// If triggered, it is because we need to reset the checkaddress to initial step
			// where the user inputs a zipcode
			this.$scope.$on('checkAddressStartStep', () => {
				this.partlyState = false;
				this.zipcode = "";
				this.zipcodeFieldFocus();
			});

			this.$rootScope.$on('addDeliveryAddress_FAIL', () => {
				this.busy = false;
			});

			// Watch selector states to determine when to reset this components state
			this.$scope.$watch(() => {
				return this.timeslotStateService.timeslotState;
			}, (state) => {
				if (state === TimeslotStates.DeliveryZone) {
					this.zipcodeFieldFocus();
				}
			});

			// Watch selector states to determine when to reset this components state
			this.$scope.$watch(() => {
				return this.timeslotStateService.selectorState;
			}, (state) => {
				if (state === SelectorStates.Active) {
					this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
					this.busy = false;
				}
			});

		}

	}


	class TimeslotpickerCheckAddressComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				postalCode: "<",
				initiateFlow: "<"
			};
			this.controller = TimeslotpickerCheckAddressController;
			this.template = HtmlTemplates.timeslot.checkaddress.html;
		}
	}

	angular.module(moduleId).component("timeslotCheckaddress", new TimeslotpickerCheckAddressComponent());


}
