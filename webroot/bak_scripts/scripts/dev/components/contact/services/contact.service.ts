/// <reference path="../../../../references/references.ts" />

namespace ContactModule {
	import SettingsService = PageModule.SettingsService;
	export class ContactService {
		public contactInfo: any;

		constructor(private $http: ng.IHttpService,
			private settingsService: SettingsService) {
			this.get();
		}

		private get() {
			this.$http.get(`/webapi/${this.settingsService.settings.SitecorePublishedStamp}/Information/GetContact`)
				.then((response) => {
					this.contactInfo = response.data;
				});
		}
	}

	angular.module(moduleId).service("contactService", ContactService);
}