/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.streetNameDeliveryAddress.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.StreetName }}*</label><street-suggestion	required-text="{{ ::$ctrl.translations.Checkout.Validation.Required }}"	class="street-suggestion"	model="$ctrl.formData.DeliveryAddress.StreetName"	postalcode="$ctrl.formData.DeliveryAddress.PostalCode"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.StreetNamePlaceholder }}"></street-suggestion>';
}
