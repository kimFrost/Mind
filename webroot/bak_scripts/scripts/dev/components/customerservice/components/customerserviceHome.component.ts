///<reference path="../../../../references/references.ts"/>

namespace CustomerserviceModule {

	class CustomerserviceHomeController {

		private chatIsOnline: boolean = false;
		private openingHours = {};

		private onGoToEmail: (event: any) => void;
		private onGoToChat: (event: any) => void;

		private subscription: any;

		public translations;

		constructor(
			private customerserviceChatService: CustomerserviceChatService,
			private translationsService: TranslationsModule.TranslationsService,
			private settingsService: PageModule.SettingsService,
			private trackingService: TrackingModule.TrackingService
		) {
			this.translations = translationsService.translations;
		}

		$onInit() {
			this.subscription = this.customerserviceChatService.availabilityChange$
				.distinctUntilChanged()
				.subscribe(status => {
					this.chatIsOnline = status === 'offline' ? false : true;
				});

			this.openingHours = {
				monday: {
					from: this.settingsService.settings.SalesforceSettings.MondayFrom,
					to: this.settingsService.settings.SalesforceSettings.MondayTo
				},
				tuesday: {
					from: this.settingsService.settings.SalesforceSettings.TuesdayFrom,
					to: this.settingsService.settings.SalesforceSettings.TuesdayTo
				},
				wednesday: {
					from: this.settingsService.settings.SalesforceSettings.WednesdayFrom,
					to: this.settingsService.settings.SalesforceSettings.WednesdayTo
				},
				thursday: {
					from: this.settingsService.settings.SalesforceSettings.ThursdayFrom,
					to: this.settingsService.settings.SalesforceSettings.ThursdayTo
				},
				friday: {
					from: this.settingsService.settings.SalesforceSettings.FridayFrom,
					to: this.settingsService.settings.SalesforceSettings.FridayTo
				},
				saturday: {
					from: this.settingsService.settings.SalesforceSettings.SaturdayFrom,
					to: this.settingsService.settings.SalesforceSettings.SaturdayTo
				},
				sunday: {
					from: this.settingsService.settings.SalesforceSettings.SundayFrom,
					to: this.settingsService.settings.SalesforceSettings.SundayTo
				}
			};
		}

		$onDestroy() {
			this.subscription.dispose();
		}

		goToEmail() {
			this.trackingService.trackCustomerService('email');
			this.onGoToEmail({ $event: '' });
		}
		goToChat() {
			this.trackingService.trackCustomerService('chat');
			this.onGoToChat({ $event: '' });
		}

		public endChatSession() {
			this.subscription.dispose();
		}

	}

	class CustomerserviceHomeComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				onGoToEmail: '&',
				onGoToChat: '&'
			};
			this.controller = CustomerserviceHomeController;
			this.template = HtmlTemplates.customerservicehome.html;
		}
	}

	angular.module(moduleId).component('customerserviceHome', new CustomerserviceHomeComponent());

}
