/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.companyNameDeliveryAddress.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.CompanyName }}*</label><input	ng-model="$ctrl.formData.DeliveryAddress.CompanyName"	id="CompanyNameDeliveryAddress"	name="CompanyNameDeliveryAddress"	type="text"	required	minlength="2"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.CompanyNamePlaceholder }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.CompanyNameDeliveryAddress.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
