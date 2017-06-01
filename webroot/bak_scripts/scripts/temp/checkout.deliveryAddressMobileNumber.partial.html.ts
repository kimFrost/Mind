/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.deliveryAddressMobileNumber.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.MobilePhone }}*</label><input	name="DeliveryAddressMobile"	id="DeliveryAddressMobile"	type="number"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.MobilePhonePlaceholder }}"	ng-model="$ctrl.formData.DeliveryAddress.MobileNumber"	required	pattern="[0-9]*"	ng-minlength="8"	ng-maxlength="8"	maxlength="8"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.DeliveryAddressMobile.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
