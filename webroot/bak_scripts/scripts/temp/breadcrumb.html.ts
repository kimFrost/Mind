/* tslint:disable:max-line-length */
module HtmlTemplates.breadcrumb {
  export var html = '<ul class="breadcrumb" ng-if="$ctrl.pages.length > 0">	<li class="breadcrumb__item" ng-repeat="page in $ctrl.pages">		<a class="breadcrumb__link" ng-if="!$last" ng-href="{{::page.Url}}">{{::page.Text}}</a>		<span class="breadcrumb__link"  ng-if="$last">{{::page.Text}}</span>	</li></ul>';
}
