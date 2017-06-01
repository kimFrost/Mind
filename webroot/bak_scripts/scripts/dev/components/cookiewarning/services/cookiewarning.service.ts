/// <reference path="../../../../references/references.ts" />

namespace CookieWarningModule {
	export class CookieWarningService {
		private key = "cookieAccept";
		private acceptedValue = "accepted";

		public cookieSet = (this.ipCookie(this.key) && !this.xamarinService.xamarinEnabled()) || this.xamarinService.xamarinEnabled();

		constructor(private $window,
					private ipCookie: IIpCookie,
					private xamarinService: XamarinModule.XamarinService) {
		}

		public acceptCookie() {
			this.ipCookie(this.key, this.acceptedValue, { domain: this.$window.location.hostname, expires: 365 });
			this.cookieSet = true;
		}
	}

	angular.module(moduleId).service("cookieWarningService", CookieWarningService);
}