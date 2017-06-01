/* tslint:disable:max-line-length */
module HtmlTemplates.textspot {
  export var html = '<div class="spot-basic text-spot"	ng-class="{\'has-background-overlay\': $ctrl.hasBackgroundOverlay, \'has-background-image\': $ctrl.spotdata.BackgroundImageForJson.Url}"	ng-style="{\'background-color\': $ctrl.themeColors.backgroundColor, \'color\': $ctrl.themeColors.textColor }">	<div class="spot-image-wrapper" 		ng-style="$ctrl.spotdata.BackgroundImageForJson.Url && {\'background-image\': \'url(&quot;\' + $ctrl.spotdata.BackgroundImageForJson.Url + \'&width=800&height=550&mode=max&quality=70&quot;)\'}">		<a ng-if="$ctrl.spotdata.Link != null" 			href="{{::$ctrl.spotdata.Link.Url}}" 			target="{{$ctrl.spotdata.Link.LinkType === \'external\' ? \'_blank\' : \'\'}}"			class="spot__frame aspect-ratio">			<div class="spot__box">				<h1 class="spot__headline">{{::$ctrl.spotdata.Header}}</h1>				<ul class="spot__list">					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine1 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine1}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine2 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine2}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine3 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine3}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine4 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine4}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine5 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine5}}</li>				</ul>				<div ng-if="$ctrl.spotdata.ShowLinkAsButton" class="spot-button">					{{::$ctrl.spotdata.Link.Text}}				</div>			</div>		</a>		<div ng-if="$ctrl.spotdata.Link == null" class="spot__frame aspect-ratio">			<div class="spot__box">				<h1 class="spot__headline">{{::$ctrl.spotdata.Header}}</h1>				<ul class="spot__list">					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine1 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine1}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine2 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine2}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine3 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine3}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine4 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine4}}</li>					<li class="spot__list-item" ng-if="$ctrl.spotdata.ListLine5 != \'\'"><span class="spot__list-item-icon icon_check"></span>{{::$ctrl.spotdata.ListLine5}}</li>				</ul>			</div>		</div>	</div></div>';
}
