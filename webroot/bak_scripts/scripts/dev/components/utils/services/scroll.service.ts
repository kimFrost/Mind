/// <reference path="../../../../references/references.ts" />

namespace UtilsModule {
	export class ScrollService {
		constructor(private $q: ng.IQService,
					private $window: ng.IWindowService,
					private responsiveService: UtilsModule.ResponsiveService) {
			
		}

		public scrollToElement(element, duration?: number, easing?: string): ng.IPromise<any> {
			return this.animateScroll(this.getYPosition(element), duration, easing);
		}

		public scrollToId(id: string, duration?: number, easing?: string): ng.IPromise<any> {
			return this.animateScroll(this.getYPosition(document.getElementById(id)), duration, easing);
		}

		public scrollToY(y: number, duration?: number, easing?: string): ng.IPromise<any> {
			return this.animateScroll(y, duration, easing);
		}

		public scrollToTop(duration?: number, easing?: string): ng.IPromise<any> {
			return this.animateScroll(0, duration, easing);
		}

		public scrollToFirstInputValidationError(duration?: number, easing?: string): ng.IPromise<any> {
			return this.animateScroll(this.getYPosition(document.querySelectorAll("input.ng-invalid")[0]), duration, easing);
		}

		public scrollToFirstInputValidationErrorInForm(form, duration?: number, easing?: string): ng.IPromise<any> {
			return this.animateScroll(this.getYPosition(document.querySelectorAll(`form[name="${form.$name}"] input.ng-invalid`)[0]), duration, easing);
		}

		private animateScroll(y: number, duration: number = 500, easing: string = "easeOut") {
			const defer = this.$q.defer();
			const emptyEle = document.createElement("div");
			emptyEle.style.display = "none";
			document.body.appendChild(emptyEle);

			const headerHeight = document.getElementsByTagName("header")[0].clientHeight;
			const margin = this.responsiveService.responsiveState.breakpointNumber > UtilsModule.Breakpoints.Medium ? 20 : 10;
			
			let scrollToPosition = y - (headerHeight + margin);
			scrollToPosition = scrollToPosition >= 0 ? scrollToPosition : 0;
			const startPos = this.$window.pageYOffset;
			const between = scrollToPosition - startPos;

			snabbt(emptyEle, {
				position: [scrollToPosition, 0, 0],
				fromPosition: [startPos, 0, 0],
				duration: duration,
				easing: easing,
				update: (delta) => {
					this.$window.scrollTo(0, (between * delta) + startPos);
				},
				complete: () => {
					emptyEle.parentElement.removeChild(emptyEle);
					defer.resolve();
				}
			});

			return defer.promise;
		}

		private getYPosition(element) {
			let yPosition = 0;

			while (element) {
				yPosition += element.offsetTop;
				element = element.offsetParent;
			}

			return yPosition;
		}
	}

	angular.module(moduleId).service("scrollService", ScrollService);
}
