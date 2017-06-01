/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.streetName.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.StreetName }}*</label><street-suggestion	class="street-suggestion"	required-text="{{ ::$ctrl.translations.Checkout.Validation.Required }}"	model="$ctrl.formData.InvoiceAddress.StreetName"	postalcode="$ctrl.formData.InvoiceAddress.PostalCode"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.StreetNamePlaceholder }}"></street-suggestion>';
}
