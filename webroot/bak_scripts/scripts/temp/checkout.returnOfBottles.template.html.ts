/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.returnOfBottles.template {
  export var html = '<div class="form__checkbox">	<input ng-model="$ctrl.model"		   type="checkbox"		   id="ReturnBottles"		   name="ReturnBottles" />	<label for="ReturnBottles">		{{::$ctrl.translations.Checkout.ReturnBottles.ReturnBottlesCheckboxTextpart1}} <a href="#" class="color_primary" ng-click="$ctrl.showReturnOfBottlesInformation()">{{::$ctrl.translations.Checkout.ReturnBottles.ReturnBottlesCheckboxTextpart2}}</a>	</label>	<div class="form__ui">		<span class="icon_check"></span>	</div></div>';
}
