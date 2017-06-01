///<reference path="../../../../references/references.ts"/>

/**
 * Created by KFN on 27-05-2016.
 */


namespace SocialModule {

    export interface Window extends ng.IWindowService{ FB: any; fbAsyncInit: any;}

    export class FacebookService {

    	private appId:string = window['scom'].facebook ? window['scom'].facebook.appId : '270387273149510';

        private ready = false;
        private defers: Array<ng.IDeferred<any>> = [];

		public embedFacebookApi = () => {
			(function(d, s, id){
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) {return;}
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		};

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

		public share = (feed: IFacebookFeed) => {
			let defer = this.$q.defer();
			if (this.ready && this.$window.FB && feed) {
				if (feed.Method === EFacebookMethod.Feed) {
					this.$window.FB.ui({
						app_id: this.appId,
						method: 'feed', // 'feed', 'share', 'send'
						name: feed.Title,
						link: this.$location.absUrl(),
						picture: feed.Image,
						//caption: // Will replace default link taken from link
						description: feed.Description
					}, (response) => {
						// This might be deprecated on Oct 16.
						//TODO Research publish_actions as replacement
						if (response) {
							defer.resolve();
						}
						else {
							defer.reject();
						}
					});
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
			this.embedFacebookApi();
			$window.fbAsyncInit = () => {
				if (this.$window.FB) {
					$window.FB.init({
						appId      : this.appId,
						xfbml      : true,
						version    : 'v2.6'
					});
					this.ready = true;
					for (var defer of this.defers) {
						defer.resolve();
					}
				}
			};
        }
    }

    angular.module(moduleId).service("facebookService", FacebookService);

}
