///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 09/11/2016.
 */

namespace CreditCardFeeModule {
	export type FeeGroupViewModel = SCommerce.Website.Code.WebAPI.Models.Payment.FeeGroupViewModel;

	type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;
	type TranslationsService = TranslationsModule.TranslationsService;

	const CHECKOUT_API_PATH = '/webapi/Checkout/';

	export class CardFeeHttpService {

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
		 * @description Get CreditCard Fee groups, to get Fee percentage for different cards
		 * @returns {IPromise<T>}
		 * @constructor
		 */
		public getFeeGroups():ng.IPromise<FeeGroupViewModel> {
			let defer = this.$q.defer();

			this.$http({
				method: 'GET',
				url: CHECKOUT_API_PATH + 'GetFeeGroups'}
			).then((response)=> {
				defer.resolve(response.data);
			}, (err) => {
				this.$log.log('Could not add credit card fee to basket ' + err);
				defer.reject('Could not get credit card fee´s groups');
			});
			return defer.promise;
		}


		/**
		 * @author MKI
		 * @description Add CreditCard fee to basket
		 * @param feeGroupId
		 * @returns {IPromise<T>}
		 * @constructor
		 */
		public addFee(feeGroupId:string):ng.IPromise<BasketViewModel> {
			let defer = this.$q.defer();

			this.$http({
				method: 'POST',
				url: CHECKOUT_API_PATH + 'AddFee',
				data: {feeGroupId}
				}
			).then((response)=> {
				defer.resolve(response.data);
			}, (err) => {
				this.$log.log('Could not add credit card fee to basket ' + err);
				defer.reject('Could not add credit card fee to basket');
			});
			return defer.promise;
		}


	}

	angular.module(moduleId).service("creditCardFeeHttpService", CardFeeHttpService);
}
