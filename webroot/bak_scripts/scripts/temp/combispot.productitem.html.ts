/* tslint:disable:max-line-length */
module HtmlTemplates.combispot.productitem {
  export var html = '<a ng-if="$ctrl.product.TemplateName !== \'advertisement\'" class="productlist-item__link"   ng-href="{{::$ctrl.product.Url}}"   ng-class="{ \'campaign__line-through-prices\' : $ctrl.product.Campaign.Type === \'ProductCampaignDiscount\' || $ctrl.product.Campaign.Type === \'ProductCampaignDiscountPercent\' || $ctrl.product.Campaign.Type === \'ProductCampaignFreeProduct\' }">	<div class="productlist-item__wrap"		 title="{{::$ctrl.product.Name}}. {{::$ctrl.product.Description}}"		 ng-class="{ \'campaign__line-through-prices\' : $ctrl.product.Campaign.Type === \'ProductCampaignDiscount\' || $ctrl.product.Campaign.Type === \'ProductCampaignDiscountPercent\' }">		<div class="productlist-item__soldout" ng-if="!$ctrl.product.Availability.IsAvailableInStock"></div>		<div class="productlist-item__image-container "			 ng-class="{\'productlist-item__image-container_notloaded\': $ctrl.product.Id === \'Skeleton\'}">			<img class="productlist-item__image" ng-src="{{::$ctrl.productimage.Url}}&height=500" ng-attr-alt="{{::$ctrl.product.Name}}" />			<div class="productlist-item__play" ng-if="$ctrl.product.YoutubeId"				 ng-click="$ctrl.openYoutube($event, $ctrl.product.YoutubeId, $ctrl.product.YoutubeThumbnailImage)">				<span class="icon icon_play3"></span>			</div>			<campaign-splash campaign="$ctrl.product.Campaign" discount-item="$ctrl.product.DiscountItem"></campaign-splash>		</div>		<div class="product-spot__content-wrap">			<div class="productlist-item__mobile-container" title="{{::$ctrl.product.Name}} &#013;{{::$ctrl.product.Description}}">				<div class="productlist-item__name">					{{::$ctrl.product.Name}}				</div>				<div class="productlist-item__info">					{{::$ctrl.product.Description}}				</div>				<labels label-data="$ctrl.product.Labels"></labels>				<div class="productlist-item__discount-text_mobile">					<campaign-text campaign="$ctrl.product.Campaign"></campaign-text>				</div>				<div class="productlist-item__price-container_mobile" ng-if="::$ctrl.product.Price">					<span class="productlist-item__price">{{::$ctrl.product.Price | priceBase}}</span><sup class="productlist-item__price_superscript">{{::$ctrl.product.Price | priceDecimals}}</sup>					<span class="real" ng-if="::$ctrl.product.Campaign.Type === \'ProductCampaignDiscount\'">						<span class="productlist-item__price real">{{::$ctrl.product.Campaign.CampaignPrice | priceBase}}</span><sup class="productlist-item__price_superscript real">{{::$ctrl.product.Campaign.CampaignPrice | priceDecimals}}</sup>					</span>				</div>				<div class="productlist-item__unit-price_mobile">					{{::$ctrl.product.UnitPrice}}				</div>			</div>			<div class="productlist-item__bottom-container">				<div class="productlist-item__discount-text">					<campaign-text campaign="$ctrl.product.Campaign"></campaign-text>				</div>				<div class="productlist-item__price-container" ng-if="::$ctrl.product.Price">					<span class="productlist-item__price">{{::$ctrl.product.Price | priceBase}}</span><sup class="productlist-item__price_superscript">{{::$ctrl.product.Price | priceDecimals}}</sup>				</div>				<div class="productlist-item__unit-price">					{{::$ctrl.product.UnitPrice}}				</div>				<div class="productlist-item__favorite icon icon_heart" ng-if="$ctrl.product.Favorite"></div>				<div class="productlist-item__soldout-btn btn icon_basket"					 disabled="disabled"					 ng-if="!$ctrl.product.Availability.IsAvailableInStock"></div>				<div class="productlist-item__availability-btn btn btn_notification"					 ng-click="$ctrl.showDeliveryInfoDialog($event)"					 ng-if="!$ctrl.product.Availability.IsDeliveryAvailable">					{{::$ctrl.translationsService.translations.ProductDetail.Availability.DeliveryInfoShort}}				</div>			</div>		</div>	</div></a><addtobasket class="productlist-item__addtobasket addtobasket"			 product-id="$ctrl.product.Id"			 auto-fold="true"			 ng-if="$ctrl.product.Availability.IsAvailableInStock && $ctrl.product.Availability.IsDeliveryAvailable"			 position="{{$ctrl.position}}"></addtobasket><ad ng-if="$ctrl.product.TemplateName === \'advertisement\'"	ad-data="$ctrl.product"	as-background="true"	delay="$ctrl.delay"></ad>';
}
