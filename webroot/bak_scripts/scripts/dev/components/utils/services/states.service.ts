///<reference path="../../../../references/references.ts"/>

/**
 * This service keeps track on global states, i.e. if mobile navigation is visible etc
 * Call the setState() method, from a directive or other, with a key and bool value corresponding to a key and value in the states object
 * Example: StatesService.setState(mobileNavigation, true);
 *
 * TTH on 11-06-2016.
 */

namespace UtilsModule {

	export class StatesService {
		// States object, states that are available in the application
		public states = {
			mobileNavigation: false,
			filterVisible: false,
			touch: false,
			leftmenu: false,
			noScroll: false,
			productPage: false,
			searchActive: false,
			minibasketVisible: false,
			showingSearch: false,
			nonFastTrackMode: false,
			dialogScroll: false,
			dialogFullscreenMobile: false,

			// Deliverytime
			deliverytimeSelectorVisible: false,
			deliverytimePromptInit: false,
			deliverytimePromptVisible: false,
			deliverytimePromptHidden: false,
			dialogOpen: false,
			deviceDeliverytimeSelectorActive: false,
			deviceDeliverytimeCheckZipCodeActive: false,
			deviceDeliverytimePartialZipcodeFlowActive: false,
			deviceDeliverytimeNoZipcodeFlowActive: false
		};

		constructor(private $rootScope: ng.IRootScopeService) {

		}

		// Toggle
		public toggleState(identifier) {
			this.states[identifier] = !this.states[identifier];
		}

		// Overwrite
		public setState(identifier, newstate: boolean) {
			if (this.states[identifier] === newstate) {
				return;
			}
			this.states[identifier] = newstate;
			this.$rootScope.$applyAsync();
		}

		// Get states
		public getStates() {
			return this.states;
		}

		/*
		 * Disable mouse scroll/touch and scrolling with specific keys
		 */
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		private keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

		private preventDefault(e) {
			e = e || window.event;
			if (e.preventDefault) {
				e.preventDefault();
				e.returnValue = false;
			}
		}

		private preventDefaultForScrollKeys(e) {
			if (this.keys[e.keyCode]) {
				this.preventDefault(e);
				return false;
			}
		}

		// Disable scroll / touch
		public disableWindowScroll() {
			if (window.addEventListener) { // older FF
				window.addEventListener('DOMMouseScroll', this.preventDefault, false);
			}
			window.onwheel = this.preventDefault; // modern standard
			window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
			window.ontouchmove = this.preventDefault; // mobile
			document.onkeydown = this.preventDefaultForScrollKeys;
		}

		// Enable scroll / touch
		public enableWindowScroll() {
			if (window.removeEventListener) {
				window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
			}
			window.onmousewheel = document.onmousewheel = null;
			window.onwheel = null;
			window.ontouchmove = null;
			document.onkeydown = null;
		}
	}

	angular.module(moduleId).service("statesService", StatesService);
}
