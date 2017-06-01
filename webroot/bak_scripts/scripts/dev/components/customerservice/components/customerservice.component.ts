///<reference path="../../../../references/references.ts"/>

namespace CustomerserviceModule {


	class CustomerserviceController {
		private isOpen = false;

		private page = 'home';

		public translations;

		constructor(
			private $element: ng.IRootElementService,
			private $timeout: ng.ITimeoutService,
			private customerserviceChatService: CustomerserviceChatService,
			private translationsService: TranslationsModule.TranslationsService,
			$rootScope: ng.IRootScopeService
		) { 
			this.translations = translationsService.translations;

			$rootScope.$on("OPEN_CHAT", (event, isOnline) => {
				if (!this.isOpen) {
					this.open();
				}
				
				if (isOnline) {
					this.goToChat();
				}
			});
		}

		$onInit() {
			this.customerserviceChatService.tryReconnect().then((reconnected) => {
				if (reconnected) {
					this.open();
					this.goToChat();
				}
			});
		}

		goToEmail() {
			this.page = 'email';
		}

		goToChat() {
			this.page = 'chat';
		}

		goHome() {
			this.page = 'home';
		}

		open() {
			this.isOpen = true;
			this.$element.removeClass('hide-open');
		}

		close() {
			this.$element.addClass('hide-open');
		}

		exit() {
			this.isOpen = false;
			this.$timeout(() => {
				this.page = 'home';
			}, 500);
		}

	}

	class CustomerserviceComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {};
			this.controller = CustomerserviceController;
			this.template = HtmlTemplates.customerservice.html;
		}
	}

	angular.module(moduleId).component('customerservice', new CustomerserviceComponent());

}
