///<reference path="../../../../references/references.ts"/>

namespace NewsletterModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	class ActivateSubscriptionController {

		public currentTranslation;

		constructor(private translationsService: TranslationsService) {
			this.currentTranslation = translationsService.translations.Newsletter.NewsletterActivateState;

		}
	}

	class ActivateSubscriptionComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {};
			this.controller = ActivateSubscriptionController;
			this.template = HtmlTemplates.activatesubscription.html;
		}
	}

	angular.module(moduleId).component("activateSubscription", new ActivateSubscriptionComponent());
} 
