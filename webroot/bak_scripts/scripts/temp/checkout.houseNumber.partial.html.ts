/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.houseNumber.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.HouseNumber }}*</label><input	ng-model="$ctrl.formData.InvoiceAddress.HouseNumber"	name="HouseNumber"	id="HouseNumber"	type="tel"	pattern="[0-9]*"	min-value="1"	required	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.HouseNumberPlaceholder }}"	class="form__input"/><div class="form__error-msg form__error-msg_align-right">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.HouseNumber.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
