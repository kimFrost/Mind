/* tslint:disable:max-line-length */
module HtmlTemplates.minibasket.recipe {
  export var html = '<div class="minibasket-recipe">	<div class="minibasket-recipe__top">		<a class="minibasket-recipe__header" href="{{::$ctrl.recipeData.Url}}">			{{$ctrl.recipeData.Title}}		</a>		<div class="minibasket-recipe__remove-recipe">			<remove-recipe recipe-id="$ctrl.recipeData.Id"></remove-recipe>		</div>	</div>		<minibasket-product product-data="product" ng-repeat="product in $ctrl.recipeData.Lines track by product.Id"></minibasket-product></div>';
}
