/* tslint:disable:max-line-length */
module HtmlTemplates.tooltip {
  export var html = '<div class="tooltip" ng-class="{\'tooltip_show\': $ctrl.tooltipShow, \'tooltip_alt\': $ctrl.tooltipAlt}">    <span class="icon_info"></span>	<div class="tooltip__content">    	<div class="tooltip__msg" ng-bind="$ctrl.tooltipMsg"></div>		<div class="tooltip__close" ng-click="$ctrl.tooltipShow = false"></div>	</div></div>';
}
