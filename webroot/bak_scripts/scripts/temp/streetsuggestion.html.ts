/* tslint:disable:max-line-length */
module HtmlTemplates.streetsuggestion {
  export var html = '<input		type="text"		name="streetName"		required		autocomplete="off"		ng-minlength="2"		ng-model="$ctrl.model"		placeholder="{{$ctrl.placeholder}}"		ng-keydown="$ctrl.keyDown($event)"		ng-focus="$ctrl.onFocus()"		ng-blur="$ctrl.onBlur()"		ng-disabled="$ctrl.inputDisabled"		class="form__input testReg2StreetField testStreetNameFieldOnProfilePage testAltStreetNameFieldOnProfilePage" /><div class="form__error-msg" ng-bind="$ctrl.requiredText"></div><div class="street-suggestion__list" ng-show="$ctrl.items.length > 0 && $ctrl.isTyping == true">	<label class="street-suggestion__item"		 for="HouseNumber"		 ng-repeat="item in $ctrl.items"		 ng-click="$ctrl.selectIndex($index)"		 ng-class="{\'street-suggestion__item_selected\':$ctrl.selectedItem==$index}">{{item}}	</label></div>';
}
