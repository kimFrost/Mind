/* tslint:disable:max-line-length */
module HtmlTemplates.checkout.paymentCards.partial {
  export var html = '<payment-cards on-selected-card="$ctrl.selectedCard(card)"></payment-cards><div class="pay-with-another-card" ng-show="$ctrl.states.SelectedPaymentCard">	<a class="pay-with-another-card__link color_primary"	   ng-click="$ctrl.payWithAnotherCard(checkoutFastTrackForm, $ctrl.formData)">		{{ ::$ctrl.translations.PaymentCards.General.UseAnotherCardButtonText }}	</a></div>';
}
