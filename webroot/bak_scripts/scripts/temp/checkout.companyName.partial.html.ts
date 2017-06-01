/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.companyName.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.CompanyName }}*</label><input	ng-model="$ctrl.formData.InvoiceAddress.CompanyName"	id="CompanyName"	name="CompanyName"	type="text"	minlength="2"	required	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.CompanyNamePlaceholder }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.CompanyName.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
