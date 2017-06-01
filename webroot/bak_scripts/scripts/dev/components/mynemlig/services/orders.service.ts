///<reference path="../../../../references/references.ts"/>

/**
 * Created by Kim Frost on 01/09/16.
 */


namespace MyNemligModule {

	import ErrorCodes = SCommerce.Website.Code.WebAPI.Models.Error.ErrorCodes;

	type BasicOrderHistoryViewModel = SCommerce.Website.Code.WebAPI.Models.Order.BasicOrderHistoryCollectionViewModel;
	type OrderHistoryViewModel = SCommerce.Website.Code.WebAPI.Models.Order.OrderHistoryViewModel;

	type TranslationsService = TranslationsModule.TranslationsService;
	type DialogService = DialogModule.DialogService;
	type BasketService = BasketModule.BasketService;

	export class OrdersService {

		constructor(private $q: ng.IQService,
			private $window: ng.IWindowService,
			private $http: ng.IHttpService,
			private dialogService: DialogService,
			private basketService: BasketService,
			private translationsService: TranslationsService,
			private settingsService: PageModule.SettingsService,
			private trackingService: TrackingModule.TrackingService) {
		}

		public getOrders = (skip: number = 0, take: number = 10): ng.IPromise<BasicOrderHistoryViewModel> => {
			let defer = this.$q.defer();
			this.$http({
				method: 'GET',
				url: `/webapi/order/GetBasicOrderHistory?skip=${skip}&take=${take}`
			}).then((response) => {
				defer.resolve(response.data);
			}, (response) => {
				defer.reject(response.data);
			});
			return defer.promise;
		};


		public getOrderDetails = (orderNumber: string): ng.IPromise<OrderHistoryViewModel> => {
			let defer = this.$q.defer();
			this.$http({
				method: 'GET',
				url: `/webapi/order/GetOrderHistory?orderNumber=${orderNumber}`
			}).then((response) => {
				defer.resolve(response.data);
			}, (response) => {
				defer.reject(response.data);
			});
			return defer.promise;
		};


		public editOrderModal = (orderId: string, orderNumber:string): ng.IPromise<any> => {
			let defer = this.$q.defer();

			let dialogObj = {
				header: this.translationsService.translations.MyNemlig.OrderModalEdit.Headline,
				content: `<div>${this.translationsService.translations.MyNemlig.OrderModalEdit.Body}</div>`,
				close: false,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.MyNemlig.OrderModalEdit.Cancel,
						confirm: false,
						callback: true
					},
					button2: {
						text: this.translationsService.translations.MyNemlig.OrderModalEdit.Confirm,
						confirm: true,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((response) => {
				this.dialogService.closeDialog();

				if (response === 2) {
					this.editOrder(orderId, orderNumber).then(() => {
						defer.resolve();
					}, () => {
						defer.reject();
					});
				}
				else {
					defer.reject();
				}
			});

			return defer.promise;
		};


		public copyOrderModal = (orderId: string, orderNumber:string): ng.IPromise<any> => {
			let defer = this.$q.defer();

			let dialogObj = {
				header: this.translationsService.translations.MyNemlig.OrderModalCopy.Headline,
				content: `<div>${this.translationsService.translations.MyNemlig.OrderModalCopy.Body}</div>`,
				close: false,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.MyNemlig.OrderModalCopy.Cancel,
						confirm: false,
						callback: true
					},
					button2: {
						text: this.translationsService.translations.MyNemlig.OrderModalCopy.Confirm,
						confirm: true,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((response) => {
				this.dialogService.closeDialog();

				if (response === 2) {
					this.copyOrder(orderId, orderNumber).then(() => {
						defer.resolve();
					}, () => {
						defer.reject();
					});
				}
				else {
					defer.reject();
				}
			});

			return defer.promise;
		};


		public cancelOrderModal = (orderId: string, orderNumber:string): ng.IPromise<any> => {
			let defer = this.$q.defer();

			let dialogObj = {
				header: this.translationsService.translations.MyNemlig.OrderModalCancel.Headline,
				content: `<div>${this.translationsService.translations.MyNemlig.OrderModalCancel.Body}</div>`,
				close: false,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.MyNemlig.OrderModalCancel.Cancel,
						confirm: false,
						callback: true
					},
					button2: {
						text: this.translationsService.translations.MyNemlig.OrderModalCancel.Confirm,
						confirm: true,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((response) => {
				this.dialogService.closeDialog();

				if (response === 2) {
					this.cancelOrder(orderId, orderNumber).then(() => {
						defer.resolve();
					}, () => {
						defer.reject();
					});
				}
				else {
					defer.reject();
				}
			});

			return defer.promise;
		};


		public editOrder = (orderId: string, orderNumber:string): ng.IPromise<any> => {
			let defer = this.$q.defer();
			let data = {
				OrderNumber: orderId
			};
			this.$http({ method: 'POST', url: '/webapi/order/EditOrder', data: data }).then((response) => {

				this.basketService.get().then(() => {
					this.trackingService.trackRefund(orderNumber, 'edit');
				});

				defer.resolve();
			}, (response) => {
				console.log("ERROR: ", response);
				this.parseError(response.data);
				defer.reject();
			});
			return defer.promise;
		};

		public copyOrder = (orderId: string, orderNumber:string): ng.IPromise<any> => {
			let defer = this.$q.defer();
			let data = {
				OrderNumber: orderId
			};
			this.$http({ method: 'POST', url: '/webapi/order/CopyOrder', data: data }).then((response) => {
				this.basketService.get();
				defer.resolve();
			}, (response) => {
				console.log("ERROR: ", response);
				this.parseError(response.data);
				defer.reject();
			});
			return defer.promise;
		};

		public cancelOrder = (orderId: string, orderNumber:string): ng.IPromise<any> => {
			let defer = this.$q.defer();
			let data = {
				OrderNumber: orderId
			};
			this.$http({
				method: 'POST',
				url: '/webapi/order/CancelOrder',
				data: data
			}).then(() => {
				this.basketService.get().then(() => {
					this.trackingService.trackRefund(orderNumber);
				});
				defer.resolve();
			}, (response) => {
				console.log("ERROR: ", response);
				this.parseError(response.data);
				defer.reject();
			});
			return defer.promise;
		};

		/**
		 * @NNH / MKI
		 * @param orderId
		 * @param uniqueId
		 * @returns {IPromise<T>}
		 */
		public getOrderSummary = (orderId: string, uniqueId: string): ng.IPromise<any> => {
			let defer = this.$q.defer();

			let settings = {
				method: 'GET',
				url: `/webapi/order/GetOrderSummary?orderNumber=${orderId}&uniqueId=${uniqueId}`
			};

			this.$http(settings)
				.then((res) => {
					defer.resolve(res.data);
				})
				.catch((response) => {
					console.log("ERROR: ", response);
					this.parseError(response.data);
					defer.reject();
				});

			return defer.promise;
		};

		public printOrder = (orderId: string, uniqueId: string) => {

			let myNemligPageUrl = this.settingsService.settings.MyNemligPrintFriendlyPageUrl;
			if (orderId) {
				this.$window.open(myNemligPageUrl + '/?orderid=' + orderId);
			}
		};

		private parseError = (error) => {
			switch (error.ErrorCode) {
				case ErrorCodes.OrderNotFound:

					break;
			}
			let dialogObj = {
				content: `<div>${error.ErrorMessage}</div>`,
				close: true,
				size: 'small'
			} as DialogModule.IDialogSettings;
			this.dialogService.openDialog(dialogObj);
		};
	}

	angular.module(moduleId).service("ordersService", OrdersService);
}
