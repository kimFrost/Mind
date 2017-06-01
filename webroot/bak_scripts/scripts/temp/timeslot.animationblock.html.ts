/* tslint:disable:max-line-length */
module HtmlTemplates.timeslot.animationblock {
  export var html = '<div class="timeslot-animation-block__overlay" ng-class="{\'active\': $ctrl.isActive}" ng-click="$ctrl.animationTimeslotBlock(0)">	<div class="timeslot-animation-block" ng-class="{\'active\': $ctrl.isActive}">		<div class="timeslot-animation-block__header">{{::$ctrl.translations.Timeslot.Selector.TimeslotChosen}}</div>		<div class="timeslot-animation-block__time">{{$ctrl.formattedDeliveryTime}}</div>	</div></div>';
}
