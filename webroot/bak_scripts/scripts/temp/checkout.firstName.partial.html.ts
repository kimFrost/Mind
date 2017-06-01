/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.firstName.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.FirstName }}*</label><input	name="FirstName"	ng-model="$ctrl.formData.InvoiceAddress.FirstName"	ng-minlength="2"	ng-maxlength="35"	type="text"	required	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.FirstNamePlaceholder }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.FirstName.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
