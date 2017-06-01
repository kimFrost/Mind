///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 20-12-2016.
 */

namespace CheckoutModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	const WEB_API_PATH = '/webapi/checkout/';

	export class ReturnOfBottlesHttpService {

		private translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService,
			private translationsService: TranslationsService) {
			this.translations = translationsService.translations;
		}

		/**
		 * @author MKI
		 * @description Make HTTP request to get information about the return of bottle policy
		 * @returns {IPromise<T>}
		 * @private
		 */
		public getReturnOfBottlesInformation(){
			let defer = this.$q.defer();

			let settings = {
				method: 'GET',
				url: WEB_API_PATH + 'GetReturnBottlesInfo',
				headers: {
					'Ignore500': 'true'
				}
			} as ng.IRequestConfig;

			this.$http(settings)
				.then((response) => {
					defer.resolve(response.data); })
				.catch((err) => {
					this.$log.log("Could not make HTTP request to get Return of Bottles information: ", err);

					const errorMessageToUser = this.translations.Checkout.ReturnBottles.ReturnBottlesInformationFailedToLoad;
					defer.reject(`<div>${errorMessageToUser}</div>`);
				});
			return defer.promise;
		}
	}

	angular.module(moduleId).service("returnOfBottlesHttpService", ReturnOfBottlesHttpService);
}
