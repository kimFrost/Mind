///<reference path="../../../../references/references.ts"/>

namespace CampaignModule {
	class CampaignTextController {
		public campaign:any;
		public translations:any;

		public discountText:string;

		constructor(private translationsService:TranslationsModule.TranslationsService) {

			this.translations = translationsService.translations;

		}

	}

	class CampaignTextComponent implements ng.IComponentOptions {
		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				campaign: '<'
			};
			this.controller = CampaignTextController;
			this.template = HtmlTemplates.campaign.text.html;
		}
	}

	angular.module(moduleId).component("campaignText", new CampaignTextComponent());
}
