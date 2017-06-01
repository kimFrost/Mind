///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 10/10/2016.
 */

namespace CheckoutModule {
	import TranslationsService = TranslationsModule.TranslationsService;
	type IMergeOrderViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.MergeOrderViewModel;
	type MergeOrdersHttpService = CheckoutModule.MergeOrdersHttpService;
	type BasketService = BasketModule.BasketService;

	export class MergeOrderViewStates {

		errors: Object = {
			hasErrors: false,
			message: ''
		};

		constructor(){}
	}


	export class MergeOrderService {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		private orders = {} as IMergeOrderViewModel;
		private states;

		constructor(
			private basketService: BasketService,
			private $rootScope: ng.IRootScopeService,
			private dialogService: DialogModule.DialogService,
			private mergeOrdersHttpService: MergeOrdersHttpService,
			private scrollService: UtilsModule.ScrollService,
			private translationsService: TranslationsService){
				this.translations = translationsService.translations;
				this.states = new MergeOrderViewStates() as CheckoutInterfaces.IMergeOrdersViewStatesModel;
		}


		/**
		 * @author MKI
		 * @description Merging orders are successful
		 * @param basket
		 * @private
		 */
		private _mergeOrdersSuccessful = (basket) => {
			this._updateBasket(basket);
			this._closeMergeOrdersModal();
			this._scrollToTop();
		};

		/**
		 * @author MKI
		 * @description Update the basket with basket response
		 * @param basket
		 * @private
		 */
		private _updateBasket(basket):void {
			this.basketService.basket = basket;
		}

		/**
		 * @author MKI
		 * @description Scroll window to top
		 * @private
		 */
		private _scrollToTop():void {
			this.scrollService.scrollToTop();
		}

		/**
		 * @author MKI
		 * @description Close the Merge Orders dialog
		 * @private
		 */
		private _closeMergeOrdersModal():void {
			this.dialogService.closeDialog();
		}


		/**
		 * @author MKI
		 * @description Merging orders has failed
		 * @param errorMessage
		 * @private
		 */
		private _mergeOrdersFailed = (errorMessage) => {
			this._setErrorStatus(true, errorMessage);
		};


		/**
		 * @author MKI
		 * @description Setting The orders in the service and opens the Merge Order dialog
		 * @param orders
		 * @private
		 */
		private _beginMergeProcedure(orders){
			this._setOrders(orders);
			this._clearErrorStatus();
			return this._openMergeOrdersDialog();
		}

		/**
		 * @author MKI
		 * @description Setting the Error state to false
		 * @private
		 */
		private _clearErrorStatus() {
			this.states.errors.hasErrors = false;
			this.states.errors.message = '';
		}


		/**
		 * @author MKI
		 * @description Opens a dialog modal with the merge-orders component
		 * @returns {ng.IPromise<any>}
		 * @private
		 */
		private _openMergeOrdersDialog(){

			const dialogSettings = {
				header: this.translations.Checkout.MergeOrders.MergeOrdersDialogHeadline,
				content: `<merge-orders></merge-orders>`,
				close: true,
				size: 'medium'
			};

			return this.dialogService.openDialog(dialogSettings);
		}


		/**
		 * @author MKI
		 * @description Setting errorStatus
		 * @param hasError
		 * @param message
		 * @private
		 */
		private _setErrorStatus(hasError, message) {
			this.states.errors.hasErrors = hasError;
			this.states.errors.message = message;
		}



		/**
		 * @author MKI
		 * @description Setting the private orders Object
		 * @param orders
		 * @private
		 */
		private _setOrders(orders) {
			this.orders = orders;
		}


		/**
		 * @author MKI
		 * @description Checks is there is placed other orders
		 * @param otherOrders
		 * @returns {boolean}
		 */
		public hasUserPlacedMultipleOrders(otherOrders:Array<any>){
			return MergeOrderService.hasOtherOrders(otherOrders);
		}


		/**
		 * @author MKI
		 * @description Begin MergeOrder Dialog if there is placed other Orders
		 * @param orders
		 */
		public startMergeOrders(orders:Array<IMergeOrderViewModel>):void {

			let hasPlacedOtherOrders = MergeOrderService.hasOtherOrders(orders);

			if(hasPlacedOtherOrders){
				this._beginMergeProcedure(orders);
			}

		}



		/**
		 * @author MKI
		 * @description User want´s to cancel the merge order & close the dialogBox
		 */
		public rejectToMergeOrders() {
			this.dialogService.closeDialog();
			this.$rootScope.$emit('DONT_MERGE_ORDERS');
		}


		/**
		 * @author MKI
		 * @description Returns Orders object for "MergeOrdersComponent" and View
		 * @returns {Object}
		 */
		public getOrders() {
			return this.orders;
		}


		/**
		 * @author MKI
		 * @description Sending selectedOrder to HTTP request for placing order.
		 * @param selectedOrder
		 */
		public mergeOrders(selectedOrder:IMergeOrderViewModel):void {

			let OrderId = selectedOrder.OrderId;

			this.mergeOrdersHttpService.mergeOrders(OrderId)
				.then(this._mergeOrdersSuccessful)
				.catch(this._mergeOrdersFailed);
		}


		/* STATIC */


		/**
		 * @author MKI
		 * @description Check if there is 1 or more placed orders
		 * @param orders
		 * @returns {boolean}
		 */
		static hasOtherOrders(orders:Array<IMergeOrderViewModel> = []){

			if(!orders){
				orders = [];
			}

			return orders.length >= 1;
		};

	}

	angular.module(moduleId).service("mergeOrderService", MergeOrderService);
}
