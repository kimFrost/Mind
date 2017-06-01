///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace BasketModule {

	//const CHECKOUT_API_PATH = '/webapi/Checkout/';

	export class BasketHttpService {

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private $log:ng.ILogService) {}

		
	}

	angular.module(moduleId).service("basketHttpService", BasketHttpService);
}