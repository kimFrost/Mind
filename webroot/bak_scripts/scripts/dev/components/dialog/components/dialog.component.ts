///<reference path="../../../../references/references.ts"/>

namespace DialogModule {
	class DialogController {
		public active: boolean = false;
		public buttonCount: number;

		private dialogEle = angular.element(this.$element[0].getElementsByClassName("dialog")[0]);
		private dialogModalEle = angular.element(this.$element[0].getElementsByClassName("dialog__modal")[0]);
		private dialogContentEle = angular.element(this.$element[0].getElementsByClassName("dialog__content")[0]);

		private previousScrollPosition = {position: 0, type: null};
		private bodyEle = document.getElementsByTagName("body")[0];
		private htmlEle = document.getElementsByTagName("html")[0];

		constructor(private $scope: ng.IScope,
			private $rootScope: ng.IRootScopeService,
			public dialogService: DialogService,
			private $compile: ng.ICompileService,
			private $element,
			private statesService: UtilsModule.StatesService,
			private $timeout: ng.ITimeoutService,
			private responsiveService: UtilsModule.ResponsiveService) {

			$rootScope.$on("DIALOG_OPEN", () => {
				this.open();
			});

			$rootScope.$on("DIALOG_CLOSE", () => {
				this.close();
			});

			$scope.$watch(() => {
				return responsiveService.screen;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.calculateScroll();
				}
			}, true);

			$rootScope.$on('$locationChangeSuccess', () => {
				if (this.active) {
					this.close();
				}
			});
		}

		public open() {
			if (document.activeElement.tagName === "INPUT") {
				(document.activeElement as HTMLInputElement).blur();
			}

			if (this.dialogService.dialogObj.buttons && Object.keys(this.dialogService.dialogObj.buttons).length) {
				this.buttonCount = Object.keys(this.dialogService.dialogObj.buttons).length;
			}

			this.dialogEle.removeClass("dialog_scroll").off();
			const linkFn = this.$compile(angular.element(this.dialogService.dialogObj.content));
			this.dialogContentEle.empty().append(linkFn(this.$scope));

			this.statesService.setState("dialogOpen", true);
			this.active = true;

			switch (this.dialogService.dialogObj.size) {
				case 'small':
					this.dialogModalEle.addClass("dialog__modal_small").removeClass("dialog__modal_medium").removeClass("dialog__modal_large").removeClass("dialog__modal_x-large");
					break;
				case 'medium':
					this.dialogModalEle.addClass("dialog__modal_medium").removeClass("dialog__modal_small").removeClass("dialog__modal_large").removeClass("dialog__modal_x-large");
					break;
				case 'large':
					this.dialogModalEle.addClass("dialog__modal_large").removeClass("dialog__modal_small").removeClass("dialog__modal_medium").removeClass("dialog__modal_x-large");
					break;
				case 'x-large':
					this.dialogModalEle.addClass("dialog__modal_x-large").removeClass("dialog__modal_small").removeClass("dialog__modal_medium").removeClass("dialog__modal_large");
					break;

				default:
					this.dialogModalEle.addClass("dialog__modal_medium").removeClass("dialog__modal_small").removeClass("dialog__modal_large").removeClass("dialog__modal_x-large");
					break;
			}

			if (this.dialogService.dialogObj.fullscreenMobile) {
				this.statesService.setState("dialogFullscreenMobile", true);
				
				if (this.responsiveService.responsiveState.device === 'mobile' && (this.bodyEle.scrollTop !== 0 || this.htmlEle.scrollTop !== 0)) {
					if (this.bodyEle.scrollTop !== 0) {
						this.previousScrollPosition.position = this.bodyEle.scrollTop;
						this.previousScrollPosition.type = 'body';

						this.$timeout(() => {
							this.bodyEle.scrollTop = 0;
						});
					} else {
						this.previousScrollPosition.position = this.htmlEle.scrollTop;
						this.previousScrollPosition.type = 'html';

						this.$timeout(() => {
							this.htmlEle.scrollTop = 0;
						});
					}
				}
			}

			this.$timeout(() => {
				this.calculateScroll();
			});
		}

		public close() {
			if (this.dialogService.dialogObj.fullscreenMobile && this.responsiveService.responsiveState.device === 'mobile') {
				this.resetStates();

				this.$timeout(() => {
					if (this.previousScrollPosition.type === 'body') {
						this.bodyEle.scrollTop = this.previousScrollPosition.position;
					} else {
						this.htmlEle.scrollTop = this.previousScrollPosition.position;
					}

					this.previousScrollPosition = { position: 0, type: null };
				});
				
			} else {
				this.dialogEle.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", () => {
					this.resetStates();
				});
			}

			this.active = false;
		}

		private resetStates() {
			this.dialogEle.off();

			this.statesService.setState("dialogOpen", false);
			this.statesService.setState("dialogScroll", false);
			this.$rootScope.$broadcast("DIALOG_CALLBACK", 0);
			this.dialogContentEle.empty();
			this.buttonCount = 0;

			this.$timeout(() => {
				this.statesService.setState("dialogFullscreenMobile", false);
			});
		}

		public closeOnClick(e) {
			if (this.dialogService.dialogObj.close && (angular.element(e.target).hasClass("dialog__overlay") || angular.element(e.target).hasClass("dialog__close-icon"))) {
				e.stopPropagation();
				this.close();
			}
		}

		public callBackToService(button) {
			if (button === null) {
				return;
			}

			if (button === 1) {
				if (this.dialogService.dialogObj.buttons.button1.callback) {
					this.$rootScope.$broadcast("DIALOG_CALLBACK", button);
				} else {
					this.close();
				}
			} else if (button === 2) {
				if (this.dialogService.dialogObj.buttons.button2.callback) {
					this.$rootScope.$broadcast("DIALOG_CALLBACK", button);
				} else {
					this.close();
				}
			} else if (button === 3) {
				if (this.dialogService.dialogObj.buttons.button3.callback) {
					this.$rootScope.$broadcast("DIALOG_CALLBACK", button);
				} else {
					this.close();
				}
			}
		}

		private calculateScroll() {
			if (window.innerHeight < this.dialogModalEle[0].offsetHeight) {
				this.dialogEle.addClass("dialog_scroll");
				this.statesService.setState("dialogScroll", true);
			} else {
				this.dialogEle.removeClass("dialog_scroll");
				this.statesService.setState("dialogScroll", false);
			}
		}
	}

	class DialogComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = DialogController;
			this.template = HtmlTemplates.dialog.html;
		}
	}

	angular.module(moduleId).component("dialogComponent", new DialogComponent());
}
