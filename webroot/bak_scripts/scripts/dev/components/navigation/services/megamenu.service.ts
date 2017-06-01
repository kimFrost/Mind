///<reference path="../../../../references/references.ts"/>

namespace NavigationModule {
	export class MegaMenuService {
		public activeLevel = 0;
		public activeId: any = null;
		public activeAd: any = null;

		constructor(private $window: ng.IWindowService, private $rootScope: ng.IRootScopeService, private $q, responsiveService: UtilsModule.ResponsiveService) {
			$rootScope.$watch(() => {
				return this.activeId;
			}, (newVal) => {
				if (responsiveService.isTouch && newVal !== null) {
					this.closeMegaMenuOnClickOutside();
				}
				else {
					angular.element(document).off('touchstart');
				}
			});
		}

		private closeMegaMenuOnClickOutside = () => {
			angular.element(document).on('touchstart', (e) => {
				this.isPartOfMegaMenu(e.target).then((response) => {
					if (!response) {
						this.activeId = null;
						this.activeLevel = 0;
					}
				});
			});
		};

		private isPartOfMegaMenu = (element, defer?) => {
			if (!defer) {
				var defer = this.$q.defer();
			}

			if (element.parentElement === null) {
				defer.resolve(false);
			}
			else if (element.parentElement.tagName === 'MEGA-MENU') {
				defer.resolve(true);
			}
			else {
				this.isPartOfMegaMenu(element.parentElement, defer);
			}

			return defer.promise;
		};
	}

	angular.module(moduleId).service("megaMenuService", MegaMenuService);
}