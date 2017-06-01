///<reference path="../../../../references/references.ts"/>

/**
 * Created by FBB on 12-09-2016.
 */

namespace PaymentModule {

	type CreditCard = PaymentInterfaces.ICreditCardModel;
	type IOrderSummary = PaymentInterfaces.IOrderSummaryModel;


	const CHECKOUT_API_PATH = '/webapi/Checkout/';

	export class PaymentService {

		constructor(
			private basketService: BasketModule.BasketService,
			private dialogService: DialogModule.DialogService,
			private paymentHttpService: PaymentHttpService,
			private settingsService: PageModule.SettingsService,
			private $http: ng.IHttpService,
			private $rootScope: ng.IRootScopeService,
			private $q: ng.IQService,
			private $window: ng.IWindowService) { }

		private getPaymentForm(action: string = 'pay') {
			let url;
			if (action === 'pay') {
				url = CHECKOUT_API_PATH + 'GetPaymentForm';
			} else if (action === 'preauth') {
				url = CHECKOUT_API_PATH + 'GetTicketSubscriptionForm';
			} else {
				throw (new Error('Invalid action'));
			}
			return this.$http({
				url,
				method: 'POST'
			}).then(res => res.data).catch(err => err);
		}

		/**
		 * @author MKI
		 * @description Get a new basket
		 * @private
		 */
		private _getNewBasket() {
			this.basketService.get();
		}

		public generateRandomId() {
			return 'payment-' + Math.floor(Math.random() * 1000);
		}

		private displayForm(fields) {
			let id = this.generateRandomId();

			let defer = this.$q.defer();

			let formElement = document.createElement('form');
			formElement.action = fields.Action;
			formElement.method = 'POST';
			formElement.target = id;
			formElement.id = "paymentForm";
			formElement.style.display = "none";

			Object.keys(fields.HiddenFields)
				.forEach(field => {
					let fieldElement = document.createElement('input');
					fieldElement.name = field;
					fieldElement.value = fields.HiddenFields[field];
					formElement.appendChild(fieldElement);
				});

			window['onPaymentComplete'] = (res) => {
				this.$rootScope.$emit('DIALOG_CLOSE');
				window['onPaymentError'] = null;
				window['onPaymentComplete'] = null;
				defer.resolve(res);
			};

			window['onPaymentError'] = (err) => {
				this.$rootScope.$emit('DIALOG_CLOSE');
				window['onPaymentError'] = null;
				window['onPaymentComplete'] = null;

				defer.reject(err);
			};

			angular.element(this.$window).on("message", (response) => {
				angular.element(document.getElementsByClassName("payment-iframe")[0]).css("height", response.data + "px");
			});

			this.dialogService.openDialog({
				content: `<div class="payment-modal">
								<iframe class="payment-iframe" id="${id}" name="${id}"></iframe>
								<div class="payment-order-creditcard">
									<img src="/s/${this.settingsService.settings.BuildVersion}/scom/dist/images/smallcards.png" alt="Dankort, VISA, Visa Electron, Mastercard, Maestro Card, Amex, JCB" />
								</div>
							</div>`,
				close: true,
				size: 'small',
				appendClass: 'dialog_payment',
				fullscreenMobile: true
			} as DialogModule.IDialogSettings);

			let bodyElement = document.getElementsByTagName("body")[0];
			bodyElement.appendChild(formElement);
			formElement.submit();
			bodyElement.removeChild(document.getElementById("paymentForm"));

			return defer.promise;
		}

		/**
		 * @author FBB / NNH
		 * @description
		 * @returns {IPromise<TResult>}
		 */
		public payWithNoCard() {
			return this.getPaymentForm()
				.then((fields) => {
					return this.displayForm(fields).then((validateBasket) => {
						return validateBasket;
					});
				});
		}

		public getCards() {
			return this.paymentHttpService.getCards();
		}


		/**
		 * @author FBB / MKI
		 * @description Open add new card window, if successful then get a new basket
		 * //TODO looks like displayForm returns new basket Object but BE is unsure.
		 *  proper way is to update basket instead of make new HTTP call
		 * @returns {IPromise<TResult>}
		 */
		public addCard() {
			return this.getPaymentForm('preauth')
				.then((fields) => {
					return this.displayForm(fields)
						.then(() => {
							this._getNewBasket();
						});
				});
		}

		/**
		 * @author MKI
		 * @description Send request to remove Card, is success then get new basket
		 * @param card
		 * @returns {IPromise<TResult>}
		 */
		public removeCard(card: CreditCard) {
			return this.paymentHttpService.removeCreditCard(card)
				.then((isCardRemoved) => {
					if(isCardRemoved){
						this._getNewBasket();
					}
				})
				.catch(() => {});
		}

		/**
		 * @author MKI
		 * @description Send request to make Card default, is success then get new basket
		 * @param card
		 * @returns {IPromise<TResult>}
		 */
		public makeCardDefault(card: CreditCard) {

			return this.paymentHttpService.makeCardDefault(card)
				.then((isCardMadeDefault) => {
					if(isCardMadeDefault){
						this._getNewBasket();
					}
				})
				.catch(() => {});
		}

	}

	angular.module(moduleId).service("paymentService", PaymentService);
}
