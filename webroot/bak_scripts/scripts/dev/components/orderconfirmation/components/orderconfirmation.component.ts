///<reference path="../../../../references/references.ts"/>

namespace OrderConfirmationModule {

	type GeneralUtilService = UtilsModule.GeneralUtilService;
	type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;

	enum paymentMethods {
		PaymentCard,
		Giro,
		ElectronicInvoice,
		DeliveryService,
		PayEx,
		GiroOneTime
	}

	class OrderConfirmationController {
		public orderData: SCommerce.Website.Code.WebAPI.Models.Order.OrderConfirmationViewModel;
		public mainGroupArray = [];
		public validOrder: boolean;
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		private orderNumber: string;
		private uniqueId: string;
		private basketId: string;
		private unknownCard:boolean = false;
		private paymentMethodName: string;
		private paymentcardCode: string;

		public fetching: boolean = true;
		public errorObj = {};

		public orderHistoryPageUrl: string;

		constructor(
			private storageService: UtilsModule.StorageService,
			private basketService: BasketModule.BasketService,
			private checkoutService: CheckoutModule.CheckoutService,
			private checkoutAnonymousService: CheckoutModule.CheckoutAnonymousService,
			private dialogService: DialogModule.DialogService,
			private generalUtilService: GeneralUtilService,
			private orderConfirmationHttpService: OrderConfirmationHttpService,
			private ordersService: MyNemligModule.OrdersService,
			private settingsService: PageModule.SettingsService,
			private testConditionService: UtilsModule.TestConditionService,
			private trackingService: TrackingModule.TrackingService,
			public translationsService: TranslationsModule.TranslationsService,
			public userService: UserModule.UserService,
			private timeslotService: TimeslotModule.TimeslotService,
			private $location: ng.ILocationService,
			private $log: ng.ILogService,
			private $http: ng.IHttpService) {

			this.translations = translationsService.translations;
			this.orderHistoryPageUrl = this.settingsService.settings.MyNemligOrderHistoryPageUrl;
		}

		$onInit() {
			this.orderNumber = this.$location.search().orderNumber;
			this.uniqueId = this.$location.search().uniqueId;
			this.basketId = this.$location.search().basketId;

			this.getOrderSummary(this.orderNumber, this.uniqueId, this.basketId);
		}

		$onDestroy() {
			this.resetStoredDataAndStates();
			this.$location.search("orderNumber", null);
			this.$location.search("uniqueId", null);
			this.$location.search("basketId", null);
		}

		/**
		 * @author MKI
		 * @description Clear the Checkout session data
		 * @private
		 */
		private removeOldDataFromStorage() {
			const SESSION_NAME = 'checkoutData';
			this.storageService.remove(SESSION_NAME);
		}

		private resetStoredDataAndStates() {
			this.removeOldDataFromStorage();
			this.checkoutAnonymousService.clearFormData();
			this.checkoutService.showDeliveryInformation(false);
		}


		/**
		 * @author MKI
		 * @description Check that order is the correct format
		 * @param orderNumber
		 * @returns {boolean}
		 */
		private isOrderNumberValid(orderNumber: string): boolean {

			let conditionsForValidOrderNumber = [
				this.testConditionService.test.strings.mayNotBeEmpty(orderNumber),
				this.testConditionService.test.strings.mayNotBeNull(orderNumber),
				this.testConditionService.test.strings.mayNotBeOfValueNull(orderNumber),
			];

			return this.testConditionService.isAllConditionsTrue(conditionsForValidOrderNumber);
		}

		private isBasketIdValid(basketId: string): boolean {

			let conditionsForValidOrderNumber = [
				this.testConditionService.test.strings.mayNotBeEmpty(basketId),
				this.testConditionService.test.strings.mayNotBeNull(basketId),
				this.testConditionService.test.strings.mayNotBeOfValueNull(basketId),
			];

			return this.testConditionService.isAllConditionsTrue(conditionsForValidOrderNumber);
		}


		/**
		 * @author MKI
		 * @description Check that order is the correct format
		 * @param uniqueId
		 * @returns {boolean}
		 */
		private isUniqueIdValid(uniqueId: string): boolean {

			let invalidUniqueId = '00000000-0000-0000-0000-000000000000';

			let conditionsForValidOrderNumber = [
				this.testConditionService.test.strings.mayNotBeEmpty(uniqueId),
				this.testConditionService.test.strings.mayNotBeNull(uniqueId),
				this.testConditionService.test.strings.mayNotBeOfValueNull(uniqueId),
				this.testConditionService.test.strings.mustContainSymbol(uniqueId, '-'),
				this.testConditionService.test.strings.mustNotMatch(uniqueId, invalidUniqueId)
			];

			return this.testConditionService.isAllConditionsTrue(conditionsForValidOrderNumber);
		}

		/**
		 * @author NNH /MKI
		 * @description Initialize Order Confirmation page if there is data or show error page
		 * @param orderSummaryData
		 * @private
		 */
		private getOrderSummarySuccessfully = (orderSummaryData) => {

			if (orderSummaryData) {
				this.initOrderConfirmation(orderSummaryData);
				this.checkoutService.showDeliveryInformation(false);
				this.basketService.get();

				// Reset all things Timeslot selector and delivery zone on basket 
				this.timeslotService.resetDeliveryZoneAndTimeslot(TimeslotModule.DeliveryZoneStates.None);
			} else {
				this.getErrorPage();
			}
		};

		/**
		 * @author MKI
		 * @description Inform user that .we could not get order summary but order "Should" be placed
		 * @private
		 */
		private orderSummaryFailedToLoad() {
			let messageToUser;
			this.orderConfirmationHttpService.orderConfirmationSummaryFailed()
				.then((informationMessage) => {
					messageToUser = informationMessage;
				})
				.catch(() => {
					messageToUser = this.translations.Checkout.OrderConfirmation.OrderSummaryFailedDefaultText;
				})
				.finally(() => {
					this.generalUtilService.goToUrl('/');
					this.showOrderConfirmationFailedDialog(messageToUser);
				});
		}


		/**
		 * @author MKI
		 * @description Order has failed with status 400 and Modal is displayed with message from backend
		 * @param err
		 * @private
		 */
		private orderIsFailed(err) {
			let hasErrorStatusCodes = this.testConditionService.test.objects.hasPropertyName(err, 'ErrorCode');

			if (hasErrorStatusCodes) {

				let headline = this.translations.Checkout.OrderConfirmation.OrderSummaryFailedDialogHeader;
				let message = err.ErrorMessage;
				this.showOrderConfirmationFailedDialog(message, headline);
			}
		}

		/**
		 * @author MKI
		 * @description getOrderSummary HTTP request failed.
		 * @private
		 */
		private getOrderSummaryFailed = (err) => {

			this.fetching = false;

			let isStatusCodeFourhundred = this.testConditionService.test.numbers.isNumberEqual(err.status, 400);

			if (isStatusCodeFourhundred) {
				this.orderIsFailed(err.data);
			} else {
				this.orderSummaryFailedToLoad();
			}

		};

		/**
		 * @author NNH / MKI
		 * @description Getting the order summary from HTTP if orderNumber and uniqueId is set
		 */
		private getOrderSummary(orderNumber: string = '', uniqueId: string = '', basketId: string = ''): void {

			let conditions = [
				this.isOrderNumberValid(orderNumber),
				this.isUniqueIdValid(uniqueId),
				this.isBasketIdValid(basketId)
			];


			let conditionsIsValid = this.testConditionService.isAllConditionsTrue(conditions);

			if (conditionsIsValid) {
				this.orderConfirmationHttpService.getOrderSummary(orderNumber, uniqueId, basketId)
					.then(this.getOrderSummarySuccessfully)
					.catch(this.getOrderSummaryFailed);
			} else {
				this.getErrorPage();
			}
		}

		/**
		 * @author MKI
		 * @description Show a dialog with information that Order summery has failed, but order has been placed
		 * @param message
		 * @param header
		 * @private
		 */
		private showOrderConfirmationFailedDialog(message: string = this.translations.Checkout.OrderConfirmation.OrderSummaryFailedDefaultText, header?: string) {

			let headline;

			if (header) {
				headline = header;
			} else {
				headline = this.translations.Checkout.OrderConfirmation.OrderSummaryFailedModalHeadline;
			}

			const settings = {
				header: headline,
				content: `<div>${message}</div>`,
				close: true,
				size: 'medium'
			};

			this.dialogService.openDialog(settings);
		}


		private initOrderConfirmation(basket) {
			// Map the payment method number to a string to use with translation object in DOM
			this.paymentMethodName = paymentMethods[basket.PaymentMethod];
			this.paymentcardCode = this.getCreditCardCode(basket.CreditCardType);
			this.orderData = basket;
			this.createMainGroups();
			this.validOrder = true;
			this.fetching = false;

			// If card is unknow, i.e. not saved in system, we know nothing about it
			if (basket.SelectedPaymentInfo.CardType === "") {
				this.unknownCard = true;
			} else {
				this.unknownCard = false;
			}

			this.trackingService.checkout(4, undefined, this.orderData);
		}


		private getCreditCardCode (cardCode) {
			let translationCode;
			
			switch (cardCode) {
				case 'DK':
					translationCode = 'Dk';
					break;
				case 'V-DK':
					translationCode = 'VisaDk';
					break;
				case 'VISA(SE)':
					translationCode = 'VisaSe';
					break;
				case 'VISA':
					translationCode = 'Visa';
					break;
				case 'MC(DK)':
					translationCode = 'McDk';
					break;
				case 'MC(SE)':
					translationCode = 'McSe';
					break;
				case 'MC':
					translationCode = 'Mc';
					break;
				case 'DIN(DK)':
					translationCode = 'DinDk';
					break;
				case 'DIN':
					translationCode = 'Din';
					break;
				case 'AMEX(DK)':
					translationCode = 'AmexDk';
					break;
				case 'AMEX':
					translationCode = 'Amex';
					break;
				case 'MTRO(DK)':
					translationCode = 'MtroDk';
					break;
				case 'MTRO':
					translationCode = 'Mtro';
					break;
				case 'ELEC':
					translationCode = 'Elec';
					break;
				case 'JCB':
					translationCode = 'Jcb';
					break;
				case 'FFK':
					translationCode = 'Ffk';
					break;
				default:
					translationCode = null;
					break;
			};

			return translationCode;
		};

		private getErrorPage() {
			this.$http({ method: 'GET', url: this.settingsService.settings.NotFoundUrl + "?GetAsJson=1" })
				.then((res) => {
					this.errorObj = res.data;
					this.validOrder = false;
					this.fetching = false;
				})
				.catch((err) => {
					this.$log.log(`Could not get 404 page ${err}`);
				});
		}

		public createMainGroups() {
			this.orderData.Lines.forEach(item => {
				if (this.mainGroupArray.indexOf(item.MainGroupName) === -1) {
					this.mainGroupArray.push(item.MainGroupName);
				}
			});
		}

	}

	class OrderConfirmationComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = OrderConfirmationController;
			this.template = HtmlTemplates.orderconfirmation.html;
		}
	}

	angular.module(moduleId).component("orderconfirmation", new OrderConfirmationComponent());
}
