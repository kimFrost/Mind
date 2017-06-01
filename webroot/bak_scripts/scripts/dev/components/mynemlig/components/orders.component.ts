///<reference path="../../../../references/references.ts"/>

namespace MyNemligModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type BasicOrderHistoryViewModel = SCommerce.Website.Code.WebAPI.Models.Order.BasicOrderHistoryCollectionViewModel;

	class OrdersController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public fetchAmount:number = 15;
		private ordersData = [];
		private pagination = {
			pages: [],
			activePage: 0
		};

		public states = {
			fetching: true,
			noOrders: true
		};

		constructor(private $element,
					private $scope:ng.IScope,
					private $timeout: ng.ITimeoutService,
					private ordersService:OrdersService,
					private translationsService:TranslationsService) {

			this.translations = translationsService.translations;
		}

		$onDestroy () {
			// Reset data and states
			this.states.fetching = false;
			this.ordersData = [];
		}

		$onInit() {
			this.states.fetching = true;
			this.ordersData = [];

			// Update orders list
			this.$scope.$on('orders::updateOrdersList', (orderNumber) => {
				this.updateOrderslist();
			});

			// Make sure that orders are fetched every time component loads 
			this.getOrderHistory();
		}

		// Fetch more data
		public fetchMoreData () {
			this.getOrderHistory(this.fetchAmount * (this.pagination.activePage), this.fetchAmount);
		}

		// Update orders list (on delete for example)
		public updateOrderslist() {
			this.getOrderHistory(0, this.fetchAmount, true);
		}

		// Create the orders list
		public createOrdersList(orders) {

			for (var i = 0; i < orders.Orders.length; i++) {
				this.ordersData.push(orders.Orders[i]);
			}

			// If orders are empty (no orders available)
			if (this.ordersData === [] || this.ordersData === undefined || this.ordersData.length === 0) {
				this.states.noOrders = true;
			} else {
				this.states.noOrders = false;
			}

		}


		// Get order history data
		public getOrderHistory = (skip: number = 0, take: number = this.fetchAmount, cleanSlate: boolean = false) => {

			// Make sure fetching state is triggered
			if (!this.states.fetching) {
				this.states.fetching = true;
			}

			// If clearing all order and fetching all again
			if (cleanSlate) {
				this.pagination.pages = [];
				this.pagination.activePage = 0;
				this.ordersData = [];
			}

			// Fetch orders from api service
			this.ordersService.getOrders(skip, take).then((response) => {
				this.pagination.pages = this.numberToArray(response.NumberOfPages);
				this.pagination.activePage++;

				this.createOrdersList(response);

				// Create a slight delay before hiding the loader, makes the UI more receivable for user experience
				this.$timeout(() => {
					this.states.fetching = false;
				}, 500);
				
			}).catch(() => {
				this.states.fetching = false;
			});
		};

		// Take number and create array from the amount.
		// Conversion for ngRepeat
		private numberToArray = function(num) {
			return new Array(num);   
		};

	}

	class OrdersComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				data: '<'
			};
			this.controller = OrdersController;
			this.template = HtmlTemplates.orders.html;
		}
	}

	angular.module(moduleId).component("orders", new OrdersComponent());

}
