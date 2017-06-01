/// <reference path="../../../../references/references.ts" />

namespace ContactModule {
	class ContactController {
		private subscription: any;
		private chatIsOnline = false;

		constructor(public translationsService: TranslationsModule.TranslationsService,
			public contactService: ContactService,
			private customerserviceChatService: CustomerserviceModule.CustomerserviceChatService,
			private $rootScope: ng.IRootScopeService) {
		}

		$onInit() {
			this.subscription = this.customerserviceChatService.availabilityChange$
				.distinctUntilChanged()
				.subscribe(status => {
					this.chatIsOnline = !(status === 'offline');
				});
		}

		$onDestroy() {
			this.subscription.dispose();
		}

		openChat() {
			this.$rootScope.$emit("OPEN_CHAT", this.chatIsOnline);
		}
	}

	class ContactComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				head: '@',
				subhead: '@'
			};
			this.controller = ContactController;
			this.template = HtmlTemplates.contact.html;
		}
	}

	angular.module(moduleId).component("contact", new ContactComponent());
} 