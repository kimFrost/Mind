///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	class TimeslotStatusButtonController {
		
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public buttonState: number;
		public selectorActive: boolean = false;
		public buttonDisabled: boolean = false;
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
					this.buttonDisabled = false;
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

		// Status button click handler
		// ----------------------------------
		public statusButtonClick() {

			if (this.buttonDisabled || this.timeslotStateService.promptState === PromptStates.Visible) {
				return;
			}

			// If prompt is waiting to be revealed, and user interrupts, we show th eprompt
			if (this.timeslotStateService.promptState === PromptStates.Initial) {
				if (!this.timeslotService.timeslotIsSelected && !this.timeslotService.deliveryZoneAccepted) {
					this.timeslotStateService.setPromptState(PromptStates.Visible);	
				}
			}

			// Firstly check if timeslot is selected
			else if (this.timeslotService.timeslotIsSelected) {
				if (this.timeslotStateService.selectorState === SelectorStates.Inactive) {
					this.timeslotStateService.setSelectorState(SelectorStates.Active);
					this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
				} else {
					this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
					this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
				}
			}

			// If delivery zone is accepted, we have permission to interact with the timeslot selector
			else if (this.timeslotService.deliveryZoneAccepted) {

				// If timeslot selector is open, close it
				if (this.timeslotStateService.selectorState === SelectorStates.Active) {
					this.timeslotStateService.setSelectorState(SelectorStates.Inactive);

					// If timeslot selector is closed without having a timeslot
					if (!this.timeslotService.timeslotIsSelected) {
						this.timeslotStateService.setStatusbuttonState(StatusButtonStates.DeliveryZoneKnown);
					}
					// If timeslot is selected
					else if (this.timeslotService.timeslotIsSelected) {
						this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelected);
					}

					this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);

				}
				// If timeslot selector is closed, open it
				else {

					// Open the timeslot selector
					this.timeslotStateService.setSelectorState(SelectorStates.Active);

					// Set global timeslot state
					this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);


					// If timeslot is selected
					if (this.timeslotService.timeslotIsSelected) {
						this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelected);
					} else {
						this.timeslotStateService.setStatusbuttonState(StatusButtonStates.TimeslotSelectorActive);
					}
				}
			}
			// If deliveryZone is not accepted, we should present the prompt
			else {
				if (this.timeslotStateService.promptState === PromptStates.Hidden) {
					this.timeslotStateService.setPromptState(PromptStates.Visible);
					this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
				}
			}
		}
	}

	class TimeslotStatusButtonComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				
			};
			this.controller = TimeslotStatusButtonController;
			this.template = HtmlTemplates.timeslot.statusbutton.html;
		}
	}

	angular.module(moduleId).component("timeslotStatusbutton", new TimeslotStatusButtonComponent());


}
