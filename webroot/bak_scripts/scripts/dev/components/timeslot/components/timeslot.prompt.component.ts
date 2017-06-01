///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	class TimeslotPromptController {

		public promptClassnames: any = {
			initialAnimationDone: 'initial-animation-done',
			unclickable: 'disabled-hidden'
		};

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public deliveryZoneStatus: number = 0;
		public deliveryZoneAccepted: boolean = false;
		private promptDelay: number = 5000;
		private promptTimeout; // Timeout placeholder
		public activeTimeslot: any;
		public promptState: PromptStates;
		public promptInputValue: string = "";
		public inputValidLength: boolean = false;

		// Animation
		private animationSpeeds: any = {
			fast: 250,
			medium: 500,
			slow: 1500
		};

		// UI variables
		private animationElement; // DOM element reference for the propmpt
		private elementClass: string = '.timeslot-prompt';

		public timeslotIsReadyToInit: boolean = false;
		public firstTimeAppearance: boolean = true;
		public promptDisabled: boolean = false; // Disable user interaction on prompt
		public promptHidden: boolean = false;
		public promptLoading: boolean = false;
		

		constructor(private $element,
					private $timeout,
					private $scope: ng.IScope,
					private $rootScope: ng.IRootScopeService,
					private timeslotStateService:TimeslotStateService,
					private timeslotService: TimeslotService,
					translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

			// DOM Element
			this.animationElement = this.$element.children(this.elementClass);

			// Set initial state for prompt
			// This is so we can manually trigger the prompt without the wait
			this.timeslotStateService.setPromptState(PromptStates.Initial);


			// STATES
			// ==================================


			// If API returns error
			this.$rootScope.$on('addPostCode_FAIL', () => {
				this.promptDisabled = false;
				this.promptLoading = false;
			});
			

			// Watch for service init boolean changes
			$scope.$watch(() => {
				return this.timeslotService.timeslotIsReadyToInit;
			}, (timeslotIsReadyToInit) => {

				if (timeslotIsReadyToInit) {

					// Map local variables to timeslot service variables
					this.deliveryZoneAccepted = this.timeslotService.deliveryZoneAccepted;
					this.activeTimeslot = this.timeslotService.activeTimeslot;

					// If timeslot is selected, we hide the prompt
					if (this.timeslotService.timeslotIsSelected) {

						this.timeslotStateService.setPromptState(PromptStates.Hidden);
					}

					else if (this.deliveryZoneAccepted) {

						this.deliveryZoneAccepted = true;
						this.timeslotStateService.setPromptState(PromptStates.Visible);
					}

					// If no timeslot is selected yet, we init the prompt
					else {
						// Intialize the timeout countdown to show the prompt, IF the timeslot is not already selected
						this.timeoutPrompt();
					}
				}
			});


			$scope.$watch(() => {
				return this.timeslotService.deliveryZoneAccepted;
			}, (deliveryZoneAccepted) => {

				// Update active timeslot to make sure we always know what next possible delivery is
				if (deliveryZoneAccepted) {
					this.activeTimeslot = this.timeslotService.activeTimeslot;					
				}

				// If deliveryZoneAccepted and the timeslot selector is not about to open
				// This prevents the prompt to change its contents to showing next possible delivery, when fading out after user input zip in prompt
				if (deliveryZoneAccepted && this.timeslotStateService.selectorState === SelectorStates.Inactive) {
					this.deliveryZoneAccepted = true;
				}

				else if (this.timeslotService.deliveryZoneStatus === DeliveryZoneStates.None) {
					this.deliveryZoneAccepted = false;
					this.promptInputValue = "";
					this.activeTimeslot = {};
				}
				

			});


			// Watch for changes in the deliveryZone accepted to set the correct content in prompt
			$scope.$watch(() => {
				return this.timeslotService.timeslotIsSelected;
			}, (isSelected) => {

				if (isSelected) {
					this.deliveryZoneAccepted = true;
					this.timeslotStateService.setPromptState(PromptStates.Hidden);
				}

			});

			// Watch for prompState changes in timeslotStateService
			$scope.$watch(() => {
				return this.timeslotStateService.promptState;
			}, (state) => {
				this.promptState = state;

				// If prompt state is "Visible", we show the prompt
				if (state === PromptStates.Visible) {
					this.promptDisabled = false;
					this.promptHidden = false;
					this.showPrompt();
				}

				else if (state === PromptStates.Hidden) {
					this.promptDisabled = true;
					this.promptHidden = true;
				}
			});

			// Watch for timeslotState changes in timeslotStateService
			$scope.$watch(() => {
				return this.timeslotStateService.selectorState;
			}, (state) => {
				
				// If prompt state is "Visible", we show the prompt
				if (state === SelectorStates.Active) {
					this.hidePrompt();
				}
			});

		}


		// METHODS
		// ==================================

		// Sets timout to the prompt
		private timeoutPrompt() {

			// If no time is selected, promt visitor to pick time
			this.promptTimeout = setTimeout(() => {

				this.$timeout(() => {
					this.timeslotIsReadyToInit = true;
					this.showPrompt();
				});

			}, this.promptDelay);

		};


		private focusInputField() {
			if (this.$element[0].getElementsByClassName('prompt__input')[0]) {
				this.$element[0].getElementsByClassName('prompt__input')[0].focus();
			}
		}


		// Public method for initializing the Timeslot prompt
		public showPrompt() {

			// If first time prompt is shown
			if (this.firstTimeAppearance) {

				// If prompt has been manually triggered by user before initial timeout has finished
				if (!this.timeslotIsReadyToInit) {

					clearTimeout(this.promptTimeout);
					this.timeslotIsReadyToInit = true;

					snabbt(this.animationElement, {
						position: [0, 0, 0],
						fromOpacity: 0,
						opacity: 1,
						duration: this.animationSpeeds.fast,
						complete: () => {
							this.focusInputField();
						}
					});
				}

				else {

					snabbt(this.animationElement, {
						fromPosition: [0, -200, 0],
						position: [0, 0, 0],
						duration: this.animationSpeeds.slow,
						easing: (t) => {
							var p = 0.5;
							return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
						},
						complete: () => {
							// Remove the inline css transform from the element (causes blurry text)
							this.animationElement.addClass(this.promptClassnames.initialAnimationDone);
						}
					});
				}

				this.firstTimeAppearance = false;

			} else {
				
				snabbt(this.animationElement, {
					position: [0, 0, 0],
					fromOpacity: 0,
					opacity: 1,
					duration: this.animationSpeeds.fast,
					complete: () => {
						if (this.$element[0].getElementsByClassName('prompt__input')[0]) {
							this.$element[0].getElementsByClassName('prompt__input')[0].focus();
						}
					}
				});
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
					});
					
				}
			});
		}



		// Prompt click (only when delivery zone is accepted)
		public promptClick() {

			this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
			this.timeslotStateService.setSelectorState(SelectorStates.Active);
		}


		// Validate prompt input
		// Check if input is valid
		// Then see if the zip returns valid delivery, and open the delivery time selector
		public validatePromptInput(event) {

			let inputString;
			let	key;

			if (this.promptInputValue === null) {
				return;
			} else {
				inputString = this.promptInputValue.toString();

				if (inputString.length === 3 || inputString.length === 4) {
					key = event.which || event.keyCode;
					this.inputValidLength = true;

					// Check if enter, if not, abort
					if (key.toString() === '13') {
						this.promptDisabled = true;
						this.promptLoading = true;

						this.timeslotService.addPostCode(inputString)
							.then(() => {
								this.hidePrompt();
								this.promptLoading = false;

								if (this.timeslotService.deliveryZoneAccepted) {
									this.timeslotService.openTimeslotSelector();
								}
							});
					}
				} else {
					this.inputValidLength = false;
				}
			}			
		};

		public submitButtonClick() {
			let inputString;

			if (this.promptInputValue === null) {
				return;
			} else {
				inputString = this.promptInputValue.toString();
			}

			if (inputString.length === 3 || inputString.length === 4) {
				this.promptDisabled = true;
				this.promptLoading = true;
				this.inputValidLength = true;

				this.timeslotService.addPostCode(inputString).then(() => {
					this.hidePrompt();
					this.promptLoading = false;

					if (this.timeslotService.deliveryZoneAccepted) {
						this.timeslotService.openTimeslotSelector();
					}
				});
			} else {
				this.inputValidLength = false;
			}
		}
	}

	class TimeslotPromptComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				
			};
			this.controller = TimeslotPromptController;
			this.template = HtmlTemplates.timeslot.prompt.html;
		}
	}

	angular.module(moduleId).component("timeslotPrompt", new TimeslotPromptComponent());


}
