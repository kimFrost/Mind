/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.useAlternativeDeliveryAddress.partial {
  export var html = '<div class="form__checkbox">	<input type="checkbox"		   id="DeliveryAddressIsBillingAddress"		   name="DeliveryAddressIsBillingAddress"		   ng-model="$ctrl.formData.InvoiceAddressIsDeliveryAddress"		   ng-checked="$ctrl.formData.InvoiceAddressIsDeliveryAddress"/>	<label for="DeliveryAddressIsBillingAddress">{{ ::$ctrl.translations.Checkout.AlternativeDeliveryAddress.UseAlternativeDeliveryAddressCheckboxText }}</label>	<div class="form__ui">		<span class="icon_check"></span>	</div></div>';
}
