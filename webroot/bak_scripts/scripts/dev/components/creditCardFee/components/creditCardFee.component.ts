///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 09/11/2016.
 */
namespace CreditCardFeeModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type CreditCardFeeService = CardFeeService;

	class CreditCardFeeController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public creditCardGroups;
		public selectedCreditCard;

		constructor(
			private creditCardFeeService: CreditCardFeeService,
			private translationsService: TranslationsService) {
			this.translations = translationsService.translations;
			this.selectedCreditCard = this.creditCardFeeService.defaultSelectedCreditCard;
		}

		$onInit() {
			this.creditCardGroups = this.creditCardFeeService.feeGroups;
		};


		/**
		 * @author MKI
		 * @description When user changes/selects a credit card the Fee price will be added basket
		 * @param groupId
		 */
		public selectedCardFee(groupId:string):void{
			this.creditCardFeeService.addCardFeeToBasket(groupId);
		}

	}

	class CreditCardFeeComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = CreditCardFeeController;
			this.template = HtmlTemplates.creditCardFees.template.html;
		}
	}

	angular.module(moduleId).component('creditCardFee', new CreditCardFeeComponent());
}
