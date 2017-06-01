///<reference path="../../../../references/references.ts"/>

namespace BasketModule {
	type CheckoutService = CheckoutModule.CheckoutService;
	type GeneralUtilService = UtilsModule.GeneralUtilService;
	type StatesService = UtilsModule.StatesService;
	type TranslationsService = TranslationsModule.TranslationsService;

	enum BasketListType {
		Groups,
		Recipes
	}

	class BasketController {
		public listType: BasketListType = BasketListType.Groups;
		public states = {} as BasketInterfaces.IBasketStates;
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public ctaInView = false;

		constructor(
			private $element,
			private $scope: ng.IScope,
			private $window: ng.IWindowService,
			public basketService: BasketService,
			public checkoutService: CheckoutService,
			private createUserService: UserModule.CreateUserService,
			private generalUtilService: GeneralUtilService,
			private scrollService: UtilsModule.ScrollService,
			private statesService: StatesService,
			private timeslotService: TimeslotModule.TimeslotService,
			public translationsService: TranslationsService,
			public cookieWarningService: CookieWarningModule.CookieWarningService,
			private dialogService: DialogModule.DialogService) {

			$element.addClass('basket');
			this.translations = translationsService.translations;
			this.states = basketService.getStates();

			this.handleCtaInView = this.handleCtaInView.bind(this);
			angular.element($window).on("scroll", this.handleCtaInView);
		}

		$onInit() {
			// Hide mini basket
			this.statesService.setState('minibasketVisible', false);
		}

		$onDestroy() {
			angular.element(this.$window).off("scroll", this.handleCtaInView);
		}

		private handleCtaInView() {
			const inView = this.$window.innerHeight >= Math.floor(this.$element[0].getElementsByClassName('basket__cta-sticky_position')[0].getBoundingClientRect().top);
			if (inView !== this.ctaInView) {
				this.$scope.$applyAsync(() => {
					this.ctaInView = inView;
				});
			}
		}

		/**
		 * @author MKI
		 * @description Takes user back to last visited page
		 */
		public continueShopping(): void {
			this.generalUtilService.goBack();
		}

		public displayCreditCardFeeSelector() {
			return this.basketService.displayCreditCardFeeSelector();
		}


		/**
		 * @author MKI
		 * @description User clicks proceed to payment, if valid time slot the proceed else open time slot picker & zone
		 */
		public proceedToPayment(): void {
			let hasValidTimeSlot = this.states.isTimeSlotSelected;
			let hasValidZipcode = !this.states.isDeliveryAddressEmpty;
			let isBasketEmpty = this.states.isBasketEmpty;

			// Tell checkout that user wants to go to the payment section
			// This is so that we can continue any interrupted flow, 
			// i.e.if user has to login/ select timeslot before accessing the payment section
			this.checkoutService.gotoPaymentFlowInitialiser(true);

			// If basket is empty, stop everything!
			if (isBasketEmpty) {
				return;
			}

			// If timeslot is selected, go to checkout/payment step
			if (hasValidTimeSlot) {
				this.checkoutService.showDeliveryInformation(true);
			}

			// If valid zipcode is present, but no timeslot, show timeslot selector
			else if (hasValidZipcode) {
				this.timeslotService.openTimeslotSelector();
			}

			// If nothing above is present, we show the login/check zipcode
			else {
				this.basketService.openCheckZipCodeOrLogin();
			}
		}

		public showClearBasketModal = () => {
			let dialogObj = {
				header: this.translationsService.translations.Basket.Nav.ClearBasket,
				content: `<div>${this.translationsService.translations.Basket.Nav.ClearBasketWarning}</div>`,
				close: false,
				size: 'small',
				buttons: {
					button1: {
						text: this.translationsService.translations.General.Responses.No,
						confirm: false,
						callback: true
					},
					button2: {
						text: this.translationsService.translations.General.Responses.Yes,
						confirm: true,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((response) => {
				this.dialogService.closeDialog();
				
				if (response === 2) {
					this.basketService.clearBasket().finally(() => {
						this.scrollService.scrollToTop();
					});
				}
			});
		};
	}

	class BasketComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = BasketController;
			this.template = HtmlTemplates.basket.html;
		}
	}

	angular.module(moduleId).component("basket", new BasketComponent());

}
