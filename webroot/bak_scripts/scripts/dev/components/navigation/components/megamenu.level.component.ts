///<reference path="../../../../references/references.ts"/>

namespace NavigationModule {

	class MegaMenuLevelController {
		public translations: any;
		public item: any;
		public level: number;
		public levelDepth: number;
		public activeId: string = '';
		public activeLevel: number;

		public showAllText: string;
		public showAll: boolean;
		public showAllLink: string;

		public queuedId: string = '';
		public queuedAd: Object;

		public timeout: any;

		public locked: boolean = false;

		constructor($scope: ng.IScope,
			private megaMenuService: MegaMenuService,
			private $timeout: ng.ITimeoutService,
			private responsiveService: UtilsModule.ResponsiveService,
			private translationsService: TranslationsModule.TranslationsService) {

			this.translations = translationsService.translations;

			$scope.$watch(() => {
				return megaMenuService.activeLevel;
			}, (newVal) => {
				this.activeLevel = newVal;

				if (newVal < this.level) {
					this.resetActive();
				}
			});
		}

		$onInit() {
			if (this.showAll) {
				this.createShowAll();
			}
		}

		private createShowAll() {
			this.item.push({ Url: this.showAllLink, IsMegaMenuItem: true, Text: this.showAllText, IsShowAll: true });
		}

		private setActive = (childId: string, advertisement: Object) => {
			this.activeId = childId;
			this.megaMenuService.activeAd = advertisement;
		};

		private resetActive = () => {
			this.activeId = '';
			this.queuedId = '';
		};

		public mouseCloseMegaMenu = () => {
			if (!this.responsiveService.isTouch) {
				this.activeId = '';
				this.queuedId = '';
				this.megaMenuService.activeLevel = 0;
				this.megaMenuService.activeId = null;
			}
		};

		public setActiveLevel = () => {
			if (!this.responsiveService.isTouch) {
				this.megaMenuService.activeLevel = this.level;
			}
		};

		public mouseSetActive = (childId: string, advertisement: Object) => {
			if (!this.responsiveService.isTouch) {
				if (!this.locked) {
					this.setActive(childId, advertisement);
				}
				else {
					this.queuedId = childId;
					this.queuedAd = advertisement;
				}
			}
		};

		public mouseOnBlur = ($event) => {
			if (!this.responsiveService.isTouch && this.level < this.levelDepth) {
				if ($event.offsetX > $event.target.clientWidth / 5 * 3) {
					this.$timeout.cancel(this.timeout);
					this.locked = true;

					this.timeout = this.$timeout(() => {
						this.locked = false;

						if (this.level === this.activeLevel) {
							this.setActive(this.queuedId, this.queuedAd);
						}
					}, 300);
				}
			}
		};

		public mouseResetActive = () => {
			if (!this.responsiveService.isTouch) {
				this.resetActive();
			}
		};

		public touchSetActive = (childId: string, hasChildren: number, $event, advertisement: Object) => {
			if (this.responsiveService.isTouch) {
				this.$timeout.cancel(this.timeout);

				if (hasChildren > 0 && this.activeId !== childId) {
					$event.preventDefault();
				}
				else {
					this.timeout = this.$timeout(() => {
						this.resetActive();
						this.megaMenuService.activeId = null;
						this.megaMenuService.activeLevel = 0;
					}, 1000);
				}

				this.setActive(childId, advertisement);
				this.megaMenuService.activeLevel = this.level;
			}
		};
	}

	class MegaMenuLevelComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				item: '<',
				level: '<',
				levelDepth: '<',
				showAllText: '<',
				showAll: '<',
				showAllLink: '<'
			};
			this.controller = MegaMenuLevelController;
			this.template = HtmlTemplates.megamenu.level.html;
		}
	}

	angular.module(moduleId).component("megaMenuLevel", new MegaMenuLevelComponent());
} 