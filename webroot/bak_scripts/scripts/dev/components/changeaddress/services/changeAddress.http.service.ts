///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace ChangeAddressModule {

	const CHECKOUT_API_PATH = '/webapi/Login/';

	export class ChangeAddressHTTPService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService
		) {}

		///// Private /////

		//Display log when API service fails
		private notifyDeveloper(error) {
			if(error.status === 400){
				this.$log.log(error.statusText +': '+error.data.ErrorMessage);
			}
		}

		//// Public /////

		// Change default delivery address "FAST TRACK"
		public ChangeDeliveryAddress(data){
			let defer = this.$q.defer();

			this.$http({
					method: 'POST',
					url: CHECKOUT_API_PATH + 'UpdateUserDeliveryAddress',
					data: data
				}
			).then((response)=> {
				defer.resolve(response.data);
			}, (error) => {
				this.notifyDeveloper(error);
				defer.reject(error.data.ErrorMessage);
			});
			return defer.promise;
		}

	}

	angular.module(moduleId).service("changeAddressHTTPService", ChangeAddressHTTPService);
}