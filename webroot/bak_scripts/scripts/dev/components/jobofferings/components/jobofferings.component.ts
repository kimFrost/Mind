/**
 * Created by MST on 19-09-2016.
 */
///<reference path="../../../../references/references.ts"/>

namespace JobOfferingsModule {

	type Translations = SCommerce.Core.Dictionary.Translations;

	class JobOfferingsController {
		
		public translations:Translations;
		public loginUrl:string="";
		public createUserUrl:string = "";
		public jobs:Array<any> = new Array<any>();

		constructor(private jobService:JobService,
					private translationsService:TranslationsModule.TranslationsService) {

			this.translations = translationsService.translations;

			this.loginUrl = jobService.loginUrl;
			this.createUserUrl = jobService.createUserUrl;

			this.jobService.getJobOfferings().then( (jobs) => {

				this.jobs = jobs;

			});


		}
	}

	class JobOfferingsComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = JobOfferingsController;
			this.template = HtmlTemplates.jobofferings.html;
		}
	}

	angular.module(moduleId).component("jobofferings", new JobOfferingsComponent());

}
