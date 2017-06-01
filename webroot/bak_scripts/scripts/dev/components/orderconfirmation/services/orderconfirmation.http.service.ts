///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 09/11/2016.
 */

namespace OrderConfirmationModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	const ORDER_API_PATH = '/webapi/Order/';

	export class OrderConfirmationHttpService {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService,
			private translationsService: TranslationsService){

			this.translations = translationsService.translations;
		}


		/**
		 * @author MKI
		 * @description Get information about Order confirmation summary could not be loaded but order is still placed
		 * @returns {IPromise<T>}
		 */
		public getOrderSummary(orderId: string = '0', uniqueId: string = '0', basketId: string = '0'):ng.IPromise<any> {
			let defer = this.$q.defer();

			let settings = {
				method: 'GET',
				url: ORDER_API_PATH + `GetOrderSummary?orderNumber=${orderId}&uniqueId=${uniqueId}&basketId=${basketId}`,
				headers: {
					"Ignore500": "true"
				}
			};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((err) => {
					this.$log.log(err);
					defer.reject(err);
				});
			return defer.promise;
		}


		/**
		 * @author MKI
		 * @description Get information about Order confirmation summary could not be loaded but order is still placed
		 * @returns {IPromise<T>}
		 */
		public orderConfirmationSummaryFailed():ng.IPromise<any> {
			let defer = this.$q.defer();

			let settings = {
				method: 'GET',
				url: ORDER_API_PATH + 'GetOrderConfirmationFailedInformation',
				headers: {
					"Ignore500": "true"
				}
			};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((err) => {
					this.$log.log(err);
					defer.reject();
				});
			return defer.promise;
		}

	}

	angular.module(moduleId).service("orderConfirmationHttpService", OrderConfirmationHttpService);
}
