///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 10/10/2016.
 */

namespace CheckoutModule {

	export class HelperService {

		constructor(
			private dialogService: DialogModule.DialogService){}

		
		private _basketValidationTemplate(errorsArray:Array<any> = []):string {
			let template = "";
			const templateArray = [];

			errorsArray.forEach(value => {
				templateArray.push(`<div class="basket-validation-dialog__group">`);
				
				const header = !value.Header ? "" : value.Header;

				templateArray.push(`<div class="basket-validation-dialog__header">${header}</div>`);
				
				value.Messages.forEach(value => {
					if(!value) {
						return;
					}else{
						templateArray.push(`<div class="basket-validation-dialog__value">${value}</div>`);
					}
				});

				templateArray.push("</div>");
			});

			template = templateArray.join("");
			return template;

		};


		/**
		 * @description Create a Order summary Object that should be used for detail in the DIBS CreditCard Payment window
		 * @param basketResponse
		 * @returns {any}
		 * TODO can be refaced
		 * @private
		 */
		public _createOrderSummaryObject(basketResponse) {

			// Get Params from basket response and add then to local variable "Object Destructuring"
			let {
				OrderNumber,
				NumberOfProducts,
				TotalProductsPrice,
				NumberOfDeposits,
				TotalDepositsPrice,
				NumberOfBags,
				TotalBagsPrice,
				DeliveryPrice,
				TotalProductDiscountPrice,
				NemligAccount,
				CreditCardFee,
				TotalPrice
			} = basketResponse;

			// Add New object from variables "Object Initialization"
			let basketOrderSummary = {
				OrderNumber,
				NumberOfProducts,
				TotalProductsPrice,
				NumberOfDeposits,
				TotalDepositsPrice,
				NumberOfBags,
				TotalBagsPrice,
				DeliveryPrice,
				TotalProductDiscountPrice,
				NemligAccount,
				CreditCardFee,
				TotalPrice
			};

			// Required Properties for the orderSummary
			let requiredProperties = {
				OrderNumber: '',
				NumberOfProducts: 0,
				TotalProductsPrice: 0,
				NumberOfDeposits: 0,
				TotalDepositsPrice: 0,
				NumberOfBags: 0,
				TotalBagsPrice: 0,
				DeliveryPrice: 0,
				TotalProductDiscountPrice: 0,
				NemligAccount: 0,
				CreditCardFee: 0,
				TotalPrice: 0
			};

			return angular.extend({}, requiredProperties, basketOrderSummary);
		}

		/**
		 * @author MKI
		 * @description Converts paymentNumber to Name
		 * @param paymentNumber
		 * @returns {string}
		 * TODO make static
		 * @private
		 */

		private _paymentMethodHasPaymentName(paymentNumber:number = 0):string {

			let paymentName:string;

			switch(paymentNumber) {
				case Vertica.Intervare.Model.Values.PaymentMethod.Default:
					paymentName = 'PaymentCard';
					break;
				case Vertica.Intervare.Model.Values.PaymentMethod.Giro:
					paymentName = 'Giro';
					break;
				case Vertica.Intervare.Model.Values.PaymentMethod.ElektroniskFakturering:
					paymentName = 'ElectronicInvoice';
					break;
				case Vertica.Intervare.Model.Values.PaymentMethod.Leverandørservice:
					paymentName = 'DeliveryService';
					break;
				case Vertica.Intervare.Model.Values.PaymentMethod.PayEx:
					paymentName = 'PayEx';
					break;
				case Vertica.Intervare.Model.Values.PaymentMethod.GiroOneTime:
					paymentName = 'GiroOneTime';
					break;
				default:
					paymentName = 'PaymentCard';
			}
			return paymentName;
		}

		//Public

		/**
		 * @author MKI
		 * @description Creates a template to show basket validation errors
		 * @param errorsArray
		 * @returns {String}
		 */
		public createValidationTemplate(errorsArray:Array<any> = []):String{
			return this._basketValidationTemplate(errorsArray);
		}

		/**
		 * @author MKI
		 * @description Return the Payment name from the corresponding number
		 * @param paymentNumber
		 * @returns {string}
		 */
		public convertPaymentNumberToPaymentName(paymentNumber:number):string{
			return this._paymentMethodHasPaymentName(paymentNumber);
		}

		public createOrderSummaryForPayment(basketResponse){
			return this._createOrderSummaryObject(basketResponse);
		}

		// Check if predicate is in array.
		// Todo can be converted to array.find in ES2015
		//TODO can be deleted

		isInArray(value:string, array):boolean {
			return array.indexOf(value) > -1;
		}

		/**
		 * @author MKI
		 * @description Opens a modal dialog
		 * @param content
		 * @param settings
		 */
		public openDialog(content = '', settings = {}){

			let defaultSettings = {
			 	header: '',
			 	content: `<div>${content}</div>`,
			 	close: true,
			 	size: 'medium'
			 } as DialogModule.IDialogSettings;

			let dialogSettings = angular.extend({}, defaultSettings, settings);
			this.dialogService.openDialog(dialogSettings);
		}

		/**
		 * @author MKI
		 * @description Check if StatusCode is 400
		 * @param statusCode
		 * @returns {boolean}
		 * TODO can be deleted
		 */
		public isStatusFourHundred(statusCode) {
			return statusCode === 400;
		}
	}

	angular.module(moduleId).service("checkoutHelperService", HelperService);
}
