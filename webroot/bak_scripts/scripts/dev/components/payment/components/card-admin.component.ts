///<reference path="../../../../references/references.ts"/>

/**
 * Created by FBB on 13-09-2016.
 */
namespace PaymentModule {

	type CreditCard = PaymentInterfaces.ICreditCardModel;

	class CardAdminController {
		data;
		payMethod: string;
		cards: CreditCard[];
		fetching = false;

		constructor(
			private paymentService: PaymentService,
			private $rootScope: ng.IRootScopeService,
			public translationsService: TranslationsModule.TranslationsService,
			public settingsService: PageModule.SettingsService) {

			switch (this.data.PaymentType) {
				case 0:
					this.payMethod = translationsService.translations.Payment.PaymentMethods.PaymentCard;
					break;
				case 1:
					this.payMethod = translationsService.translations.Payment.PaymentMethods.Giro;
					break;
				case 2:
					this.payMethod = translationsService.translations.Payment.PaymentMethods.ElectronicInvoice;
					break;
				case 3:
					this.payMethod = translationsService.translations.Payment.PaymentMethods.DeliveryService;
					break;
				case 4:
					this.payMethod = translationsService.translations.Payment.PaymentMethods.PayEx;
					break;
				case 5:
					this.payMethod = translationsService.translations.Payment.PaymentMethods.GiroOneTime;
					break;
			}
		}


		$onInit() {
			this.getCards();

			this.$rootScope.$on("DIALOG_CALLBACK", () => {
				this.hideLoader();
			});
		}

		add() {
			this.showLoader();

			this.paymentService.addCard()
				.finally(() => {
					this.getCards();
				});
		}

		remove(card: CreditCard, $event: ng.IAngularEvent) {
			$event.stopPropagation();
			this.showLoader();
			this.paymentService.removeCard(card)
				.then(() => {
					this.getCards();
				});
		}

		makeDefault(card: CreditCard) {
			this.showLoader();
			this.paymentService.makeCardDefault(card)
				.then(() => {
					this.getCards();
				});
		}

		getCards() {
			this.showLoader();
			this.paymentService.getCards()
				.then(cards => {
					this.cards = cards;
				}).finally(() => {
					this.hideLoader();
				});
		}

		private showLoader() {
			this.fetching = true;
		}

		private hideLoader() {
			this.fetching = false;
		}

	}

	class CardAdminComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = CardAdminController;
			this.template = HtmlTemplates.cardAdmin.template.html;
			this.bindings = {
				data: '<'
			};
		}
	}

	angular.module(moduleId).component("cardAdmin", new CardAdminComponent());
}
