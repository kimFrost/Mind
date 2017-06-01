/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.lastName.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.LastName }}*</label><input	name="LastName"	ng-model="$ctrl.formData.InvoiceAddress.LastName"	ng-minlength="2"	ng-maxlength="35"	required	type="text"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.LastNamePlaceholder }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.LastName.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
