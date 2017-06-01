/* tslint:disable:max-line-length */
module HtmlTemplates.blankpage {
  export var html = '<h1 ng-if="$ctrl.pagedata.MetaData.Header !== \'\'" class="page-content__header">{{::$ctrl.pagedata.MetaData.Header}}</h1><div ng-if="$ctrl.pagedata.MetaData.Header !== \'\'" class="divider divider_page-top"></div><aside class="page-content__aside">	<div ng-repeat=\'spot in $ctrl.pagedata.aside\'>		<render-partial spot="spot"></render-partial>	</div></aside><section class="page-content__main">	<div ng-repeat="spot in $ctrl.pagedata.content" class="partial-wrapper" ng-class="spot.TemplateName">		<render-partial spot="spot"></render-partial>	</div></section>';
}
