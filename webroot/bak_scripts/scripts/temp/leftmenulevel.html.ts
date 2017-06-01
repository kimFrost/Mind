/* tslint:disable:max-line-length */
module HtmlTemplates.leftmenulevel {
  export var html = '<li class="left-menu__item" ng-repeat="page in $ctrl.item.Children">	<a class="left-menu__link left-menu__link_level-{{::$ctrl.level}}"	   ng-class="{\'left-menu__link_inpath\' : page.InPath && page.Children.length > 0, \'left-menu__link_active\' : page.Active, \'left-menu__link_last-level\' : page.Children.length === 0 && $ctrl.level > 1, \'left-menu__link_last-1\' : page.Active && page.Children.length === 0}"	   ng-href="{{::page.Url}}">		{{::page.Text}}	</a>	<ul ng-if="page.Children.length > 0" class="left-menu__slide-toggle" ng-class="{\'left-menu__next-level\' : page.Active}" ng-show="page.InPath">		<leftmenulevel item="page" level="$ctrl.level + 1"></leftmenulevel>	</ul></li>';
}
