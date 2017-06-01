/* tslint:disable:max-line-length */
module HtmlTemplates.productdetail {
  export var html = '<accordion-group mobile="true">	<div class="product-detail" ng-class="{ \'campaign__line-through-prices\' : $ctrl.productData.Campaign.Type === \'ProductCampaignDiscount\' || $ctrl.productData.Campaign.Type === \'ProductCampaignDiscountPercent\' || $ctrl.productData.Campaign.Type === \'ProductCampaignFreeProduct\' }">		<div class="product-detail__slideshow-container">			<campaign-splash campaign="$ctrl.productData.Campaign" discount-item="$ctrl.productData.DiscountItem"></campaign-splash>			<product-slideshow class="slideshow" media="$ctrl.productData.Media" share-title="$ctrl.productData.Name" share-desc="$ctrl.productData.Description"></product-slideshow>			<div class="product-detail__declaration" ng-if="!$ctrl.productData.Products.length">				<product-detail-declaration product-data="$ctrl.productData"></product-detail-declaration>			</div>		</div>		<div class="product-detail__info">			<h1 class="product-detail__header">{{$ctrl.productData.Name}}</h1>			<h2 class="product-detail__subheader">{{$ctrl.productData.Description}}</h2>						<labels class="product-detail__labels" label-data="$ctrl.productData.Labels" ng-if="$ctrl.productData.Labels.length !== 0"></labels>			<div class="product-detail__price-container">				<div class="product-detail__price-wrap">					<span class="product-detail__price">{{::$ctrl.productData.Price | priceBase}}</span><sup class="product-detail__price_superscript">{{::$ctrl.productData.Price | priceDecimals}}</sup>					<div class="product-detail__unit-price" ng-if="$ctrl.productData.UnitPrice">						{{::$ctrl.productData.UnitPrice}}					</div>				</div>				<div class="product-detail__discount-text">					<campaign-text campaign="$ctrl.productData.Campaign"></campaign-text>				</div>				<div class="product-detail__favorite product-detail__favorite_mobile icon icon_heart" ng-if="$ctrl.productData.Favorite"></div>				<div class="product-detail__btn-container">					<addtobasket product-id="$ctrl.productData.Id"					             auto-fold="true" with-text="true"					             class="addtobasket addtobasket_static"					             ng-if="$ctrl.productData.Availability.IsAvailableInStock && $ctrl.productData.Availability.IsDeliveryAvailable"								 position="product-detail">					</addtobasket>					<div class="product-detail__soldout-btn btn"					     disabled="disabled"					     ng-if="!$ctrl.productData.Availability.IsAvailableInStock">						{{::$ctrl.translations.ProductDetail.Availability.SoldOut}}					</div>					<div class="product-detail__availability-btn btn btn_notification"					     ng-click="$ctrl.showDeliveryInfoDialog($event)"					     ng-if="$ctrl.productData.Availability.IsAvailableInStock && !$ctrl.productData.Availability.IsDeliveryAvailable">						{{::$ctrl.translations.ProductDetail.Availability.DeliveryInfoShort}}					</div>					<div class="product-detail__favorite icon icon_heart" ng-if="$ctrl.productData.Favorite"></div>				</div>			</div>			<accordion class="product-detail__attributes" ng-if="$ctrl.productData.Attributes">				<toggle class="product-detail__accordion-toggle">{{::$ctrl.translations.ProductDetail.Description.AttributesHead}}</toggle>				<content class="product-detail__accordion-content">					<div class="product-detail__attribute" ng-repeat="attribute in $ctrl.productData.Attributes">						<span class="product-detail__attribute-key">{{attribute.Key}}: </span> <span class="product-detail__attribute-value" ng-repeat="value in attribute.Value">{{value}}<span ng-if="attribute.Value.length > 1 && $index + 1 !== attribute.Value.length">, </span></span>					</div>				</content>			</accordion>			<div class="product-detail__description" ng-show="$ctrl.productData.Text != \'\'">				<h5 class="product-detail__description-header">					{{::$ctrl.translations.ProductDetail.Description.DescriptionHead}}				</h5>				<accordion>					<toggle class="product-detail__accordion-toggle">{{::$ctrl.translations.ProductDetail.Description.DescriptionHead}}</toggle>					<content class="product-detail__description-text product-detail__accordion-content">						<div ng-bind-html="$ctrl.productData.Text"></div>					</content>				</accordion>			</div>			<a ng-href="{{$ctrl.productLogos.MedicineProductLogoLink.Url}}" ng-show="$ctrl.productData.IsMedicalProduct">				<img ng-src="{{$ctrl.productLogos.MedicineProductLogoForJson.Url}}" alt="Medicin vare" class="medical-logo" />			</a>		</div>		<accordion class="product-detail__declaration_mobile" ng-if="$ctrl.productData.Declarations.ShowDeclarations || $ctrl.productData.DeclarationLabel">			<toggle class="product-detail__accordion-toggle">{{::$ctrl.translations.ProductDetail.Declaration.DeclarationHead}}</toggle>			<content class="product-detail__accordion-content">				<product-detail-declaration product-data="$ctrl.productData"></product-detail-declaration>			</content>		</accordion>		<div class="product-detail__bundles" ng-if="$ctrl.productData.IsBundle">			<bundle data="$ctrl.productData"></bundle>		</div>	</div></accordion-group>';
}
