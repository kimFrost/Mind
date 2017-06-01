///<reference path="../../../../references/references.ts"/>

namespace AccordionModule {
	import DirectiveHelperService = Global.DirectiveHelperService;

	class AccordionGroupController {
		public mobile: boolean;
		public tablet: boolean;
		public desktop: boolean;
		public activeBreakpoints: Array<string> = [];
		public disabled: boolean;
		public closeOthers: boolean;
		public disableToggle: boolean;
		public fromId: number;
		public isFromId: boolean;

		public accordionArray: Array<any> = [];

		constructor($scope: ng.IScope, responsiveService: UtilsModule.ResponsiveService) {
			this.mobile ? this.activeBreakpoints.push('mobile') : this.mobile = false;
			this.tablet ? this.activeBreakpoints.push('tablet') : this.tablet = false;
			this.desktop ? this.activeBreakpoints.push('desktop') : this.desktop = false;
			this.closeOthers = this.closeOthers ? this.closeOthers : false;
			this.disableToggle = this.disableToggle ? this.disableToggle : false;
			this.isFromId = this.fromId !== undefined;

			if (this.activeBreakpoints.length !== 0) {
				$scope.$watch(() => {
					return responsiveService.responsiveState.device;
				}, (newVal) => {
					if (this.activeBreakpoints.indexOf(newVal) !== -1) {
						this.disabled = false;
						this.disableAll(this.disabled);
					} else {
						this.disabled = true;
						this.disableAll(this.disabled);
					}
				});
			}

			if (this.isFromId) {
				$scope.$watch(() => {
					return this.fromId;
				}, (newVal, oldVal) => {
					if (newVal !== oldVal) {
						this.accordionArray[oldVal].close();
						this.accordionArray[newVal].open();
					}
				});
			}
		}

		public init = (accordion) => {
			this.accordionArray.push(accordion);

			if (this.disabled) {
				accordion.disable(this.disabled);
			}

			if (this.disableToggle) {
				accordion.disableToggle();
			}

			if (this.isFromId) {
				accordion.setFromId();

				this.accordionArray[this.fromId].open();
			}
		};

		public change = (change) => {
			if (this.closeOthers && change.isOpen === true) {
				this.accordionArray.filter((item) => item !== change.controller).forEach((item) => item.close());
			}
		};

		public disableAll = (value: boolean) => {
			this.accordionArray.forEach((item) => {
				item.disable(value);
			});
		};
	}

	class AccordionGroupComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;
		public transclude: boolean;
		public bindToController: Object;
		public restrict: string;
		public controllerAs: string;

		constructor() {
			this.restrict = 'E';

			this.bindToController = {
				mobile: '<',
				tablet: '<',
				desktop: '<',
				closeOthers: '<',
				disableToggle: '<',
				fromId: '<'
			};
			this.transclude = true;
			this.controllerAs = '$accordionCtrl';
			this.controller = AccordionGroupController;
			this.template = '<div ng-transclude></div>';

		}
	}

	angular.module(moduleId).directive("accordionGroup", DirectiveHelperService.factory(AccordionGroupComponent));
}