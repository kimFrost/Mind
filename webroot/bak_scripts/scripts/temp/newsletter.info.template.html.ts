/* tslint:disable:max-line-length */
module HtmlTemplates.newsletter.info.template {
  export var html = '<div class="form__checkbox">	<input		ng-model="$ctrl.model"		type="checkbox"		id="HasNewsLetterSubscription"		name="HasNewsLetterSubscription" />	<label for="HasNewsLetterSubscription">{{ ::$ctrl.translations.Checkout.Signup.SignupToNewsletterText }}		<a href="#" class="color_primary" ng-click="$ctrl.showNewsletterInfo()">{{ ::$ctrl.translations.Checkout.Signup.SignupToNewsletterNotificationText }}</a>	</label>	<div class="form__ui">		<span class="icon_check"></span>	</div></div>';
}
