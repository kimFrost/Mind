///<reference path="../../../../references/references.ts"/>

namespace AccordionModule {
	class AccordionController {
		public isOpen: boolean;
		public init: Function;
		public accordionGroup: any;
		public disabled: boolean;
		public toggleDisabled: boolean = false;
		public isFromId: boolean = false;

		$onInit() {
			if (this.isOpen) {
				this.open();
			} else {
				this.isOpen = false;
			}

			if (this.accordionGroup) {
				this.accordionGroup.init(this);
			}
		}

		public toggle = () => {
			if (!this.isFromId) {
				if (this.toggleDisabled) {
					if (!this.isOpen) {
						this.open();
					}
				} else {
					if (this.isOpen) {
						this.close();
					} else {
						this.open();
					}
				}
			}
		};

		public open = () => {
			this.isOpen = true;

			if (this.accordionGroup) {
				this.accordionGroup.change({ isOpen: true, controller: this });
			}
		};

		public close = () => {
			this.isOpen = false;

			if (this.accordionGroup) {
				this.accordionGroup.change({ isOpen: false, controller: this });
			}
		};

		public disable = (value: boolean) => {
			this.disabled = value;
		};

		public disableToggle = () => {
			this.toggleDisabled = true;
		};

		public setFromId = () => {
			this.isFromId = true;
		};
	}

	class AccordionComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;
		public transclude: any;
		public require: Object;

		constructor() {
			this.bindings = {
				isOpen: '<'
			};

			this.require = {
				accordionGroup: '?^^accordionGroup'
			};

			this.transclude = {
				toggle: 'toggle',
				content: 'content'
			};
			this.controller = AccordionController;
			this.template = HtmlTemplates.accordion.html;
		}
	}

	angular.module(moduleId).component("accordion", new AccordionComponent());
}