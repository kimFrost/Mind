///<reference path="../../../../references/references.ts"/>

namespace CampaignModule {
	class CampaignSplashController {
		public campaign:any;
		public discountItem:any;
		public translations:any;

		public discountItemText:string;
		public badgeText:string;
		public badgeText2:string;

		constructor(private $element,
					private translationsService:TranslationsModule.TranslationsService,
					private numberFilter:ng.IFilterNumber) {

			$element.addClass('campaign');

			this.translations = translationsService.translations;

		}

	}

	class CampaignSplashComponent implements ng.IComponentOptions {
		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				campaign: '<',
				discountItem: '<'
			};
			this.controller = CampaignSplashController;
			this.template = HtmlTemplates.campaign.splash.html;
		}
	}

	angular.module(moduleId).component("campaignSplash", new CampaignSplashComponent());
}
