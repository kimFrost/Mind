/* tslint:disable:max-line-length */
module HtmlTemplates.resendActivationMail.template {
  export var html = '<div class="resend-activation-mail">	<div ng-hide="$ctrl.viewStates.showStatusMessage" class="resend-activation-mail__content">		<div class="content__text">{{ $ctrl.text }}</div>		<a			id="resend-activation-mail-link"			class="content__link"			ng-click="$ctrl.clickActivationLink($ctrl.link, $event)">			{{:: $ctrl.translations.Authentication.Login.UserNotActivatedLinkText }}		</a>	</div>	<div ng-show="$ctrl.viewStates.showStatusMessage" class="resend-activation__status-messages">		{{ $ctrl.viewStates.statusMessage }}	</div></div>';
}
