///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {
	type TranslationsService = TranslationsModule.TranslationsService;

	class TimeslotDevicePromptController {
		public promptClassnames: any = {
			initialAnimationDone: 'initial-animation-done',
			unclickable: 'disabled-hidden'
		};

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public deliveryZoneStatus: number = 0;
		public deliveryZoneAccepted: boolean = false;
		private promptDelay: number = 2000;
		private promptTimeout; // Timeout placeholder
		public activeTimeslot: any;
		public promptState: PromptStates;

		public timeslotId: number;
		public formattedDeliveryTime: string;
		public nextAvailableDeliveryDate: string;
		public nextAvailableDeliveryDateEndTime: string;

		// Animation
		private animationSpeeds: any = {
			fast: 250,
			medium: 500,
			slow: 1500
		};

		// UI variables
		private animationElement; // DOM element reference for the propmpt
		private elementClass: string = '.timeslot-device-prompt';

		public timeslotIsReadyToInit: boolean = false;
		public cookieSet = false;
		public firstTimeAppearance: boolean = true;
		public showPrompt = false;
		public promptDisabled: boolean = false; // Disable user interaction on prompt
		public promptHidden: boolean = false;
		public promptLoading: boolean = false;


		constructor(private $element,
			private $window: ng.IWindowService,
			private $timeout: ng.ITimeoutService,
			private $scope: ng.IScope,
			private timeslotStateService: TimeslotStateService,
			private timeslotService: TimeslotService,
			private cookieWarningService: CookieWarningModule.CookieWarningService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

			// Set initial state for prompt
			// This is so we can manually trigger the prompt without the wait
			this.timeslotStateService.setPromptState(PromptStates.Initial);
		}


		// METHODS
		// ==================================

		// Sets timout to the prompt
		private timeoutPrompt() {
			this.promptTimeout = setTimeout(() => {
				this.$timeout(() => {
					this.showPrompt = true;
					this.showDevicePrompt();
				});
			}, this.promptDelay);
		};

		// Public method for initializing the Timeslot prompt
		public showDevicePrompt() {
			// If first time prompt is shown
			if (this.firstTimeAppearance) {
				// If prompt has been manually triggered by user before initial timeout has finished
				if (!this.timeslotIsReadyToInit) {

					clearTimeout(this.promptTimeout);
					this.timeslotIsReadyToInit = true;
				}
				else {
					// Animate prompt into view
					snabbt(this.animationElement, {
						fromPosition: [0, (this.$window.innerHeight + 200), 0],
						position: [0, 0, 0],
						duration: this.animationSpeeds.slow,
						easing: (t) => {
							return 1 - Math.pow(1 - t, 3);
						},
						complete: () => {
							// Remove the inline css transform from the element (causes blurry text)
							this.animationElement.addClass(this.promptClassnames.initialAnimationDone);
						}
					});
				}

				this.firstTimeAppearance = false;
			}
		}

		// Public method for initializing the Timeslot prompt
		public hidePrompt() {
			snabbt(this.animationElement, {
				fromOpacity: 1,
				opacity: 0,
				duration: this.animationSpeeds.fast,
				complete: () => {

					this.$scope.$applyAsync(() => {
						this.timeslotStateService.setPromptState(PromptStates.Hidden);
						this.promptHidden = true;
					});

				}
			});
		}

		// Prompt click (only when delivery zone is accepted)
		public promptClick() {

			// If Delivery Zone not Accepted, open check address step
			if (!this.timeslotService.deliveryZoneAccepted) {
				this.timeslotStateService.setTimeslotState(TimeslotStates.DeliveryZone);
			} else {
				this.timeslotService.openTimeslotSelector();
			}
		}


		// INIT
		$onInit() {
			// DOM Element
			this.animationElement = this.$element.children(this.elementClass);

			// WATCHERS
			// ==================================

			this.$scope.$watch(() => {
				return this.timeslotService.activeTimeslot;
			}, () => {
				this.timeslotId = this.timeslotService.activeTimeslot.id;

				// Update statusbutton text with currensly active timeslot text
				this.$timeout(() => {
					this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime;

					if (this.timeslotService.activeTimeslot !== undefined && this.timeslotService.activeTimeslot !== null) {
						// Set new delivery time in status button (does not exist yet, see updateTimeslot() in timeslotService)
						this.formattedDeliveryTime = this.timeslotService.activeTimeslot.formattedDeliveryTime;
					}
				});
			}, true);

			// Watch for service init boolean changes
			this.$scope.$watch(() => {
				return this.timeslotService.timeslotIsReadyToInit;
			}, (timeslotIsReadyToInit) => {
				this.timeslotIsReadyToInit = timeslotIsReadyToInit;

				if (this.timeslotIsReadyToInit && this.cookieSet) {
					// Map local variables to timeslot service variables
					this.deliveryZoneAccepted = this.timeslotService.deliveryZoneAccepted;
					this.activeTimeslot = this.timeslotService.activeTimeslot;

					if (!this.timeslotService.timeslotIsSelected) {
						this.promptHidden = false;
						this.timeoutPrompt();
					} else {
						this.promptHidden = true;
					}
				}
			});

			this.$scope.$watch(() => {
				return this.cookieWarningService.cookieSet;
			}, (newVal) => {
				this.cookieSet = newVal;

				if (this.timeslotIsReadyToInit && this.cookieSet) {
					// Map local variables to timeslot service variables
					this.deliveryZoneAccepted = this.timeslotService.deliveryZoneAccepted;
					this.activeTimeslot = this.timeslotService.activeTimeslot;

					if (!this.timeslotService.timeslotIsSelected) {
						this.promptHidden = false;
						this.timeoutPrompt();
					} else {
						this.promptHidden = true;
					}
				}
			});

			// Watch for changes in the deliveryZone accepted to set the correct content in prompt
			this.$scope.$watch(() => {
				return this.timeslotService.timeslotIsSelected;
			}, (isSelected) => {
				if (isSelected) {
					this.deliveryZoneAccepted = true;
					this.promptHidden = true;
				} else {
					this.promptHidden = false;
				}
			});

			this.$scope.$watch(() => {
				return this.timeslotService.deliveryZoneAccepted;
			}, (deliveryZoneAccepted) => {
				this.deliveryZoneAccepted = deliveryZoneAccepted;
			});
		}

	}

	class TimeslotDevicePromptComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = TimeslotDevicePromptController;
			this.template = HtmlTemplates.timeslot.device.prompt.html;
		}
	}

	angular.module(moduleId).component("timeslotDevicePrompt", new TimeslotDevicePromptComponent());


}
