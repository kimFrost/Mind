/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.middleName.partial {
  export var html = '<label>{{ ::$ctrl.translations.Checkout.CustomerAddressInformation.MiddleName }}</label><input	name="MiddleName"	ng-model="$ctrl.formData.InvoiceAddress.MiddleName"	ng-minlength="2"	ng-maxlength="35"	type="text"	placeholder="{{ ::$ctrl.translations.Checkout.CustomerAddressInformationPlaceholder.MiddleNamePlaceholder }}"	class="form__input"/>';
}
