///<reference path="../../../../references/references.ts"/>

/**
 * Created by KFN on 27-05-2016.
 */


namespace YoutubePlayerModule {

    export interface Window extends ng.IWindowService{ YT: any; onYouTubeIframeAPIReady: any;}

    export class YoutubeService {

        //private YT = {loaded: false};
        private ready = false;
        private defers: Array<ng.IDeferred<any>> = [];

		public embedYoutubeApi = () => {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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

        constructor($window: Window, private $q: ng.IQService) {
			this.embedYoutubeApi();
            // If onYouTubeIframeAPIReady already has been fired
            if ($window.YT && $window.YT.loaded) {
                this.ready = true;
                for (var defer of this.defers) {
                    defer.resolve();
                }
            }
            else {
                $window.onYouTubeIframeAPIReady = () => {
                    this.ready = true;
                    for (var defer of this.defers) {
                        defer.resolve();
                    }
                };
            }
        }
    }

    angular.module(moduleId).service("youtubeService", YoutubeService);

}
