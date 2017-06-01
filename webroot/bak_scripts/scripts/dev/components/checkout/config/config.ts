///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace CheckoutModule {

	class Run{
		constructor($templateCache:ng.ITemplateCacheService) {

			//Billing Address form elements
			$templateCache.put('first-name', HtmlTemplates.checkout.firstName.partial.html);
			$templateCache.put('middle-name', HtmlTemplates.checkout.middleName.partial.html);
			$templateCache.put('last-name', HtmlTemplates.checkout.lastName.partial.html);
			
			$templateCache.put('postal-code', HtmlTemplates.checkout.postalCode.partial.html);
			$templateCache.put('postal-district', HtmlTemplates.checkout.postalDistrict.partial.html);

			$templateCache.put('street-name', HtmlTemplates.checkout.streetName.partial.html);
			$templateCache.put('house-number', HtmlTemplates.checkout.houseNumber.partial.html);

			$templateCache.put('house-location-floor', HtmlTemplates.checkout.houselocationFloor.partial.html);
			$templateCache.put('house-location-side', HtmlTemplates.checkout.houselocationSide.partial.html);
			$templateCache.put('house-location-letter', HtmlTemplates.checkout.houselocationLetter.partial.html);
			$templateCache.put('house-location-doorNumber', HtmlTemplates.checkout.houselocationDoorNumber.partial.html);
			$templateCache.put('company-name', HtmlTemplates.checkout.companyName.partial.html);


			// Primary Invoice Phone number
			$templateCache.put('invoice-address-mobil-phone', HtmlTemplates.checkout.invoiceAddressMobilPhone.partial.html);

			// Secondary Invoice Phone number
			$templateCache.put('invoice-address-phone', HtmlTemplates.checkout.invoiceAddressPhone.partial.html);


			//Alternative Delivery Address form elements
			$templateCache.put('contact-person-delivery-address', HtmlTemplates.checkout.contactPersonDeliveryAddress.partial.html);
			$templateCache.put('company-name-delivery-address', HtmlTemplates.checkout.companyNameDeliveryAddress.partial.html);

			$templateCache.put('postal-code-delivery-address', HtmlTemplates.checkout.postalCodeDeliveryAddress.partial.html);
			$templateCache.put('postal-district-delivery-address', HtmlTemplates.checkout.postalDistrictDeliveryAddress.partial.html);


			$templateCache.put('house-location-floor-delivery-address', HtmlTemplates.checkout.houselocationFloorDeliveryAddress.partial.html);
			$templateCache.put('house-location-side-delivery-address', HtmlTemplates.checkout.houselocationSideDeliveryAddress.partial.html);
			$templateCache.put('house-location-letter-delivery-address', HtmlTemplates.checkout.houselocationLetterDeliveryAddress.partial.html);
			$templateCache.put('house-location-doorNumber-delivery-address', HtmlTemplates.checkout.houselocationDoorNumberDeliveryAddress.partial.html);

			$templateCache.put('street-name-delivery-address', HtmlTemplates.checkout.streetNameDeliveryAddress.partial.html);
			$templateCache.put('house-nr-alternative-address', HtmlTemplates.checkout.houseNumberDeliveryAddress.partial.html);

			// Primary delivery Phone/mobil number
			$templateCache.put('delivery-address-mobil-phone', HtmlTemplates.checkout.deliveryAddressMobileNumber.partial.html);

			// Secondary delivery Phone number
			$templateCache.put('delivery-address-phone', HtmlTemplates.checkout.deliveryAddressPhoneNumber.partial.html);

			//Misc form elements
			$templateCache.put('email', HtmlTemplates.checkout.email.partial.html);
			$templateCache.put('message-to-driver', HtmlTemplates.checkout.messageToDriver.partial.html);
			$templateCache.put('cvr', HtmlTemplates.checkout.cvr.partial.html);
			$templateCache.put('requisition-number', HtmlTemplates.checkout.rekvNumber.partial.html);
			$templateCache.put('ean-number', HtmlTemplates.checkout.EanNumber.partial.html);

			$templateCache.put('pay-button', HtmlTemplates.checkout.payButton.partial.html);
			$templateCache.put('sign-up-to', HtmlTemplates.checkout.signup.partial.html);

			// Login
			$templateCache.put('login-button', HtmlTemplates.checkout.loginUser.partial.html);

			// Alternative delivery Address
			$templateCache.put('use-alternative-delivery-address', HtmlTemplates.checkout.useAlternativeDeliveryAddress.partial.html);

			// Fast track
			$templateCache.put('delivery-time-and-information', HtmlTemplates.checkout.deliveryTimeAndInformation.partial.html);
			$templateCache.put('payment-methods', HtmlTemplates.checkout.paymentMethods.partial.html);
			$templateCache.put('payment-cards', HtmlTemplates.checkout.paymentCards.partial.html);
			$templateCache.put('password-input', HtmlTemplates.checkout.passwordInput.partial.html);

			// Agreements
			$templateCache.put('agreement-minimum-age', HtmlTemplates.checkout.agreementMinimumAge.partial.html);
			$templateCache.put('agreement-correct-information', HtmlTemplates.checkout.agreementCorrectInformation.partial.html);
			$templateCache.put('agreement-terms-and-conditions', HtmlTemplates.checkout.agreementTermsAndConditions.partial.html);
			$templateCache.put('this-is-our-terms-and-conditions', HtmlTemplates.checkout.thisIsOurTermsAndConditions.partial.html);


			// Customer Selection
			$templateCache.put('customer-type-selection', HtmlTemplates.checkout.customerTypeSelection.partial.html);

			// Customer Type Templates
			$templateCache.put('customer-type-company', HtmlTemplates.checkout.customerTypeCompany.partial.html);
			$templateCache.put('customer-type-private', HtmlTemplates.checkout.customerTypePrivate.partial.html);
			$templateCache.put('customer-type-government', HtmlTemplates.checkout.customerTypeGovernment.partial.html);

		}
	}

	angular.module(moduleId)
		.run(Run);
}
