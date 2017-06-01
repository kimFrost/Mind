/* tslint:disable:max-line-length */
module HtmlTemplates.accordion {
  export var html = '<div class="accordion-toggle" ng-transclude="toggle" ng-class="{\'active\' : $ctrl.isOpen && !$ctrl.disabled}" ng-click="$ctrl.toggle()" ng-show="!$ctrl.disabled"></div><div class="accordion-content" ng-transclude="content" ng-show="$ctrl.isOpen || $ctrl.disabled">	</div>';
}
