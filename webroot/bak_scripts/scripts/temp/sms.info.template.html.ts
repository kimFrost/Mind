/* tslint:disable:max-line-length */
module HtmlTemplates.sms.info.template {
  export var html = '<div class="form__checkbox">	<input		ng-model="$ctrl.model"		type="checkbox"		id="HasNewsBySMSSubscription"		name="HasNewsBySMSSubscription" />	<label for="HasNewsBySMSSubscription">{{::$ctrl.translations.Checkout.Signup.SignupToDiscountSMSText}} <a href="#" class="color_primary" ng-click="$ctrl.showSMSInfo()">{{ ::$ctrl.translations.Checkout.Signup.SignupToDiscountSMSNotificationText }}</a></label>	<div class="form__ui">		<span class="icon_check"></span>	</div></div>';
}
