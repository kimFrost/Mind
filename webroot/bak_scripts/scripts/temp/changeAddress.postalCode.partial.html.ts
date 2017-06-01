/* tslint:disable:max-line-length */
module HtmlTemplates.changeAddress.postalCode.partial {
  export var html = '<label>{{ ::$ctrl.translations.ChangeAddress.DeliveryInformation.PostalCode }}*</label><div class="form__attach">	<input		name="PostalCode"		id="PostalCode"		type="tel"		ng-model="$ctrl.formData.PostalCode"		pattern="[0-9]*"		ng-minlength="3"		ng-maxlength="4"		maxlength="4"		required		ng-disabled="$ctrl.disabled"		placeholder="{{ ::$ctrl.translations.ChangeAddress.DeliveryInformation.PostalCodePlaceholder }}"		class="form__input" /></div><div class="validation-message" ng-show="checkoutForm.PostalCode.$touched || checkoutForm.$submitted" ng-messages="checkoutForm.PostalCode.$error" role="alert">	<div ng-messages-include="validation-messages"></div></div>';
}
