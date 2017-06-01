/* tslint:disable:max-line-length */
module HtmlTemplates.mosaiclayout1 {
  export var html = '<div class="mosaic-grid mosaic-layout-1" ng-class="{\'mosaic-grid_visible\':$ctrl.fadeIn}">	<div class="mosaic-block"		 ng-repeat="spot in $ctrl.mosaicdata.subSpots track by $index"		 ng-class="[{\'hide-on-mobile\': !spot.VisibleOnMobile}, \'mosaic-block-{{$index+1}}\', \'block-with-{{spot.TemplateName}}\']">		<render-partial class="block-content {{::spot.BlockClass}}" spot="spot" ng-click="$ctrl.trackClick(spot, $index)"></render-partial>	</div></div>';
}
