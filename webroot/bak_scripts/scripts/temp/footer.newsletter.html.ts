/* tslint:disable:max-line-length */
module HtmlTemplates.footer.newsletter {
  export var html = '<form name="footerNewsletter" ng-submit="footerNewsletter.$valid && $ctrl.subscribe()" novalidate>    <div class="form__combine site-footer__subscribe-email-form">        <input             class="site-footer__subscribe-email form__input"             type="email"             ng-model="$ctrl.email"             ng-minlength="2"            ng-maxlength="254"            ng-pattern="$ctrl.emailRegexPattern"            placeholder="{{::$ctrl.translations.Footer.Subscribe.SubscribePlaceholder}}"            required />        <button type="submit" class="btn site-footer__subscribe-email-btn">{{::$ctrl.translations.Footer.Subscribe.SubscribeBtnText}}</button>    </div></form>';
}
