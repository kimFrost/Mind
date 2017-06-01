///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 16-12-2016.
 */

namespace PaymentModule {

	type CreditCard = PaymentInterfaces.ICreditCardModel;
	const CHECKOUT_API_PATH = '/webapi/Checkout/';

	export class PaymentHttpService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService) {}


		/**
		 * @author MKI
		 * @description Remove Credit card
		 * @param card
		 * @returns {IPromise<T>}
		 */
		public removeCreditCard(card: CreditCard):ng.IPromise<CreditCard[]> {
			let defer = this.$q.defer();
			const CARD_ID = card.CardId;

			const settings = {
					method: 'GET',
					url: CHECKOUT_API_PATH + 'RemoveCreditCard?cardId=' + CARD_ID,
				};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((error) => {
					defer.reject(error);
				});
			return defer.promise;
		}


		/**
		 * @author MKI
		 * @description Make Card default
		 * @param card
		 * @returns {IPromise<T>}
		 */
		public makeCardDefault(card: CreditCard):ng.IPromise<CreditCard[]> {
			let defer = this.$q.defer();
			const CARD_ID = card.CardId;

			const settings = {
				method: 'GET',
				url: CHECKOUT_API_PATH + 'MakeCardDefault?cardId=' + CARD_ID,
			};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((error) => {
					defer.reject(error);
				});
			return defer.promise;
		}


		/**
		 * @author MKI
		 * @description Get Credit Cards
		 * @returns {IPromise<T>}
		 */
		public getCards():ng.IPromise<CreditCard[]> {
			let defer = this.$q.defer();

			const settings = {
				method: 'GET',
				url: CHECKOUT_API_PATH + 'GetCreditCards'
			};

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data);})
				.catch((error) => {
					defer.reject(error);
				});
			return defer.promise;
		}
	}

	angular.module(moduleId).service("paymentHttpService", PaymentHttpService);
}
