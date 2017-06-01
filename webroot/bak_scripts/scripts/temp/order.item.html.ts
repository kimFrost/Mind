/* tslint:disable:max-line-length */
module HtmlTemplates.order.item {
  export var html = '<div>{{$ctrl.data.ProductName}}</div><div><span ng-if="!$ctrl.data.IsRecipeLine">{{$ctrl.data.Description}}</span></div><div><span ng-if="!$ctrl.data.IsRecipeLine">{{$ctrl.data.Quantity}}</span></div><div><span ng-if="!$ctrl.data.IsRecipeLine">{{$ctrl.data.AverageItemPrice | price:true}}</span></div><div class="color_primary">	<span ng-show="$ctrl.data.DiscountAmount > 0 && !$ctrl.data.IsRecipeLine">{{$ctrl.data.DiscountAmount | price:true}}</span></div><div><span ng-if="!$ctrl.data.IsRecipeLine">{{$ctrl.data.Amount | price:true}}</span></div>';
}
