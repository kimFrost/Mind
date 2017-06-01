/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.contactPersonDeliveryAddress.partial {
  export var html = '<label>{{ ::$ctrl.translations.Form.Element.ContactPerson }}</label><input	name="ContactPersonDeliveryAddress"	id="ContactPersonDeliveryAddress"	type="text"	ng-model="$ctrl.formData.DeliveryAddress.ContactPerson"	ng-minlength="2"	ng-maxlength="35"	placeholder="{{ $ctrl.translations.Form.ElementPlaceholder.ContactPerson }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.ContactPersonDeliveryAddress.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
