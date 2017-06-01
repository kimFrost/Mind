/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.email.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.Email }}*</label><input	id="Email"	name="Email"	type="email"	ng-model="$ctrl.formData.Email"	ng-pattern="$ctrl.emailRegexPattern"	ng-minlength="6"	required	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.EmailPlaceholder }}"	class="form__input form__customer-invoice-email"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.Email.$error" role="alert">		<div ng-messages-include="email-validation-messages"></div>	</div></div>';
}
