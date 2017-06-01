/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.cvr.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.CVR }}*</label><input	ng-model="$ctrl.formData.CVR"	name="CVR"	id="CVR"	type="number"	required	ng-minlength="8"	ng-maxlength="8"		placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.CVRPlaceholder }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="checkoutForm.$submitted" ng-messages="checkoutForm.CVR.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
