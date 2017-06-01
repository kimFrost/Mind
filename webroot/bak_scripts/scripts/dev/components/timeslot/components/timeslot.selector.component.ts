///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type DialogService = DialogModule.DialogService;
	type DeliveryAddressArgs = SCommerce.Website.Code.WebAPI.Models.Delivery.DeliveryAddressregistrationViewModel;

	class TimeslotSelectorController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		// Date selector
		public maxAmountDates = this.timeslotService.maxDeliveryDarysAmount;
		public maxDatesReached: boolean = false;
		
		public deliveryDays: any; // the dates from the basket service
		public timeslotDays: any; // the dates after parsed through createDatesNavigation
		public activeDateSpanIndex: number = 0;
		public timeslotDaysDates: any;
		public showingFirstDates: boolean = true;
		public showingLastDates: boolean = false;
		private disableNavigation: boolean = false;
		public activeDateSpan: any = {
			start: '',
			end: ''
		};

		public selectedDateIndex: number = 0;
		public selectedTimeId: number;
		public formattedDeliveryTime: string;
		public deliveryZone: DeliveryAddressArgs = {} as DeliveryAddressArgs;
		public timeslotIsReadyToInit: boolean = false;
		public timeslotIsSelected: boolean = false;
		public messages: Array<any> = [];

		// DOM
		private selectorContainerElement; // DOM element reference for the selector container element
		private dateBlocksContainer; // DOM element reference for the selector dates container element
		private dateBlocksSliderWrap; // DOM element reference for the selector dates container element

		// UI variables
		public disableUi: boolean = false; // Disable user interaction on selector
		public showSelectorContent: boolean = false;
		public isActive: boolean = false; // Show timeslot selector

		// Map to keep track of how many days each breakpoint uses in the date block navigation
		public daysAmountForBreakpoints = this.timeslotService.BreakpointsForTimeslotDays;

		// Animation
		private animationSpeeds: any = {
			fast: 350,
			medium: 500,
			slow: 1500
		};

		constructor(private $element,
			private $timeout: ng.ITimeoutService,
			private $rootScope:ng.IRootScopeService,
			private $scope: ng.IScope,
			private dialogService: DialogService,
			private timeslotService: TimeslotService,
			private userService: UserModule.UserService,
			private changeAddressService: ChangeAddressModule.ChangeAddressService,
			private timeslotStateService: TimeslotStateService,
			private responsiveService: UtilsModule.ResponsiveService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

			// DOM element
			this.selectorContainerElement = this.$element[0].getElementsByClassName('timeslot-selector__container')[0];
			this.dateBlocksContainer = this.$element[0].getElementsByClassName('date-blocks-container')[0];
			this.dateBlocksSliderWrap = this.$element[0].getElementsByClassName('date-blocks-slider-wrap')[0];

			// Initial timeslot selector state
			this.timeslotStateService.setSelectorState(SelectorStates.Inactive);


			// Watchers
			// ==================================

			// If user rejects basket changes dialogue
			this.$rootScope.$on('basketChanges_REJECTED', () => {
				this.disableUi = false;

				this.rollbackTimeslotSelector();
			});

			// If timeslot update fails
			this.$rootScope.$on('timeslotUpdate_FAIL', () => {
				this.disableUi = false;

				this.rollbackTimeslotSelector();
			});

			// Active Timeslot updated listener
			this.$rootScope.$on('activeTimeslot_UPDATED', () => {
				this.selectedTimeId = this.timeslotService.activeTimeslot.id;
				this.timeslotIsSelected = this.timeslotService.timeslotIsSelected;
			});



			// When the deliverytimes are ready
			this.$rootScope.$on('getDeliveryDays_SUCCESS', () => {

				this.disableUi = false;
				this.showSelectorContent = true;

				// Find the correct selected timeslot
				this.findSelectedTimeslot();

				// Update delivery days
				this.deliveryDays = this.timeslotService.deliveryDays;
				this.timeslotDays = this.deliveryDays;
				this.messages = this.timeslotService.deliveryMessages;

				// Count the timeslots
				this.countTimeslots();

				// Show the selector and puttin all the things in their right place
				this.animateInSelectorContainer();
				this.navigateDateSpans('pronto');
				
				// Create date navigation based on which breakpoint is current
				this.createDateBlocksNavigation(this.deliveryDays, this.daysAmountForBreakpoints[this.responsiveService.responsiveState.breakpoint]);
			});

			// If getting delivery days fails
			this.$rootScope.$on('getDeliveryDays_FAIL', () => {
				this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
			});

			// Watch for service init boolean changes
			$scope.$watch(() => {
				return this.timeslotService.timeslotIsReadyToInit;
			}, (boolean) => {
				this.timeslotIsReadyToInit = boolean;

				if (this.timeslotService.basketData) {
					this.formattedDeliveryTime = this.timeslotService.basketData.FormattedDeliveryTime;
				}
			});

			// Watch for changes to the delivery zone
			$scope.$watch(() => {
				return this.timeslotService.deliveryZone;
			}, () => {

				// Reset delivery days objects
				this.deliveryDays = {};
				this.timeslotDays = {};
				this.deliveryZone = {} as DeliveryAddressArgs;

				// If deliveryZone is accepted and postal code is valid, we update the known delivery address
				if (this.timeslotService.deliveryZoneAccepted && this.timeslotService.deliveryZone.PostalCode !== 0) {
					this.deliveryZone = this.timeslotService.deliveryZone;
				}
			}, true);


			// Watch timeslot states
			$scope.$watch(() => {
				return this.timeslotStateService.selectorState;
			}, (state) => {

				// Open timeslot selector
				if (state === SelectorStates.Active) {
					this.isActive = true;
					this.disableUi = true;
					this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Active);

					// Reset the deliverydays
					this.deliveryDays = {};
					this.timeslotDays = {};

					this.showSelectorContent = false;
					this.timeslotService.openTimeslotSelector();

				} else if (state === SelectorStates.Inactive) {
					this.isActive = false;
				}
			});

			// Watch responsiveState to trigger the create navigation function
			$scope.$watch(() => {
				return this.responsiveService.responsiveState.breakpoint;
			}, (breakpoint, oldBreakpoint) => {

				if (breakpoint !== oldBreakpoint) {
					// Create the navigation for date blocks depending on the breakpoint
					this.createDateBlocksNavigation(this.deliveryDays, this.daysAmountForBreakpoints[breakpoint]);
				}
			});


			// Trigger a get delivery days and rebuild the dates navigation.
			// BUG: This is triggered twice for every time the breakpoint changes, thus calling the API twice when rebuilding the navigation
			this.$rootScope.$on('responsiveState_CHANGED', () => {

				let breakpoint = this.responsiveService.responsiveState.breakpoint;

				if (breakpoint === 'xxxsmall' || breakpoint === 'xxsmall') {

					let daysAmount = this.daysAmountForBreakpoints[this.responsiveService.responsiveState.breakpoint];

					this.$rootScope.$broadcast('deviceflowLoader_SHOW');

					// Reset the deliverydays
					this.deliveryDays = {};
					this.timeslotDays = {};

					this.disableNavigation = true;
					this.disableUi = true;

					this.timeslotService.getDeliveryDays(daysAmount).then(() => {

						// Create the navigation for date blocks depending on the breakpoint
						this.createDateBlocksNavigation(this.deliveryDays, this.daysAmountForBreakpoints[breakpoint]);

						this.disableNavigation = false;
						this.disableUi = false;
						// Update delivery days
						this.deliveryDays = this.timeslotService.deliveryDays;
						this.timeslotDays = this.deliveryDays;

						if (window.innerWidth < UtilsModule.Breakpoints.Large) {
							this.$rootScope.$broadcast('deviceflowLoader_HIDE');
						}

						this.rollbackTimeslotSelector();
					});
				}
			});

		}


		// METHODS
		// ==================================

		// Animate the content into view
		private animateInSelectorContainer(delay: number = 0) {

			snabbt(this.selectorContainerElement, {
				fromOpacity: 0,
				opacity: 1,
				delay: delay,
				duration: this.animationSpeeds.medium
			});
		}


		// If something goes wrong in updating the timeslot
		// Either basket changes, or server errors, we reset som data, and show a previously saved data
		private rollbackTimeslotSelector() {
			// If timeslot already selected prior to this, we roll back to that one
			if (this.timeslotService.timeslotIsSelected) {
				this.selectedTimeId = this.timeslotService.activeTimeslot.id;
				this.findSelectedTimeslot();
				this.navigateDateSpans('pronto');
			} else {
				// if not, we reset the timeslot selector date
				this.findSelectedTimeslot();
				this.navigateDateSpans('pronto');
				this.selectedTimeId = null;
			}	
		}


		// Set active date
		// Updates the timeslot picker with the correct chosen date
		// and the correct array of available days for chosen date
		public setActiveDate(index) {

			// If unavailable, reject selection
			if (!this.timeslotDays[index].IsAvailable) {
				return;
			}

			// Update selected index, to show the correct timeslots
			this.selectedDateIndex = index;
		}

		// Set active timeslot
		// Updates the timeslot picker with the correct chosen timeslot
		public setActiveTimeslot(timeslotItem, itemIndex) {

			// If disabled slot
			if (timeslotItem.CssClass !== null) {
				if (timeslotItem.CssClass === 'unavailable') {
					return;
				}
				if (timeslotItem.CssClass === 'soldout') {
					return;
				}
			}

			// If already selected slot
			if (timeslotItem.Id.toString() === this.selectedTimeId) {
				this.closeTimeslotSelector();
				return;
			}

			this.selectedTimeId = timeslotItem.Id;

			// Disable user interaction on selector
			this.disableUi = true;
			this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Active);

			// Update timeslot in timeslot service
			this.timeslotService.updateTimeslot(timeslotItem).then(() => {
				this.disableUi = false;
				this.timeslotStateService.setDeviceFlowLoaderState(DeviceFlowLoaderStates.Inactive);
				this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
			});
		}


		// Close the timeslot selector
		public closeTimeslotSelector() {
			// Close all dialogs that have been triggered
			this.dialogService.closeDialog();

			this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
			this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
		}

		/**
		 * Count timeslots to know precisely how many are for each part of the day.
		 * This is used for reference only, and rendering non-empty columns in the timeslot selector.
		 */
		public countTimeslots() {

			for (var i = 0; i < this.timeslotDays.length; i++) {
				let day = this.deliveryDays[i];
				day.morningHours = [];
				day.middayHours = [];
				day.eveningHours = [];

				for (var x = 0; x < day.DayHours.length; x++) {
					let time = day.DayHours[x];

					if (time.EndHour < 13) {
						day.morningHours.push(time);
					}

					if (time.StartHour > 11 && time.EndHour < 19) {
						day.middayHours.push(time);
					}

					if (time.StartHour > 17) {
						day.eveningHours.push(time);
					}
				}
			}
		}



		/**
		 * Find selected timeslot or first available date
		 *
		 * If timeslot has already been selected, we find the correct selected timeslot in the date block navigation, based on timeslot id.
		 * If No timeslot has been selected, we find the first available day
		 */
		private findSelectedTimeslot() {

			if (this.timeslotIsSelected) {
				let dates = this.timeslotDays;

				// Loop through Days and their times
				for (var i = 0; i < dates.length; i++) {
					for (var x = 0; x < dates[i].DayHours.length; x++) {

						if (this.selectedTimeId === dates[i].DayHours[x].Id.toString()) {
							// The index of the selected date
							this.selectedDateIndex = i;
						}
					}
				}
			} else {

				for (var i = 0; i < this.deliveryDays.length; i++) {
					let day = this.deliveryDays[i];

					if (day.IsAvailable) {
						this.selectedDateIndex = i;
						break;
					}
				}
			}
		}


		
		// Create data for the data block navigation
		// Called everytime the timeslot selector changes size. e.g at a breakpoint
		private createDateBlocksNavigation(dates: any, chunkSize: number) {
			// Set width on slider wrapper
			this.dateBlocksSliderWrap.style.width = this.timeslotDays.length * 100 + '%';

			let datesArray = [];

			for (var i = 0; i < dates.length; i += chunkSize) {
				datesArray.push(dates.slice(i, i + chunkSize));
			}

			this.timeslotDaysDates = datesArray;

			// Reset the date block navigation to avoid seeing halfs'n halfs
			this.findSelectedTimeslot();
			this.navigateDateSpans('pronto');
		}




		// Make sure we have the required amount of dates before navigating
		public getNextDeliveryDays() {

			if (this.disableNavigation) {
				return;
			}		

			// Prevent user from rapidly clicking the navigation arrows while component is at work
			this.disableNavigation = true;

			let daysAmount = this.daysAmountForBreakpoints[this.responsiveService.responsiveState.breakpoint];
			let getmoredates = ((this.activeDateSpanIndex+1) * daysAmount) === this.timeslotDays.length ? true : false;
			let hasAllDates = this.timeslotDays.length >= this.maxAmountDates ? true : false;

			if (getmoredates && !hasAllDates) {
				let startDate: string = this.timeslotDays[this.timeslotDays.length-1].Date;
				this.disableUi = true;

				if (window.innerWidth < UtilsModule.Breakpoints.Large) {
					this.$rootScope.$broadcast('deviceflowLoader_SHOW');
				}

				this.timeslotService.getNextDeliveryDays(startDate, daysAmount).then((response) => {

					this.$timeout(() => {

						this.createDateBlocksNavigation(this.deliveryDays, this.daysAmountForBreakpoints[this.responsiveService.responsiveState.breakpoint]);

						this.disableNavigation = false;
						this.navigateDateSpans('next');

						this.disableUi = false;
						// Update delivery days
						this.deliveryDays = this.timeslotService.deliveryDays;
						this.timeslotDays = this.deliveryDays;

						// Determine if we should be able to call the api again for more dates. Not if we have reached our maximum amount.
						if (this.timeslotDays.length >= this.maxAmountDates) {
							this.maxDatesReached = true;
						}

						if (window.innerWidth < UtilsModule.Breakpoints.Large) {
							this.$rootScope.$broadcast('deviceflowLoader_HIDE');
						}
					});
				});
			} else {
				this.disableNavigation = false;
				this.navigateDateSpans('next');
			}
		}


		
		/**
		 * @author TTH
		 * @description Navigates the date blocks, previous and next
		 */
		public navigateDateSpans(direction) {

			if (this.disableNavigation) {
				return;
			}

			let scrollDistance;
			//let scrollDistance = this.dateBlocksContainer.offsetWidth === 0 ? 446 : 446;
			let animationSpeed = this.animationSpeeds.fast;
			this.disableNavigation = true;

			// Manually setting the width of scrollDistnace because we cannot get hold on the element width when timeslot selector opens
			if (this.responsiveService.responsiveState.breakpointNumber >= UtilsModule.Breakpoints.Large) {
				scrollDistance = 446;
			} else if (this.responsiveService.responsiveState.breakpointNumber >= UtilsModule.Breakpoints.Medium) {
				scrollDistance = 436;
			} else if (this.responsiveService.responsiveState.breakpointNumber >= UtilsModule.Breakpoints.XSmall) {
				scrollDistance = 480;
			} else if (this.responsiveService.responsiveState.breakpointNumber >= UtilsModule.Breakpoints.XXSmall) {
				scrollDistance = 436;
			} else if (this.responsiveService.responsiveState.breakpointNumber >= UtilsModule.Breakpoints.XXXSmall) {
				scrollDistance = 300;
			}

			this.$timeout(() => {

				if (this.showingFirstDates && direction === 'previous') {
					return;
				}

				// If pronto, we move without animation
				// Used by timeselector watcher to show the already selected date 
				if (direction === 'pronto') {
					animationSpeed = 0;
					this.activeDateSpanIndex = Math.floor(this.selectedDateIndex / this.daysAmountForBreakpoints[this.responsiveService.responsiveState.breakpoint]);
				}

				// User interaction, previous
				else if (direction === 'previous' && this.activeDateSpanIndex !== 0) {
					this.activeDateSpanIndex--;
				}

				// User interaction, next
				else if (direction === 'next') {
					this.activeDateSpanIndex++;
				}

				// Calculate scrolling distance
				let scrollLeft = scrollDistance * this.activeDateSpanIndex;

				// Determine if first set of dates are in view
				if (this.activeDateSpanIndex === 0) {
					this.showingFirstDates = true;
				} else {
					this.showingFirstDates = false;
				}

				// Determine if last set of dates are in view
				if ((this.activeDateSpanIndex + 1) * this.daysAmountForBreakpoints[this.responsiveService.responsiveState.breakpoint] >= this.maxAmountDates) {
					this.showingLastDates = true;
				} else { 
					this.showingLastDates = false; 
				}

				// Animate the dateblocks container
				snabbt(this.dateBlocksSliderWrap, {
					position: [-scrollLeft, 0, 0],
					duration: animationSpeed,
					complete: () => {
						this.disableNavigation = false;						
					}
				});
			});
		}

		/**
		 * @author TTH
		 * @description Edit timeslot address
		 */
		public editAddress() {

			let isDesktop = this.responsiveService.responsiveState.breakpointNumber > UtilsModule.Breakpoints.Medium ? true : false;

			this.timeslotStateService.setTimeslotState(TimeslotStates.DeliveryZone);

			// Close the timeslot selector while the change address dialog is open
			if (isDesktop) {
				this.timeslotService.closeTimeslotSelector();

				if (this.userService.states.isLoggedIn) {
					this.changeAddressService.changeAddress();
				} else {
					this.$rootScope.$broadcast('previousStepTimeselector');
					this.timeslotStateService.setTimeslotState(TimeslotStates.DeliveryZone);
				}
			} else {
				this.$rootScope.$broadcast('previousStepTimeselector');
				this.timeslotStateService.setTimeslotState(TimeslotStates.DeliveryZone);
				this.timeslotStateService.setDeviceFlowState(DeviceFlowStates.Show);
			}
		}

		

	}


	class TimeslotSelectorComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				
			};
			this.controller = TimeslotSelectorController;
			this.template = HtmlTemplates.timeslot.selector.html;
		}
	}

	angular.module(moduleId).component("timeslotSelector", new TimeslotSelectorComponent());


}
