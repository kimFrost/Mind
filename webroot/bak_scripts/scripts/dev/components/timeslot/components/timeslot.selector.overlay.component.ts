///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {


	class TimeslotSelectorOverlayController {

		public timeslotSelectorActive: boolean = false;

		constructor(private $element,
			private $window: ng.IWindowService,
			private $scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			private timeslotStateService: TimeslotStateService) {

				this.keyUp = this.keyUp.bind(this);
				this.overlayClick = this.overlayClick.bind(this);

			}


		// Overlay click handler
		public overlayClick () {
			this.$timeout(() => {
				this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
				this.timeslotStateService.setTimeslotState(TimeslotStates.Inactive);
				this.timeslotSelectorActive = false;
			});
		}

		// Handle key up
		public keyUp(e) {
			var key = e.keyCode ? e.keyCode : e.which;

			if (key === 27) {
				this.$timeout(() => {
					this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
					this.timeslotSelectorActive = false;
				});
			}
		}


		$onInit() {
			this.$scope.$watch(() => {
				return this.timeslotStateService.selectorState;
			}, (state) => {

				if (state === SelectorStates.Active) {
					this.timeslotSelectorActive = true;

					// Add keyup eventlistener
					this.$window.addEventListener('keyup', this.keyUp);

					// Add click listener
					this.$element.bind('click', this.overlayClick);
				} else {
					this.timeslotSelectorActive = false;

					// Remove keyup eventlistener
					this.$window.removeEventListener('keyup', this.keyUp);

					// Remove click listener
					this.$element.bind('click', this.overlayClick);
				}

			});

		}

		$onDestroy() {
			this.$element.unbind('click');
			this.$window.removeEventListener('keyup', this.keyUp);
		}


	}


	class TimeslotSelectorOverlayComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
			};
			this.controller = TimeslotSelectorOverlayController;
			this.template = HtmlTemplates.timeslot.selector.overlay.html;
		}
	}

	angular.module(moduleId).component("timeslotSelectorOverlay", new TimeslotSelectorOverlayComponent());


}
