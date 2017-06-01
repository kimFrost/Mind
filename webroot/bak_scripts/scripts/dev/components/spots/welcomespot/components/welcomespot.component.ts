///<reference path="../../../../../references/references.ts"/>

namespace WelcomeSpotModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type UserService = UserModule.UserService;
	type SettingsService = PageModule.SettingsService;
	type OrdersService = MyNemligModule.OrdersService;
	type TimeslotStateService = TimeslotModule.TimeslotStateService;

	class WelcomeSpotController {

		public spotdata: any;
		public translations: Object;
		public settings: Object;
		public user;

		public states = {
			fetching: false,
			loaded: false
		};

		constructor(private $element,
			private $q: ng.IQService,
			private userService: UserService,
			private settingsService: SettingsService,
			private ordersService: OrdersService,
			private timeslotStateService: TimeslotStateService,
			private welcomeSpotService: WelcomeSpotService,
			private translationsService: TranslationsService,
			private generalUtilService: UtilsModule.GeneralUtilService) {


			$element.addClass('welcome-spot');
			this.translations = translationsService.translations;
			this.settings = settingsService.settings;
			userService.getUser().then((reponse) => {
				this.user = reponse;
			});
			this.getLatestOrder();
		}

		public getLatestOrder = () => {
			let defer = this.$q.defer();
			this.states.fetching = true;
			this.welcomeSpotService.getLatestOrderHistory().then((response) => {
				this.states.loaded = true;
				this.states.fetching = false;
				angular.merge(this.spotdata, response);
				
				defer.resolve();
			}).catch(() => {
				this.states.fetching = false;
				defer.reject();
			});
			return defer.promise;

		};

		public copyOrder = (orderId: string, orderNumber: string) => {
			if (orderId) {
				this.ordersService.copyOrderModal(orderId, orderNumber);
			}
		};

		public editOrder = (orderId: string, orderNumber: string) => {
			if (orderId) {
				this.ordersService.editOrderModal(orderId, orderNumber).then(() => {
					this.generalUtilService.goToBasket();
				});
			}
		};

		public newOrder = () => {
			this.timeslotStateService.setSelectorState(TimeslotModule.SelectorStates.Active);
			this.timeslotStateService.setTimeslotState(TimeslotModule.TimeslotStates.TimeslotSelector);
		};


	}

	class WelcomeSpotComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				spotdata: '<'
			};
			this.controller = WelcomeSpotController;
			this.template = HtmlTemplates.welcomespot.html;
		}
	}

	angular.module(moduleId).component("welcomespot", new WelcomeSpotComponent());

} 
