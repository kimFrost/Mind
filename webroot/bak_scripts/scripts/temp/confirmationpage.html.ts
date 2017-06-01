/* tslint:disable:max-line-length */
module HtmlTemplates.confirmationpage {
  export var html = '<orderconfirmation></orderconfirmation><div ng-repeat="spot in $ctrl.pagedata.content" class="partial-wrapper" ng-class="spot.TemplateName">	<render-partial spot="spot"></render-partial></div>';
}
