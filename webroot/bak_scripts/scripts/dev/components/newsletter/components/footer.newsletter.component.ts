///<reference path="../../../../references/references.ts"/>

namespace NewsletterModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	class FooterNewsletterController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public emailRegexPattern: any;
		public email:string;

		constructor(private translationsService: TranslationsService,
					private regexApiService: UtilsModule.RegexApiService,
					private newsletterDialogService:NewsletterDialogService) {

			this.translations = translationsService.translations;
			this.emailRegexPattern = regexApiService.API().email;
		}

		public subscribe() {
			this.newsletterDialogService.openNewsletterDialog(this.email);
		}

	}

	class FooterNewsletterComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
			};
			this.controller = FooterNewsletterController;
			this.template = HtmlTemplates.footer.newsletter.html;
		}
	}

	angular.module(moduleId).component("footerNewsletter", new FooterNewsletterComponent());
} 
