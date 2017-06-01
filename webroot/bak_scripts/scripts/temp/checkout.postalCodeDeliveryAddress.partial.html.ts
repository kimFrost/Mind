/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.postalCodeDeliveryAddress.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.PostalCode }}*</label><input	ng-model="$ctrl.formData.DeliveryAddress.PostalCode"	required	ng-minlength="3"	ng-maxlength="4"	maxlength="4"	pattern="[0-9]*"	name="PostalCodeDeliveryAddress"	id="PostalCodeDeliveryAddress"	type="tel"	ng-disabled="true"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.PostalCodePlaceholder }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.PostalCodeDeliveryAddress.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
