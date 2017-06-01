/* tslint:disable:max-line-length */
module HtmlTemplates.changeAddress.postalDistrict.partial {
  export var html = '<label>{{ ::$ctrl.translations.ChangeAddress.DeliveryInformation.CityName }}*</label><div class="form__attach">	<input		id="PostalDistrict"		name="PostalDistrict"		type="text"		ng-model="$ctrl.formData.PostalDistrict"		required		ng-disabled="$ctrl.disabled"		placeholder="{{ ::$ctrl.translations.ChangeAddress.DeliveryInformation.CityNamePlaceholder }}"		class="form__input" /></div><div class="validation-message" ng-show="checkoutForm.PostalDistrict.$touched || checkoutForm.$submitted" ng-messages="checkoutForm.PostalDistrict.$error" role="alert">	<div ng-messages-include="validation-messages"></div></div>';
}
