///<reference path="../../../../references/references.ts"/>

namespace NotificationbarModule {
	class NotificationbarController {
		public itemId: string;

		constructor(private $element, private $rootScope: ng.IRootScopeService, private ipCookie: IIpCookie, private $window: ng.IWindowService) {
		}

		public hideNotification() {
			this.ipCookie(this.itemId, "true", { domain: this.$window.location.hostname });
			this.$element.remove();
		}
	}

	class NotificationbarComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;
		public transclude: any;

		constructor() {
			this.bindings = {
				itemId: '@'
			};
			this.transclude = {
				content: 'content',
				close: 'close'
			};
			this.controller = NotificationbarController;
			this.template = HtmlTemplates.notificationbar.html;
		}
	}

	angular.module(moduleId).component("notificationbar", new NotificationbarComponent());
} 