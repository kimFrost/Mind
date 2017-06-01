/* tslint:disable:max-line-length */
module HtmlTemplates.addressLocation {
  export var html = '<label ng-if="$ctrl.data === \'Floors\'">{{::$ctrl.translationsService.translations.ChangeAddress.AddressLocation.Floors}}</label><label ng-if="$ctrl.data === \'Letters\'">{{::$ctrl.translationsService.translations.ChangeAddress.AddressLocation.Letters}}</label><label ng-if="$ctrl.data === \'Sides\'">{{::$ctrl.translationsService.translations.ChangeAddress.AddressLocation.Sides}}</label><div class="form__modern-select form__modern-select_fill">	<select ng-model="$ctrl.model" class="form__input">		<option ng-repeat="option in $ctrl.options">{{ option }}</option>	</select></div>';
}
