///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace UserModule {


	const LOGIN_API_PATH = '/webapi/Login/';

	export class LoginHTTPService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService) {
		}


		/**
		 * @author MKI
		 * @description Login User
		 * @param userLoginData
		 * @returns {IPromise<T>}
		 */
		public login(userLoginData):ng.IPromise<any> {
			let defer = this.$q.defer();

			let defaultData = {
				Username: '',
				Password: '',
				AutoLogin: false,
				CheckForExistingProducts: true,
				DoMerge: true
			};

			let data = angular.extend({}, defaultData, userLoginData);

			const LOGIN_SETTINGS = {
				method: 'POST',
				url: LOGIN_API_PATH + "login",
				data: data

			} as ng.IRequestConfig;

			this.$http(LOGIN_SETTINGS)
				.then((response) => {
					defer.resolve(response.data);
				})
				.catch((error) => {
					this.$log.log('Login failed ' + error.data);
					defer.reject(error);
			});

			return defer.promise;
		}



		/**
		 * @author MKI
		 * @description Make Http call to request an new activation email
		 * @returns {IPromise<T>}
		 */
		public resendActivationEmail(ActivationId:string = ''):ng.IPromise<any>{
			let defer = this.$q.defer();

			const settings = {
				method: 'POST',
				url: LOGIN_API_PATH + 'SendActivationEmail',
				data: { ActivationId },
				headers: {
					"Ignore500": "true"
				}
			} as ng.IRequestConfig;

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data); })
				.catch((error) => {
					this.$log.log('could not request a new activation email ' + error.data);
					defer.reject(error.data.ErrorMessage);
				});
			return defer.promise;
		}

	}

	angular.module(moduleId).service("loginHTTPService", LoginHTTPService);
}
