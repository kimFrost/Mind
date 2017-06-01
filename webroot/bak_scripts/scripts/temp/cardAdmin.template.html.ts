/* tslint:disable:max-line-length */
module HtmlTemplates.cardAdmin.template {
  export var html = '<div class="card-admin">	<h1 class="card-admin__header" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.Header"></h1>		<div ng-if="$ctrl.data.PaymentType !== 0">		<div class="card-admin__paymethod">			<span class="card-admin__paymethod-text-bold" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.Paymethod"></span> <span class="card-admin__paymethod-text" ng-bind="::$ctrl.payMethod"></span>		</div>				<div class="card-admin__contact-customerservice">			<span class="card-admin__contact-customerservice-text" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.QuestionText"></span> <a class="card-admin__contact-customerservice-link" ng-href="{{$ctrl.settingsService.settings.CustomerServicePageUrl}}" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.CustomerService"></a>		</div>	</div>	<div ng-if="$ctrl.data.PaymentType === 0">		<div class="card-admin__text" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.Text"></div>		<button class="card-admin__button btn" ng-click="$ctrl.add()" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.AddPaymentCard"></button>		<div class="card-admin__saved-header" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.SavedPaymentCard"></div>		<div class="card-admin__saved-text" ng-if="$ctrl.cards.length" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.ChooseCardText"></div>		<div class="card-admin__cards-wrapper">			<div class="card-admin__no-saved-cards" ng-if="!$ctrl.cards.length" ng-bind="::$ctrl.translationsService.translations.MyNemlig.CardAdministration.NoSavedPaymentCards"></div>			<div class="card-admin__cards" ng-if="$ctrl.cards.length">				<div class="card-admin__card" ng-repeat="card in $ctrl.cards track by card.CardId" ng-class="{\'card-admin__card_active\' : card.IsDefault}" ng-click="card.IsDefault || $ctrl.makeDefault(card)">					<div class="card-admin__card-logo">						<payment-card card-type="card.CardType"></payment-card>					</div>					<div class="card-admin__card-info">						<div class="card-admin__card-number" ng-bind="::card.CardMask"></div>						<div class="card-admin__card-expiry">							{{::card.CardExpirationMonth}} / {{::card.CardExpirationYear}}							<span class="card-admin__card-fee_mobile">{{::$ctrl.translationsService.translations.MyNemlig.CardAdministration.Fee}} {{::card.FeeInPercent}} %</span>						</div>					</div>					<div class="card-admin__card-fee">						{{::$ctrl.translationsService.translations.MyNemlig.CardAdministration.Fee}} {{::card.FeeInPercent}}%					</div>					<div class="card-admin__card-remove icon_close" ng-click="$ctrl.remove(card, $event)"></div>				</div>			</div>			<div class="card-admin__loader" ng-if="$ctrl.fetching">				<nemlig-loader class="nemlig-loader"></nemlig-loader>			</div>		</div>	</div></div>';
}
