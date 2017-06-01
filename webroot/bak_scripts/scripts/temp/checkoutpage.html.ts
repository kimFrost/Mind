/* tslint:disable:max-line-length */
module HtmlTemplates.checkoutpage {
  export var html = '<aside class="page-content__aside">	<div ng-repeat=\'spot in $ctrl.pagedata.aside\'>		<render-partial spot="spot"></render-partial>	</div></aside><section class="page-content__main">	<basket></basket>		<div id="checkout">		<checkout></checkout>	</div>	<div ng-repeat="spot in $ctrl.pagedata.content" class="partial-wrapper" ng-class="spot.TemplateName">		<render-partial spot="spot"></render-partial>	</div></section>';
}
