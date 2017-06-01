///<reference path="../../../../../references/references.ts"/>


namespace WelcomeSpotModule {

	export class WelcomeSpotService {

		constructor(private $q:ng.IQService,
					private $http:ng.IHttpService) {

		}

		public getLatestOrderHistory = ():ng.IPromise<any> => {
			let defer = this.$q.defer();
			this.$http({method: 'GET', url: '/webapi/order/' + 'GetLatestOrderHistiory'}).then((response)=> {
				defer.resolve(response.data);
			}, (response) => {
				defer.reject(response.data);
			});
			return defer.promise;
		};

	}

	angular.module(moduleId).service("welcomeSpotService", WelcomeSpotService);
}
