///<reference path="../../../../references/references.ts"/>

namespace BasketModule {
	class BasketMinimumController {
		constructor(public translationsService: TranslationsModule.TranslationsService,
					public basketService: BasketService) {
			
		}
	}

	class BasketMinimumComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = BasketMinimumController;
			this.template = HtmlTemplates.basket.minimum.html;
		}
	}

	angular.module(moduleId).component("basketMinimum", new BasketMinimumComponent());

}
