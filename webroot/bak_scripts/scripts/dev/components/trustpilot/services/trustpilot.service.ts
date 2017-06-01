///<reference path="../../../../references/references.ts"/>

namespace TrustpilotModule {
	export class TrustpilotService {
		private apiUrl: string = 'https://api.trustpilot.com/v1/';
		private apiKey: string = '0w9ID99BMsyAWxTde3u0FAIRTeXp1dNr';
		private businessUnit: string = '4c086c3100006400050d32f7';

		public data = {};

		constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $locale) {
			this.get();
		}

		public get() {
			this.$http.get(this.apiUrl + 'business-units/' + this.businessUnit + '?apikey=' + this.apiKey, { responseType: 'json' })
				.then((response: any) => {
					this.data['stars'] = response.data.stars;
					this.data['trustscore'] = response.data.trustScore;
					this.data['reviews'] = response.data.numberOfReviews.total;

					this.$http.get(this.apiUrl + 'resources/strings/stars/' + response.data.stars + '?locale=' + this.$locale.id + '&apikey=' + this.apiKey, { responseType: 'json' })
						.then((response: any) => {
							this.data['label'] = response.data.string;
						});
				});
		}
	}

	angular.module(moduleId).service("trustpilotService", TrustpilotService);
}