/// <reference path="../../../../references/references.ts" />

namespace UtilsModule {

	export class SwipeService {
		private swipeEvents: Array<string> = [];
		private timeout;

		constructor(private $q: ng.IQService) {
			
		}

		public swipeEvent(type): ng.IPromise<any> {
			clearTimeout(this.timeout);

			var defer = this.$q.defer();
			
			this.swipeEvents.push(type);
			this.timeout = setTimeout(() => {
				var type = "global";
				if (this.swipeEvents.indexOf("local") !== -1) {
					type = "local";
				}
			   
				this.swipeEvents.splice(0, this.swipeEvents.length);
				defer.resolve(type);
			}, 50);

			return defer.promise;
		}
	}

	angular.module(moduleId).service("swipeService", SwipeService);
}