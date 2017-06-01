/* tslint:disable:max-line-length */
module HtmlTemplates.content.layout {
  export var html = '<div class="content-layout">	<div class="content-layout__row" ng-class="\'content-layout__row_column-\' + $ctrl.spotdata.Type">		<div class="content-layout__column" ng-repeat="i in $ctrl.createRange($ctrl.spotdata.Type)" ng-switch="$ctrl.spotdata.SubElements[i].TemplateName">			<content-imagetext data="$ctrl.spotdata.SubElements[i]" ng-switch-when="imagetext"></content-imagetext>			<content-background data="$ctrl.spotdata.SubElements[i]" ng-switch-when="background"></content-background>			<recipelist-item recipe-data="$ctrl.spotdata.SubElements[i].Recipe" ng-switch-when="recipe"></recipelist-item>		</div>	</div></div>';
}
