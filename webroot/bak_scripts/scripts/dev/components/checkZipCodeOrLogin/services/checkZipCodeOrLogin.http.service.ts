///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace CheckZipCodeOrLoginModule {


	const LOGIN_API_PATH = '/webapi/Delivery/';

	export class CheckZipCodeOrLoginHTTPService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService) {
		}

		/**
		 * @author MKI
		 * @description Make Http request to check if postcode is valid for delivery
		 * @returns {IPromise<T>}
		 */
		public checkPostCode(postCode:string = ''):ng.IPromise<any>{
			let defer = this.$q.defer();

			const settings = {
				method: 'POST',
				url: LOGIN_API_PATH + 'CheckPostCode',
				data: { postCode }
			} as ng.IRequestConfig;

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data); })
				.catch((error) => {
					this.$log.log('could not validate postcode ' + error.data);
					defer.reject(error.data.ErrorMessage);
				});
			return defer.promise;
		}

	}

	angular.module(moduleId).service("checkZipCodeOrLoginHTTPService", CheckZipCodeOrLoginHTTPService);
}
