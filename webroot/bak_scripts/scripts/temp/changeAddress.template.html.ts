/* tslint:disable:max-line-length */
module HtmlTemplates.changeAddress.template {
  export var html = '<div class="change-address">	<ng-include src="\'change-address-check-postcode\'" ng-show="$ctrl.showZipVal"></ng-include>	<ng-include src="\'change-address-delivery-address-information\'" ng-hide="$ctrl.states.HideChangeDeliveryAddressFields"></ng-include>	<div ng-show="$ctrl.states.ShowErrorMessage">		{{ ::$ctrl.translations.Checkout.ChangeAddress.CantDeliverToZipcodeErrorMesssage }}	</div>	<div ng-if="$ctrl.states.IsPending" class="component-loader change-address__loader">		<nemlig-loader class="nemlig-loader nemlig-loader_large" inverted="false"></nemlig-loader>	</div></div>';
}
