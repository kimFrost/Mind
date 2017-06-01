///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 09/11/2016.
 */

namespace CreditCardFeeModule {
	import TranslationsService = TranslationsModule.TranslationsService;
	import BasketService = BasketModule.BasketService;

	type CreditCardFeeGroupViewModel = FeeGroupViewModel;

	export class CardFeeService {

		public feeGroups = {} as CreditCardFeeGroupViewModel;
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public defaultSelectedCreditCard:any = {};

		constructor(
			private $rootScope,
			private basketService: BasketService,
			private translationsService: TranslationsService,
			private creditCardFeeHttpService: CardFeeHttpService){

			this.translations = translationsService.translations;
			this._getCreditCardFeeGroups();
			this._watchOnBasket();
		}

		/**
		 * @author MKI
		 * @description Watch on basket changes & set the "defaultSelectedCreditCard" to GroupFeeId
		 * @private
		 */
		private _watchOnBasket() {
			this.$rootScope.$watch(() => {
				return this.basketService.basket;
			}, (basket) => {
				angular.merge(this.defaultSelectedCreditCard, basket.GroupFee);
			});
		}

		/**
		 * @author MKI
		 * @description Get credit card groups from Http request and assign it to this.feeGroups
		 * @private
		 */
		private _getCreditCardFeeGroups():void {
			this.creditCardFeeHttpService.getFeeGroups().then((res:CreditCardFeeGroupViewModel) => {
				angular.merge(this.feeGroups, res);
			});
		}


		/**
		 * @author MKI
		 * @description Sending feeGroupId to HTTP. that adds selected card fee to basket
		 * @param feeGroupId
		 */
		public addCardFeeToBasket(feeGroupId:string):void {
			this.creditCardFeeHttpService.addFee(feeGroupId).then((basket) => {
				this.basketService.basket = basket;
			});
		}

	}

	angular.module(moduleId).service("creditCardFeeService", CardFeeService);
}
