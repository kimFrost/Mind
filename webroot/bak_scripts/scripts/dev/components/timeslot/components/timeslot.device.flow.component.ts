///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	

	export enum DeviceFlowSteps {
		AddZipcode,
		CheckAddress,
		TimeslotSelection,
		TimeslotSelected,
		NoDelivery,
		BasketChanges
	}

	class TimeslotDeviceFlowController {

		private translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public deviceFlowActive: boolean = false;
		public deviceFlowStep: DeviceFlowSteps;
		private animationElement; // DOM element reference for the prompt
		private backgroundImageUrl: string;

		// Components ready variables
		public timeslotSelectorReadyToShow = false;
		public showLoader: boolean = true;
		public showCloseButton: boolean = true;
		public backToAddPostCode: boolean = false;
		public backToTimeslotSelector: boolean = false;

		// Animation
		private animationSpeeds: any = {
			fast: 250,
			medium: 500,
			slow: 1500
		};

		constructor(private $element,
			private $window: ng.IWindowService,
			private $timeout: ng.ITimeoutService,
			private $scope: ng.IScope,
			private $rootScope: ng.IRootScopeService,
			private statesService: UtilsModule.StatesService,
			private timeslotStateService: TimeslotStateService,
			private timeslotService: TimeslotService,
			private settingsService: PageModule.SettingsService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

			// Set initial state for prompt
			// This is so we can manually trigger the prompt without the wait
			this.timeslotStateService.setPromptState(PromptStates.Initial);

			// Get and set background image from sitecore
			this.backgroundImageUrl = this.settingsService.settings !== null ? this.settingsService.settings.TimeslotBackgroundImage.Url : "";
		}


		// METHODS
		// ==================================

		public setDeviceFlowState(state) {

			if (state === 'inactive') {
				this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
			}
		}


		// Method triggered by watcher on the timeslot state in timeslot state service
		public hideDeviceFlow() {

			// Animation
			snabbt(this.animationElement, {
				fromOpacity: 1,
				opacity: 0,
				duration: this.animationSpeeds.fast,
				complete: () => {
					this.$timeout(() => {
						// Cancel all components
						this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
						this.deviceFlowActive = false;
					});
				}
			});

			this.statesService.setState("noScroll", false);		
		}

		public showDeviceFlow() {

			this.showLoader = true;

			// If already active, do not animate in again
			if (this.deviceFlowActive) {
				return;
			}

			this.deviceFlowActive = true;

			if (this.deviceFlowStep === DeviceFlowSteps.AddZipcode) {
				this.showLoader = false;
			}

			if (window.innerWidth < UtilsModule.Breakpoints.Large) {
				this.statesService.setState("noScroll", true);
			}

			snabbt(this.animationElement, {
				fromOpacity: 0,
				opacity: 1,
				duration: this.animationSpeeds.fast
			});
		}

		public gotoAddPostCodeStep() {
			this.timeslotStateService.setTimeslotState(TimeslotStates.DeliveryZone);
			this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
			this.backToAddPostCode = false;
			this.backToTimeslotSelector = false;

			this.$scope.$broadcast('checkAddressStartStep');
		}

		public gotoTimeslotSelectorStep() {
			this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
			this.timeslotStateService.setSelectorState(SelectorStates.Active);
			this.backToTimeslotSelector = false;
			this.backToAddPostCode = false;
		}

		// INIT
		$onInit() {

			// DOM Element
			this.animationElement = this.$element.children('.timeslot-device-flow');

			// Activate back to check address step
			this.$scope.$on('previousStepCheckAddress', () => {
				this.backToAddPostCode = true;
				this.backToTimeslotSelector = false;
			});

			// Activate back to timeslot selector
			this.$scope.$on('previousStepTimeselector', () => {
				this.backToTimeslotSelector = true;
				this.backToAddPostCode = false;
			});

			this.$scope.$on('timeslotUpdate_SUCCESS', () => {
				this.hideDeviceFlow();
			});

			// this.$scope.$on('timeslotUpdate_FAIL', () => {
			// 	this.showLoader = false;
			// });


			// Basket changes were rejected, go back to timeslot selector
			this.$rootScope.$on('basketChanges_REJECTED', () => {
				this.showLoader = false;
				this.deviceFlowStep = DeviceFlowSteps.TimeslotSelection;
			});

			this.$rootScope.$on('basketChanges_ACCEPTED', () => {
				this.showLoader = false;
				this.deviceFlowStep = DeviceFlowSteps.TimeslotSelected;
			});

			// If user rejects basket changes dialogue
			// this.$rootScope.$on('basketChanges_REJECTED', () => {
			// 	this.showLoader = false;
			// });

			this.$rootScope.$on('addPostCode_FAIL', () => {
				this.showLoader = false;
			});

			this.$rootScope.$on('addDeliveryAddress_FAIL', () => {
				this.showLoader = false;
			});

			// If timeslot update fails
			this.$rootScope.$on('timeslotUpdate_FAIL', () => {
				this.showLoader = false;
			});

			// If getting delivery days fails
			this.$rootScope.$on('getDeliveryDays_FAIL', () => {
				this.showLoader = false;
			});


			// Allow for manually triggering the device flow loader
			this.$rootScope.$on('deviceflowLoader_SHOW', () => {
				this.showLoader = true;
			});

			this.$rootScope.$on('deviceflowLoader_HIDE', () => {
				this.showLoader = false;
			});

			// WATCHERS
			// ==================================

			// Watch Device flow loader state
			this.$scope.$watch(() => {
				return this.timeslotStateService.deviceFlowLoaderState;
			}, (state) => {
				if (state === DeviceFlowLoaderStates.Active) {
					this.showLoader = true;
				} else {
					this.showLoader = false;
				}
			});

			// Watch DeliveryDays objec tin service to know when we have delivery days
			this.$scope.$watch(() => {
				return this.timeslotService.deliveryDaysReady;
			}, (bool) => {

				if (bool) {
					this.timeslotSelectorReadyToShow = true;
					this.showLoader = false;
				}
			});

			// Watch timeslot status, can only be set once
			this.$scope.$watch(() => {
				return this.timeslotService.timeslotIsSelected;
			}, (timeslotIsSelected) => {

				if (timeslotIsSelected) {
					this.hideDeviceFlow();
				}

			});

			// Watch device flow state change
			this.$scope.$watch(() => {
				return this.timeslotStateService.deviceFlowState;
			}, (state) => {

				if (state === DeviceFlowStates.Hide) {
					this.hideDeviceFlow();
				} else {
					this.showDeviceFlow();
				}
			});


			// Watch global TimeslotState
			this.$scope.$watch(() => {
				return this.timeslotStateService.timeslotState;
			}, (state) => {

				if (state === TimeslotStates.Inactive) {
					this.hideDeviceFlow();
				} else {
					this.showDeviceFlow();
					this.showCloseButton = true;
				}

				if (state === TimeslotStates.DeliveryZone) {
					// Show the Zipcode input step
					this.deviceFlowStep = DeviceFlowSteps.AddZipcode;
					this.showLoader = false;
				}

				// Show timeslot selector step
				else if (state === TimeslotStates.TimeslotSelector) {
					this.deviceFlowStep = DeviceFlowSteps.TimeslotSelection;
					this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
				}

					// Show basket changes dialogue
				else if (state === TimeslotStates.ConfirmBasketChanges) {
					this.deviceFlowStep = DeviceFlowSteps.BasketChanges;
					this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
					this.showCloseButton = false;
				}

				// Show no delivery dialogue
				else if (state === TimeslotStates.AddToWaitlist) {
					this.deviceFlowStep = DeviceFlowSteps.NoDelivery;
					this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
					this.backToAddPostCode = true;
				}
				
			});
		}

	}

	class TimeslotDeviceFlowComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {

			};
			this.controller = TimeslotDeviceFlowController;
			this.template = HtmlTemplates.timeslot.device.flow.html;
		}
	}

	angular.module(moduleId).component("timeslotDeviceFlow", new TimeslotDeviceFlowComponent());


}
