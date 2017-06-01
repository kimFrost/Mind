/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.invoiceAddressPhone.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.Phone }}</label><input	name="InvoiceAddressPhone"	id="InvoiceAddressPhone"	type="number"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.PhonePlaceholder }}"	ng-model="$ctrl.formData.InvoiceAddress.PhoneNumber"	ng-pattern="$ctrl.phoneRegexPattern"	ng-minlength="8"	ng-maxlength="8"	maxlength="8"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.InvoiceAddressPhone.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
