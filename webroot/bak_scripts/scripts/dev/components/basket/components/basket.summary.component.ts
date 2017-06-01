///<reference path="../../../../references/references.ts"/>

namespace BasketModule {
	class BasketSummaryController {
		constructor(public translationsService: TranslationsModule.TranslationsService,
			public basketService: BasketService,
			private dialogService: DialogModule.DialogService) {

		}

		public showBagsModal() {
			let dialogObj = {
				content: `<div>${this.translationsService.translations.Basket.Summary.BagsModalBody}</div>`,
				close: true,
				size: 'medium'
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj);
		}
	}

	class BasketSummaryComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = BasketSummaryController;
			this.template = HtmlTemplates.basket.summary.html;
		}
	}

	angular.module(moduleId).component("basketSummary", new BasketSummaryComponent());
}
