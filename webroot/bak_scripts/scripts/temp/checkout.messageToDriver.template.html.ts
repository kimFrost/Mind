/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.messageToDriver.template {
  export var html = '<a	ng-if="$ctrl.showToggleButton"	class="color_primary"	href="#"	ng-click="$ctrl.toggleMessageBox($ctrl.showTextArea)">	{{ ::$ctrl.translations.Checkout.MessageToDriver.MessageToTheDriverButtonText }}</a><ng-include	class="show-message-to-driver-animation"	ng-show="$ctrl.showTextArea"	src="\'message-to-driver\'"></ng-include>';
}
