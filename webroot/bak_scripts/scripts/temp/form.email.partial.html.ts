/* tslint:disable:max-line-length */
module HtmlTemplates.form.email.partial {
  export var html = '<label>{{ ::$ctrl.translations.Form.Element.Email }}</label><input	name="Email"	id="Email"	type="email"	ng-model="$ctrl.formData.email"	ng-pattern="$ctrl.emailRegexPattern"	ng-minlength="6"	required	placeholder="{{ ::$ctrl.translations.Form.ElementPlaceholder.Email }}"	class="form__input"/><div class="form__error-msg">	<div ng-show="Form.Email.$touched" ng-messages="Form.Email.$error" role="alert">		<div ng-messages-include="validation-messages"></div>	</div></div>';
}
