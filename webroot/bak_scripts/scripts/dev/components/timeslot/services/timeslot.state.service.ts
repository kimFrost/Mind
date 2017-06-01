/**
 * Created by mikkel on 25/08/16.
 *
 * The keeper of component states.
 *
 * The idea is to have all components that need to know about each others states,
 * communicate through here, by setting states, and then the other components can
 * watch for a change in a specific components state.
 *
 * This way we only have to worry about setting a state in each component, and let
 * the other components, that are affected from a given state change, handle it themselves.
 */

namespace TimeslotModule {

	type DialogService = DialogModule.DialogService;

	export enum TimeslotStates {
		Inactive = 0,
		DeliveryZone = 1,
		TimeslotSelector = 2,
		ConfirmBasketChanges = 3,
		AddToWaitlist = 4
	}

	export enum SelectorStates {
		Inactive = 0,
		Active = 1
	}

	export enum PromptStates {
		Initial = 0,
		Hidden = 1,
		Visible = 2
	}

	export enum StatusButtonStates {
		DeliveryZoneUnknown = 0,
		DeliveryZoneKnown = 1,
		TimeslotSelectorActive = 2,
		TimeslotSelected = 3
	}

	// States for the device flow laoder, because there are so many different components and different flows to keep track of in the device flow
	// This does not affect the desktop view
	export enum DeviceFlowLoaderStates {
		Active = 0,
		Inactive = 1
	}

	export enum DeviceFlowStates {
		Show = 0,
		Hide = 1
	}

	export class TimeslotStateService {

		// General states
		public timeslotState: TimeslotStates = TimeslotStates.Inactive;

		// Selector states
		public selectorState: SelectorStates;

		// Prompt state
		public promptState: PromptStates;

		// StatusButton/basketbutton state
		public statusButtonState: StatusButtonStates = StatusButtonStates.DeliveryZoneUnknown;


		// Device Flow
		public deviceFlowState: DeviceFlowStates = DeviceFlowStates.Hide;
		public deviceFlowLoaderState: DeviceFlowLoaderStates = DeviceFlowLoaderStates.Inactive;

		constructor(private dialogService: DialogService,
			private timeslotDialogService: TimeslotDialogService) {
		}


		// STATES MANAGMENT
		// ======================================

		// Set timeslot state
		public setTimeslotState(state: TimeslotStates) {
			this.timeslotState = state;

			if (this.timeslotState === TimeslotStates.Inactive) {
				this.setSelectorState(SelectorStates.Inactive);
			}
			else if (this.timeslotState === TimeslotStates.DeliveryZone) {
				this.setSelectorState(SelectorStates.Inactive);

				// If on desktop
				if (window.innerWidth >= UtilsModule.Breakpoints.Large) {
					this.timeslotDialogService.initCheckAddress();
				}
			}
			else if (this.timeslotState === TimeslotStates.ConfirmBasketChanges) {

				if (window.innerWidth >= UtilsModule.Breakpoints.Large) {
					this.timeslotDialogService.initConfirmBasketChanges();
				}

			}
			else if (this.timeslotState === TimeslotStates.AddToWaitlist) {

				if (window.innerWidth >= UtilsModule.Breakpoints.Large) {
					this.timeslotDialogService.initNoDelivery();
				}
			}
		}


		// Set Selector state
		public setSelectorState(state: SelectorStates) {
			this.selectorState = state;
		}

		// Set Prompt state
		public setPromptState(state: PromptStates) {
			this.promptState = state;
		}

		// Set Statusbutton state
		public setStatusbuttonState(state: StatusButtonStates) {
			this.statusButtonState = state;
		}

		public initCheckAddress(postalCode:number = 0, initiateFlow:boolean = true) {
			this.timeslotState = TimeslotStates.DeliveryZone;
			this.setSelectorState(SelectorStates.Inactive);
			this.timeslotDialogService.initCheckAddress(postalCode, initiateFlow);
		}

		public initClosesSoon(minutes:number = 20) {
			this.timeslotDialogService.timeslotClosesSoon(minutes);
		}


		public setDeviceFlowState(state: DeviceFlowStates) {
			this.deviceFlowState = state;
		}
		
		public setDeviceFlowLoaderState(state: DeviceFlowLoaderStates) {
			this.deviceFlowLoaderState = state;
		}
	}


	angular.module(moduleId).service("timeslotStateService", TimeslotStateService);
}
