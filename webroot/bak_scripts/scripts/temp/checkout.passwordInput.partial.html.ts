/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.passwordInput.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.Password }}*</label><input	id="Password"	name="Password"	type="password"	ng-model="$ctrl.formData.Password"	required	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.Password }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.Password.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
