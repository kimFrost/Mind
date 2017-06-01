///<reference path="../../../../references/references.ts"/>

namespace SocialModule {
	import SettingsService = PageModule.SettingsService;
	export class SocialService {
		public socialInfo: any;

		constructor(
			private $http: ng.IHttpService,
			private settingsService: SettingsService) {
			this.get();
		}

		private get() {
			this.$http.get(`/webapi/${this.settingsService.settings.SitecorePublishedStamp}/Information/GetSocial`)
				.then((response) => {
					this.socialInfo = response.data;
				});
		}
	}

	angular.module(moduleId).service("socialService", SocialService);
}