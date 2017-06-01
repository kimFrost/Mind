///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;


	class TimeslotStatusDisplayController {
		
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

				if (deliveryZoneAccepted) {
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

				if (this.timeslotService.activeTimeslot !== undefined && this.timeslotService.activeTimeslot !== null) {

					// Update status display text with currently active timeslot text
					this.$timeout(() => {
						if (this.timeslotService.activeTimeslot.formattedDeliveryTime) {
							// Set new delivery time in status button (does not exist yet, see updateTimeslot() in timeslotService)
							this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime
								.substr(5, this.timeslotService.activeTimeslot.formattedDeliveryTime.length);
						}

					});
				}
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
	}

	class TimeslotStatusDisplayComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				
			};
			this.controller = TimeslotStatusDisplayController;
			this.template = HtmlTemplates.timeslot.statusdisplay.html;
		}
	}

	angular.module(moduleId).component("timeslotStatusdisplay", new TimeslotStatusDisplayComponent());


}
