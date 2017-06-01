/**
 * Created by MKI on 01-08-2016.
 */
///<reference path="../../../references/references.ts"/>

namespace CheckoutModule {

	export const moduleId: string = "checkoutModule";
	angular.module(moduleId, ["ngAnimate", "ngMessages", "changeAddressModule", "addressLocationModule", "paymentModule"]);
}
