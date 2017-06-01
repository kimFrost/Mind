///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 10-11-2016.
 */

namespace CheckoutModule {

	const CHECKOUT_ORDER_API_PATH = '/webapi/Order/';

	export class MergeOrdersHttpService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService) {

		}


		/**
		 * @author MKI
		 * @description Merge two order
		 * @param OrderId
		 * @param UseDeliveryTime
		 * @returns {IPromise<T>}
		 */
		public mergeOrders(OrderId:Number, UseDeliveryTime:boolean = true){
			let defer = this.$q.defer();

			let settings = {
				method: 'POST',
				url: CHECKOUT_ORDER_API_PATH + 'MergeOrder',
				data: {OrderId, UseDeliveryTime}
			};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);}
				).catch((err) => {

					let status = err.statusText;
					let errorMessage = err.data.ErrorMessage;
					let description = err.data.DeveloperMessage;

					this.$log.log(`Could not merge orders: ${status}: ${errorMessage}: ${description}`);
					defer.reject(errorMessage);}
				);

			return defer.promise;
		}
	}

	angular.module(moduleId).service("mergeOrdersHttpService", MergeOrdersHttpService);
}