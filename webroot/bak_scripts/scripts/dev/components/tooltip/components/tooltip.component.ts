///<reference path="../../../../references/references.ts"/>


namespace TooltipModule {

	class TooltipController {

		public tooltipMsg:string;
		public tooltipShow:boolean;
		public tooltipAlt:boolean;

		constructor() {
			
		}

	}

	class TooltipComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				tooltipShow: "<",
				tooltipMsg: "<",
				tooltipAlt: "<"
			};
			this.controller = TooltipController;
			this.template = HtmlTemplates.tooltip.html;
		}
	}

	angular.module(moduleId).component("tooltip", new TooltipComponent());

}
