///<reference path="../../../../references/references.ts"/>

/**
 * Created by Kim Frost on 01/09/16.
 */


namespace MyNemligModule {

	export class AccountHistoryService {

		constructor(private $q:ng.IQService,
					private $http:ng.IHttpService) {

		}

		public getAccountHistory = (skip:number = 0):ng.IPromise<any> => {
			let defer = this.$q.defer();
			this.$http({method: 'GET', url: '/webapi/login/' + 'GetNemligAccountHistory?skip=' + skip}).then((response)=> {
				defer.resolve(response.data);
			}, (response) => {
				defer.reject(response.data);
			});
			return defer.promise;
		};

	}


	angular.module(moduleId).service("accountHistoryService", AccountHistoryService);
}
