///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	class TimeslotBasketButtonController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public buttonState: number;
		public selectorActive: boolean = false;
		public deliveryTimeDate: any;
		public deliveryTimeStart: string;
		public deliveryTimeEnd: string;
		public formattedDeliveryTime: string;
		public timeslotIsReadyToInit: boolean = false;
		public timeslotId: number;


		constructor(private $element,
			private $scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			private timeslotService: TimeslotService,
			private timeslotStateService: TimeslotStateService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;
			
		}

		$onInit() {

			// STATES
			// =======================================

			// Watch for service init boolean changes
			this.$scope.$watch(() => {
				return this.timeslotService.timeslotIsReadyToInit;
			}, (boolean) => {
				this.timeslotIsReadyToInit = boolean;

				if (this.timeslotService.timeslotIsSelected) {
					this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelected);
				} else if (this.timeslotService.deliveryZoneAccepted) {
					this.timeslotStateService.setStatusbuttonState(StatusButtonStates.DeliveryZoneKnown);
				}

			});


			this.$scope.$watch(() => {
				return this.timeslotService.deliveryZoneAccepted;
			}, (deliveryZoneAccepted) => {

				if (this.timeslotService.timeslotIsSelected) {
					this.buttonState = StatusButtonStates.TimeslotSelected;
				} else if (deliveryZoneAccepted) {
					this.buttonState = StatusButtonStates.DeliveryZoneKnown;
				} else {
					this.buttonState = StatusButtonStates.DeliveryZoneUnknown;
				}
			});


			// Watch for changes to the active timeslot in timeslotService
			this.$scope.$watch(() => {
				return this.timeslotService.activeTimeslot;
			}, () => {

				this.timeslotId = this.timeslotService.activeTimeslot.id;

				// Update statusbutton text with currently active timeslot text
				this.$timeout(() => {
					this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime;

					if (this.timeslotService.activeTimeslot !== undefined && this.timeslotService.activeTimeslot !== null) {
						// Set new delivery time in status button (does not exist yet, see updateTimeslot() in timeslotService)
						this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime;
					}
				});
			}, true);


			// Watch for changes to StatusButtonState in timeslot state service
			// All states for the status button go through the StateService, because other components might need
			// to know when the button changes state
			this.$scope.$watch(() => {
				return this.timeslotStateService.statusButtonState;
			}, (state) => {

				this.$timeout(() => {
					this.buttonState = state;
				});

			});

			// Watch for timeslotState changes in timeslotService
			this.$scope.$watch(() => {
				return this.timeslotService.timeslotIsSelected;
			}, (state) => {

				if (state) {
					this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelected);
					this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime;
				}
			});


			// Fail safe to update the statusbutton with correct state and formatted delivery time, in the different flow in the checkout-change-address flow
			this.$scope.$on('timeslotUpdate_SUCCESS', () => {
				this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelected);
				this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime;
			});

			// Watch for timeslotState changes in timeslotStateService
			this.$scope.$watch(() => {
				return this.timeslotStateService.selectorState;
			}, (state) => {

				if (state === SelectorStates.Active) {

					if (!this.timeslotService.timeslotIsSelected) {
						this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelectorActive);
					}
					this.selectorActive = true;
				}

				else if (state === SelectorStates.Inactive) {
					if (this.timeslotService.timeslotIsSelected) {

					}

					else if (this.timeslotService.deliveryZoneAccepted) {
						this.timeslotStateService.setStatusbuttonState(StatusButtonStates.DeliveryZoneKnown);
					}

					this.selectorActive = false;
				}
			});
		}


		// METHODS
		// ==================================

		// Basket button click handler
		// ----------------------------------
		public basketButtonClick() {

			// If Delivery Zone not Accepted, open check address step
			if (!this.timeslotService.deliveryZoneAccepted) {
				this.timeslotStateService.setTimeslotState(TimeslotStates.DeliveryZone);
			} else {
				this.timeslotService.openTimeslotSelector();
			}

			this.timeslotStateService.setDeviceFlowState(DeviceFlowStates.Show);
		}
	}

	class TimeslotBasketButtonComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				
			};
			this.controller = TimeslotBasketButtonController;
			this.template = HtmlTemplates.timeslot.basketbutton.html;
		}
	}

	angular.module(moduleId).component("timeslotBasketbutton", new TimeslotBasketButtonComponent());


}
