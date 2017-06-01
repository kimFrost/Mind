///<reference path="../../../../references/references.ts"/>
/**
 * Created by MKI on 01-08-2016.
 */

namespace ChangeAddressModule {

	class Run{
		constructor($templateCache:ng.ITemplateCacheService){
			$templateCache.put('change-address-check-postcode', HtmlTemplates.changeAddress.checkPostcode.partial.html);
			$templateCache.put('change-address-delivery-address-information', HtmlTemplates.changeAddress.deliveryInformation.partial.html);
			$templateCache.put('change-address-postal-code', HtmlTemplates.changeAddress.postalCode.partial.html);
			$templateCache.put('change-address-postal-district', HtmlTemplates.changeAddress.postalDistrict.partial.html);
			$templateCache.put('change-address-house-number', HtmlTemplates.changeAddress.houseNumber.partial.html);
			$templateCache.put('change-address-make-this-address-default', HtmlTemplates.changeAddress.makeThisDefaultAddress.partial.html);
			$templateCache.put('change-address-location-door', HtmlTemplates.changeAddress.locationDoor.partial.html);
			$templateCache.put('change-address-street-name', HtmlTemplates.changeAddress.streetName.partial.html);
			$templateCache.put('change-address-name', HtmlTemplates.changeAddress.name.partial.html);
		}
	}

	angular.module(moduleId)
		.run(Run);
}
