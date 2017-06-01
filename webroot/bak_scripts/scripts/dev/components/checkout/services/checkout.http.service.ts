///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace CheckoutModule {

	const CHECKOUT_ORDER_API_PATH = '/webapi/Order/';
	const CHECKOUT_API_PATH = '/webapi/Checkout/';

	export class CheckoutHttpService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService) {}


		/**
		 * @author MKI
		 * @description show log if error status is other then 400
		 * @param error
		 * @returns {any}
		 */
		private _notifyDeveloper(error) {

			if(error.status !== 400){
				this.$log.log(error);
			}
			return error;
		}


		/**
		 * @author MKI
		 * @description Get payment cards
		 * @returns {IPromise<T>}
		 */
		public getPaymentCards():ng.IPromise<any> {
			let defer = this.$q.defer();

			 const settings = {
				method: 'GET',
				url: CHECKOUT_API_PATH + 'GetCreditCards'};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);}
				).catch((err) => {
					this._notifyDeveloper(err);
					defer.reject('Could not get payment cards');});

			return defer.promise;
		}


		/**
		 * @author MKI
		 * @description Get information about Giro payment
		 * @returns {IPromise<T>}
		 */
		public getPaymentProviderFailedInformation():ng.IPromise<any> {
			let defer = this.$q.defer();

			const settings = {
				method: 'GET',
				url: CHECKOUT_API_PATH + 'GetOneTimeGiroInfo'};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((error) => {
					this._notifyDeveloper(error);
					defer.reject('Could´t not get Payment failed Information ');
			});
			return defer.promise;
		}



		/**
		 * @author MKI
		 * @description placing order for LoggedIn Users
		 * @param data
		 * @returns {IPromise<T>}
		 */
		public placeOrderLoggedIn(data):ng.IPromise<any>{
			let defer = this.$q.defer();

			const settings = {
				method: 'POST',
				url: CHECKOUT_ORDER_API_PATH + 'PlaceOrderLoggedIn',
				data: data};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((error) => {
					this._notifyDeveloper(error);
					defer.reject(error);
				});
			return defer.promise;
		}


		/**
		 * @author MKI
		 * @description Places order for anonymous user
		 * @param data
		 * @returns {IPromise<T>}
		 */
		public placeOrderNotLoggedIn(data):ng.IPromise<any>{
			let defer = this.$q.defer();

			const settings = {
				method: 'POST',
				url: CHECKOUT_ORDER_API_PATH + 'PlaceOrderNotLoggedIn',
				data: data};

			this.$http(settings)
				.then((response)=> {
					defer.resolve(response.data);})
				.catch((error) => {
					this._notifyDeveloper(error);
					defer.reject(error);
			});
			return defer.promise;
		}

	}

	angular.module(moduleId).service("checkoutHttpService", CheckoutHttpService);
}
