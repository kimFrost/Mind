/* tslint:disable:max-line-length */
module HtmlTemplates.campaign.discount.price {
  export var html = '<span class="campaign__discount-text" ng-if="$ctrl.campaign.Type" ng-switch="$ctrl.campaign.Type">	<span ng-switch-when="ProductCampaignDiscountPercent">		{{::$ctrl.campaign.CampaignPrice | number:2 | price }}	</span>	<span ng-switch-when="ProductCampaignDiscount">		{{::$ctrl.campaign.CampaignPrice | number:2 | price }}	</span></span>';
}
