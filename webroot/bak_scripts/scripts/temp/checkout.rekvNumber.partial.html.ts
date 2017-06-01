/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.rekvNumber.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.RequisitionNumber }}*</label><div class="form__attach">	<input		ng-model="$ctrl.user.DeliveryAddress.RequisitionNumber"		ng-required		type="text"		name="RequisitionNumber"		id="RequisitionNumber"		placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.RequisitionNumberPlaceholder }}"		class="form__input" /></div>';
}
