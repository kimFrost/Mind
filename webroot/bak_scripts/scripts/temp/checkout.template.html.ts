/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.template {
  export var html = '<section class="checkout" id="checkout" ng-show="$ctrl.states.IsAuthorized != null">	<span ng-if="!$ctrl.states.IsAuthorized">		<checkout-anonymous-user></checkout-anonymous-user>	</span>	<span ng-if="$ctrl.states.IsAuthorized">		<checkout-fast-track></checkout-fast-track>	</span></section>';
}
