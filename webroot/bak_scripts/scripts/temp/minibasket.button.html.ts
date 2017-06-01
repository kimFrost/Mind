/* tslint:disable:max-line-length */
module HtmlTemplates.minibasket.button {
  export var html = '<a href="/basket" class="basket-button__info basket-value-info" ng-click="$ctrl.basketClicked($event)">	<span class="basket-button__info delivery-info">		<timeslot-statusdisplay></timeslot-statusdisplay>	</span>	<span class="basket-value">		{{$ctrl.basketService.basket.TotalProductsPrice | price}}	</span></a><div class="basket-button__updated" ng-click="$ctrl.basketClicked($event)">	<span class="icon icon_check"></span><br />kurv opdateret</div>';
}
