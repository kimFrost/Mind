/* tslint:disable:max-line-length */
module HtmlTemplates.recipelist.showall {
  export var html = '<div class="recipelist-showall" ng-if="$ctrl.recipeData.length !== 0">	<h2 class="recipelist-showall__heading">		{{$ctrl.spotdata.Heading}}	</h2>	<div class="recipelist-showall__item-container">		<recipelist-item class="recipelist-showall__item" recipe-data="recipe" ng-repeat="recipe in $ctrl.recipeData"></recipelist-item>		<div class="recipelist-showall__item recipelist-showall__item_dummy"></div>		<div class="recipelist-showall__item recipelist-showall__item_dummy"></div>		<div class="recipelist-showall__item recipelist-showall__item_dummy"></div>	</div></div>';
}
