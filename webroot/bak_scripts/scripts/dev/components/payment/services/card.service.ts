///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 12-09-2016.
 */

namespace PaymentModule {

	type CreditCard = PaymentInterfaces.ICreditCardModel;
	import TranslationsService = TranslationsModule.TranslationsService;

	export class CardService {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		constructor(private translationsService: TranslationsService) {
			this.translations = translationsService.translations;

		}

		// Find the Default selected Credit Card and returns the Card object
		public findDefaultSelectedCard(cards: CreditCard[], creditcardId : Number) {
			let defaultCard = null;

			for (let cardIndex in cards) {
				let card = cards[cardIndex];

				if (card.CardId === creditcardId) {
					defaultCard = card;
					break;
				}
				if (card.IsDefault) {
					defaultCard = card;
				}

			}


			//var keepGoing = true;
			//angular.forEach(cards, (card) => {
			//	if(keepGoing) {
			//		if (card.CardId === this.basketService.basket.CreditCardId) {
			//				defaultCard = card;
			//			}
			//			if (card.IsDefault) {
			//				defaultCard = card;
			//		}
			//	}
			//});

			// If no card has a IsDefault card Set then just use the first card in the collection or a empty object
			if(!defaultCard) {

				// TODO logic to be refactored
				if(cards.length === 0){
					defaultCard = null;
				}else{
					defaultCard = cards[0];
					defaultCard.IsDefault = true;
				}
			}

			return defaultCard;
		}

	}

	angular.module(moduleId).service("cardService", CardService);
}
