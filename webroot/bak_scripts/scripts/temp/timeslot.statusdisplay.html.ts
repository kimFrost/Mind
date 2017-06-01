/* tslint:disable:max-line-length */
module HtmlTemplates.timeslot.statusdisplay {
  export var html = '<div class="timeslot-statusdisplay"	 ng-class="{\'timeslot-selected\': $ctrl.buttonState == 3}"	 ng-show="$ctrl.timeslotIsReadyToInit"	 ng-switch="$ctrl.buttonState">	<span class="timeslot-statusdisplay__text" ng-switch-when="0">{{::$ctrl.translations.Timeslot.StatusDisplay.ButtonTextState1}}</span>	<span class="timeslot-statusdisplay__text" ng-switch-when="1">{{::$ctrl.translations.Timeslot.StatusDisplay.ButtonTextState2}}</span>	<span class="timeslot-statusdisplay__text" ng-switch-when="2">{{::$ctrl.translations.Timeslot.StatusDisplay.ButtonTextState3}}</span>	<span class="timeslot-statusdisplay__text" ng-switch-when="3">{{$ctrl.formattedDeliveryTime }}</span>	</div>';
}
