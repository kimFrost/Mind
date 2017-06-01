///<reference path="../../../../references/references.ts"/>

/**
 * Created by KFN on 27-05-2016.
 */


namespace SocialModule {

    export interface Window extends ng.IWindowService{ IG: any; instragramInit: any;}

    export class InstagramService {

        private ready = false;
        private defers: Array<ng.IDeferred<any>> = [];

        public getOnReady = ():ng.IPromise<any> => {
            var defer = this.$q.defer();
            if (this.ready) {
                defer.resolve();
            }
            else {
                this.defers.push(defer);
            }
            return defer.promise;
        };

		public share = (feed: IInstagramFeed) => {
			let defer = this.$q.defer();
			if (this.ready && this.$window.FB && feed) {
				if (feed.Method === EFacebookMethod.Feed) {

				}
				else {
					defer.reject();
				}
			}
			else {
				defer.reject();
			}
			return defer;
		};

        constructor(private $window: Window, private $q: ng.IQService, private $location: ng.ILocationService) {
        }
    }

    angular.module(moduleId).service("instagramService", InstagramService);

}
