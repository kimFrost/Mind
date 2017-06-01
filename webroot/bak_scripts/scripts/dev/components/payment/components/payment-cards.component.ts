///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 13-09-2016.
 */
namespace PaymentModule {

	type BasketService = BasketModule.BasketService;
	type CreditCard = PaymentInterfaces.ICreditCardModel;

	class PaymentCardsController {
		cards: CreditCard[];
		selectedCard:any = {};
		onSelectedCard: Function;

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		constructor(
			private paymentService: PaymentService,
			private cardService: CardService,
			public basketService: BasketService,
			private translationsService: TranslationsModule.TranslationsService) {
			this.translations = translationsService.translations;
		}


		$onInit() {
			this.paymentService.getCards().then(cards => {

				// Find the card that is IsDefault and set it to the selected card.
				let currentCreditCardId = this.basketService.basket.CreditCardId;

				this.selectedCard = this.cardService.findDefaultSelectedCard(cards, currentCreditCardId);

				// return the selected card to the CallBack
				this.onSelectedCard({ card: this.selectedCard });

				this.cards = cards;
			});
		}

		// When clicking on a card then set it it be the selected and return to callback
		public setSelectCard(card: CreditCard) {
			this.selectedCard = this.cardService.findDefaultSelectedCard(this.cards, card.CardId);
			this.onSelectedCard({ card: this.selectedCard });
			this.basketService.addCreditCard(card.CardId);
		}

	}

	class PaymentCardsComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = PaymentCardsController;
			this.template = HtmlTemplates.paymentCards.template.html;
			this.bindings = {
				onSelectedCard: "&"
			};
		}


	}

	angular.module(moduleId).component("paymentCards", new PaymentCardsComponent());
}
