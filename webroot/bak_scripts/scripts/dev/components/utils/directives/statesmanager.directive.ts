///<reference path="../../../../references/references.ts"/>

/**
 * States View Directive
 * This directive listens to changes in the states.service.ts, and applies the corresponding classes to body (or any other element it is attached to)
 * 
 * TTH on 11/06/16.
 */

namespace UtilsModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class StatesManager implements ng.IDirective {
		public restrict: string;
		public scope: Boolean;
		public link: any;

		constructor(
			private statesService: StatesService,
			private $rootScope: ng.IRootScopeService) {

			this.restrict = "A";
			this.scope = true;
			this.link = (scope, element) => {
				// Class names to apply to DOM
				let classNames: any = {
					mobileNavigationVisible		: "mobile-navigation_visible",
					mobileNavigationHidden		: "mobile-navigation_hidden",
					nonFastTrackMode			: "non-fast-track-mode",

					filterOverlayVisible		: "filter-overlay_visible",
					filterOverlayHidden 		: "filter-overlay_hidden",

					deliverytimeSelectorVisible	: "deliverytime-selector-visible",
					deliverytimePromptInit		: "deliverytime-prompt-init",
					deliverytimePromptVisible	: "deliverytime-prompt-visible",
					deliverytimePromptHidden	: "deliverytime-prompt-hidden",

					deviceDeliverytimeCheckZipCodeActive			: "device-deliverytime-check-zipcode-flow-active",
					deviceDeliverytimePartialZipcodeFlowActive		: "device-deliverytime-partial-zipcode-flow-active",
					deviceDeliverytimeNoZipcodeFlowActive			: "device-deliverytime-no-zipcode-flow-active",
					deviceDeliverytimeSelectorActive				: "device-deliverytime-selector-active",

					touch						: "touch",
					leftmenu					: "leftmenu",
					noScroll					: "no-scroll",
					productPage					: "product-page",
					searchActive				: "search-active",
					minibasketVisible			: "minibasket-visible",
					dialogOpen					: "dialog-open",
					dialogScroll				: "dialog-scroll",
					dialogFullscreenMobile		: "dialog-fullscreen-mobile",
					showingSearch				: "showing-search"
				};

				let statesServiceStates = statesService.states;
				
				// Watch statesService getStates method, and then trigger the correct classes
				scope.$watch(() => {
					return statesService.getStates();
				}, () => {
					// Mobile navigation states
					if (statesServiceStates.mobileNavigation) {
						element.removeClass(classNames.mobileNavigationHidden).addClass(classNames.mobileNavigationVisible);
					} else {
						element.removeClass(classNames.mobileNavigationVisible).addClass(classNames.mobileNavigationHidden);
					}
					if (statesServiceStates.nonFastTrackMode) {
						element.addClass(classNames.nonFastTrackMode);
					} else {
						element.removeClass(classNames.nonFastTrackMode);
					}

					// Filter overlay states
					if (statesServiceStates.filterVisible) {
						element.removeClass(classNames.filterOverlayHidden).addClass(classNames.filterOverlayVisible);
					} else {
						element.removeClass(classNames.filterOverlayVisible).addClass(classNames.filterOverlayHidden);
					}

					// Touch
					if (statesServiceStates.touch) {
						element.addClass(classNames.touch);
					} else {
						element.removeClass(classNames.touch);
					}

					// Left menu
					if (statesServiceStates.leftmenu) {
						element.addClass(classNames.leftmenu);
					} else {
						element.removeClass(classNames.leftmenu);
					}

					// No Scroll
					if (statesServiceStates.noScroll) {
						element.addClass(classNames.noScroll);
					} else {
						element.removeClass(classNames.noScroll);
					}

					// Product page
					if (statesServiceStates.productPage) {
						element.addClass(classNames.productPage);
					} else {
						element.removeClass(classNames.productPage);
					}

					// Search Active
					if (statesServiceStates.searchActive) {
						element.addClass(classNames.searchActive);
					} else {
						element.removeClass(classNames.searchActive);
					}

					// Minibasket Visible
					if (statesServiceStates.minibasketVisible) {
						element.addClass(classNames.minibasketVisible);
					} else {
						element.removeClass(classNames.minibasketVisible);
					}

					// Delivery time selector
					if (statesServiceStates.deliverytimeSelectorVisible) {
						element.addClass(classNames.deliverytimeSelectorVisible);
					} else {
						element.removeClass(classNames.deliverytimeSelectorVisible);
					}

					// Delivery time prompt Init
					if (statesServiceStates.deliverytimePromptInit) {
						element.addClass(classNames.deliverytimePromptInit);
					} else {
						element.removeClass(classNames.deliverytimePromptInit);
					}
					
					// Delivery time prompt Visible
					if (statesServiceStates.deliverytimePromptVisible) {
						element.addClass(classNames.deliverytimePromptVisible);
					} else {
						element.removeClass(classNames.deliverytimePromptVisible);
					}

					// Delivery time prompt Hidden
					if (statesServiceStates.deliverytimePromptHidden) {
						element.addClass(classNames.deliverytimePromptHidden);
					} else {
						element.removeClass(classNames.deliverytimePromptHidden);
					}


					// Delivery time device specific
					if (statesServiceStates.deviceDeliverytimeSelectorActive) {
						element.addClass(classNames.deviceDeliverytimeSelectorActive);
					} else {
						element.removeClass(classNames.deviceDeliverytimeSelectorActive);
					}
					if (statesServiceStates.deviceDeliverytimeCheckZipCodeActive) {
						element.addClass(classNames.deviceDeliverytimeCheckZipCodeActive);
					} else {
						element.removeClass(classNames.deviceDeliverytimeCheckZipCodeActive);
					}
					if (statesServiceStates.deviceDeliverytimePartialZipcodeFlowActive) {
						element.addClass(classNames.deviceDeliverytimePartialZipcodeFlowActive);
					} else {
						element.removeClass(classNames.deviceDeliverytimePartialZipcodeFlowActive);
					}
					if (statesServiceStates.deviceDeliverytimeNoZipcodeFlowActive) {
						element.addClass(classNames.deviceDeliverytimeNoZipcodeFlowActive);
					} else {
						element.removeClass(classNames.deviceDeliverytimeNoZipcodeFlowActive);
					}

					// Dialog open
					if (statesService.states.dialogOpen) {
						element.addClass(classNames.dialogOpen);
					} else {
						element.removeClass(classNames.dialogOpen);
					}

					// Dialog scroll
					if (statesService.states.dialogScroll) {
						element.addClass(classNames.dialogScroll);
					} else {
						element.removeClass(classNames.dialogScroll);
					}

					// Dialog fullscreen mobile
					if (statesService.states.dialogFullscreenMobile) {
						element.addClass(classNames.dialogFullscreenMobile);
					} else {
						element.removeClass(classNames.dialogFullscreenMobile);
					}

					// Showing Search
					if (statesService.states.showingSearch) {
						element.addClass(classNames.showingSearch);
					} else {
						element.removeClass(classNames.showingSearch);
					}
					
				}, true);
			};
		}
	}

	angular.module(moduleId).directive("statesManager", DirectiveHelperService.factory(StatesManager));

}
