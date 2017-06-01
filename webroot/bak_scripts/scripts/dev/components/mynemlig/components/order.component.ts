///<reference path="../../../../references/references.ts"/>


namespace MyNemligModule {

	type OrderLineHistoryViewModel = SCommerce.Website.Code.WebAPI.Models.Order.OrderLineHistoryViewModel;

	type TranslationsService = TranslationsModule.TranslationsService;
	type GeneralUtilService = UtilsModule.GeneralUtilService;

	interface ILineGroupModel {
		Title: string;
		Lines: OrderLineHistoryViewModel[];
	}

	class OrderController {

		public translations:Object;
		public data:any;
		public onLoaded:Function;
		public print:boolean;
		public lineGroups:ILineGroupModel[];
		public states = {
			open: false,
			fetching: false,
			loaded: false
		};

		constructor(private $element,
					private $location: ng.ILocationService,
					private $scope:ng.IScope,
					private $q:ng.IQService,
					private ordersService:OrdersService,
					private generalUtilService:GeneralUtilService,
					private translationsService:TranslationsService) {

			// Open if query string contains Id or OrderNumber
			var orderId = this.$location.search().orderid !== undefined ? this.$location.search().orderid : null;
			var orderNumber = this.$location.search().ordernumber !== undefined ? this.$location.search().ordernumber : null;

			if (orderId !== null) {
				if (parseInt(orderId, 10) === this.data.Id) { 
					this.toggleOpen(!this.states.open);
				}
			} else if (orderNumber !== null) {
				if (orderNumber === this.data.OrderNumber) { 
					this.toggleOpen(!this.states.open);
				}
			}

			

			$element.addClass('order');
			this.translations = translationsService.translations;
		}

		$onInit = () => {
			if (this.print) {
				this.$element.addClass('order_print');
				this.updateGroups();
			}
		};

		public updateGroups = () => {
			this.lineGroups = [];
			if (!Array.isArray(this.data.Lines)) {
				return;
			}
			this.data.Lines.forEach((line) => {
				let found = false;
				this.lineGroups.forEach((group) => {
					if (group.Title === line.GroupName) {
						found = true;
						group.Lines.push(line);
					}
				});
				if (!found) {
					let group = {} as ILineGroupModel;
					group.Title = line.GroupName;
					group.Lines = [];
					group.Lines.push(line);
					this.lineGroups.push(group);
				}
			});
		};

		public getDetails = () => {
			let defer = this.$q.defer();
			this.states.fetching = true;
			this.ordersService.getOrderDetails(this.data.Id).then((response) => {
				this.states.loaded = true;
				this.states.fetching = false;
				angular.merge(this.data, response);
				this.onLoaded();

				defer.resolve();
			}).catch(() => {
				this.states.fetching = false;
				defer.reject();
			});
			return defer.promise;
		};

		public toggleOpen = (state) => {
			state = (state === undefined) ? !this.states.open : state;
			this.states.open = state;
			if (this.states.open) {
				if (!this.states.loaded) {
					this.getDetails().then(() => {
						this.updateGroups();
						this.$element.addClass('order_open');
					}).catch(() => {
						this.toggleOpen(false);
					});
				}
				else {
					this.$element.addClass('order_open');
				}
			}
			else {
				this.$element.removeClass('order_open');
			}
		};

		public editOrder = (orderId:string, orderNumber:string) => {
			this.ordersService.editOrderModal(orderId, orderNumber).then(() => {
				this.generalUtilService.goToBasket();
			});
		};

		public copyOrder = (orderId:string, orderNumber:string) => {
			this.ordersService.copyOrderModal(orderId, orderNumber).then(() => {
				this.generalUtilService.goToBasket();
			});
		};

		public cancelOrder = (orderId:string, orderNumber:string) => {
			this.ordersService.cancelOrderModal(orderId, orderNumber).then(() => {
				this.$scope.$emit('orders::updateOrdersList');
			});
		};

		public printOrder = (orderId:string, orderNumber:string) => {
			this.ordersService.printOrder(orderId, orderNumber);
		};

	}

	class OrderComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				data: '<',
				print: '<',
				onLoaded: '&'
			};
			this.controller = OrderController;
			this.template = HtmlTemplates.order.html;
		}
	}

	angular.module(moduleId).component("order", new OrderComponent());

}
