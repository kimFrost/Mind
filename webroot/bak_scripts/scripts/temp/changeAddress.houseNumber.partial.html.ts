/* tslint:disable:max-line-length */
module HtmlTemplates.changeAddress.houseNumber.partial {
  export var html = '<div>	<label>{{ ::$ctrl.translations.ChangeAddress.DeliveryInformation.HouseNumber }}*</label>	<input		id="HouseNumber"		name="HouseNumber"		type="tel"		pattern="[0-9]*"		ng-model="$ctrl.formData.HouseNumber"		required		placeholder="{{ ::$ctrl.translations.ChangeAddress.DeliveryInformation.HouseNumberPlaceholder }}"		class="form__input"	/></div>';
}
