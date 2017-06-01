/// <reference path="../../../../references/references.ts" />

namespace UtilsModule {
	interface IResponsiveState {
		breakpoint: string;
		device: string;
		breakpointNumber: number;
	}

	// Breakpoints from CSS grid
	export enum Breakpoints {
		XXXSmall = 320,
		XXSmall = 480,
		XSmall = 568,
		Small = 768,
		Medium = 920,
		Large = 1025,
		XLarge = 1151,
		XXLarge = 1281,
		XXXLarge = 1350,
		Mega = 1500
	}

	export class ResponsiveService {
		public isTouch: boolean = false;

		public screen = {
			width: window.innerWidth,
			height: window.innerHeight
		};

		public responsiveState = {
			breakpoint: '',
			device: '',
			breakpointNumber: 0
		} as IResponsiveState;

		private locked: boolean = false;
		private timeout;

		constructor(private $rootScope: ng.IRootScopeService, private statesService: StatesService, private $timeout: ng.ITimeoutService) {
			this.listenTouch();
			this.listenScreenWidth();
		}

		public listenTouch() {
			if ('ontouchstart' in document.documentElement) {
				this.isTouch = true;
			}

			//Has timeout because mousemove event is triggered on touchstart. Its not possible to prevent the mousemove event therefore we lock it with a timeout
			angular.element(window).on('touchstart', () => {
				clearTimeout(this.timeout);

				this.isTouch = true;
				this.locked = true;

				this.statesService.setState("touch", true);

				this.timeout = setTimeout(() => {
					this.locked = false;
				}, 500);

			});

			angular.element(window).on('mousemove', () => {
				if (this.isTouch && !this.locked) {
					this.isTouch = false;

					this.statesService.setState("touch", false);
				}
			});

		}

		public listenScreenWidth() {
			this.setResponsiveState();

			angular.element(window).on('resize', () => {
				this.setResponsiveState();

				this.screen.width = window.innerWidth;
				this.screen.height = window.innerHeight;
				this.$rootScope.$applyAsync();
			});
		}


		// Set responsive state to breakpoint string
		private setResponsiveState() {

			if (window.innerWidth < Breakpoints.XXSmall && this.responsiveState.breakpoint !== 'xxxsmall') {
				this.responsiveState.breakpoint = 'xxxsmall';
				this.responsiveState.breakpointNumber = Breakpoints.XXXSmall;
				this.responsiveState.device = 'mobile';

				this.$rootScope.$broadcast('responsiveState_CHANGED');
			}
			else if (window.innerWidth >= Breakpoints.XXSmall && window.innerWidth < Breakpoints.XSmall && this.responsiveState.breakpoint !== 'xxsmall') {
				this.responsiveState.breakpoint = 'xxsmall';
				this.responsiveState.breakpointNumber = Breakpoints.XXSmall;
				this.responsiveState.device = 'mobile';

				this.$rootScope.$broadcast('responsiveState_CHANGED');
			}
			else if (window.innerWidth >= Breakpoints.XSmall && window.innerWidth < Breakpoints.Small && this.responsiveState.breakpoint !== 'xsmall') {
				this.responsiveState.breakpoint = 'xsmall';
				this.responsiveState.breakpointNumber = Breakpoints.XSmall;
				this.responsiveState.device = 'tablet';
			}
			else if (window.innerWidth >= Breakpoints.Small && window.innerWidth < Breakpoints.Medium && this.responsiveState.breakpoint !== 'small') {
				this.responsiveState.breakpoint = 'small';
				this.responsiveState.breakpointNumber = Breakpoints.Small;
				this.responsiveState.device = 'tablet';
			}
			else if (window.innerWidth >= Breakpoints.Medium && window.innerWidth < Breakpoints.Large && this.responsiveState.breakpoint !== 'medium') {
				this.responsiveState.breakpoint = 'medium';
				this.responsiveState.breakpointNumber = Breakpoints.Medium;
				this.responsiveState.device = 'tablet';
			}
			else if (window.innerWidth >= Breakpoints.Large && window.innerWidth < Breakpoints.XLarge && this.responsiveState.breakpoint !== 'large') {
				this.responsiveState.breakpoint = 'large';
				this.responsiveState.breakpointNumber = Breakpoints.Large;
				this.responsiveState.device = 'desktop';

				// Remove mobile navigation class to fix mosaic grid behaviour
				this.statesService.setState("mobileNavigation", false);
			}
			else if (window.innerWidth >= Breakpoints.XLarge && window.innerWidth < Breakpoints.XXLarge && this.responsiveState.breakpoint !== 'xlarge') {
				this.responsiveState.breakpoint = 'xlarge';
				this.responsiveState.breakpointNumber = Breakpoints.XLarge;
				this.responsiveState.device = 'desktop';
			}
			else if (window.innerWidth >= Breakpoints.XXLarge && window.innerWidth < Breakpoints.XXXLarge && this.responsiveState.breakpoint !== 'xxlarge') {
				this.responsiveState.breakpoint = 'xxlarge';
				this.responsiveState.breakpointNumber = Breakpoints.XXLarge;
				this.responsiveState.device = 'desktop';
			}
			else if (window.innerWidth >= Breakpoints.XXXLarge && window.innerWidth < Breakpoints.Mega && this.responsiveState.breakpoint !== 'xxxlarge') {
				this.responsiveState.breakpoint = 'xxxlarge';
				this.responsiveState.breakpointNumber = Breakpoints.XXXLarge;
				this.responsiveState.device = 'desktop';
			}
			else if (window.innerWidth >= Breakpoints.Mega && this.responsiveState.breakpoint !== 'mega') {
				this.responsiveState.breakpoint = 'mega';
				this.responsiveState.breakpointNumber = Breakpoints.Mega;
				this.responsiveState.device = 'desktop';
			}
		}
	}

	angular.module(moduleId).service("responsiveService", ResponsiveService);
}