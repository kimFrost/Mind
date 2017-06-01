///<reference path="../../../../references/references.ts"/>

/// Youtube API docs
/// https://developers.google.com/youtube/iframe_api_reference#Getting_Started

namespace YoutubePlayerModule {

	class YoutubeController {
		public height;
		public width;
		public videoid;
		public autoplay;
		public thumbSrc;
		public formattedThumbSrc;
		private playerCreated:boolean = false;
		private playerVars = {
				autoplay: this.autoplay ? 1 : 0,
				html5: 1,
				theme: "light",
				modestbranding: 1,
				color: "white",
				iv_load_policy: 3,
				showinfo: 0,
				controls: 1,
				rel: 0
			};

		public onPlay:Function;
		public onPause:Function;
		public onEnd:Function;
		public onLoadError:Function;

		private player:any;
		private startedTimer:any;
		private states = {
			playing: false,
			paused: false,
			ready: false,
			loadingLibrary: false
		};

		public togglePlay = () => {
			if (this.player && this.player.playVideo) {
				if (this.states.playing) {
					this.player.pauseVideo();
				}
				else {
					this.player.playVideo();
				}
			} else {
				this.states.loadingLibrary = true;
				if(!this.playerCreated) {
					this.createPlayer().then(()=> {	
						this.isPlayerLoaded();
					});
				}

			}
		};

		private isPlayerLoaded() {
			if(this.player.playVideo) {
				this.states.loadingLibrary = false;
				this.player.playVideo();
			} else {
				this.$timeout( () => {
					this.isPlayerLoaded();		
				}, 100);	
			}
		}

		public onPlayerStateChange = (event) => {
			if (event.data === YT.PlayerState.PLAYING) {
				this.states.playing = true;
				this.states.paused = false;
				this.$element.addClass('youtube_playing');
				this.$element.removeClass('youtube_paused');
				this.onPlay();
				this.$timeout.cancel(this.startedTimer);
				this.startedTimer = this.$timeout(() => {
					this.$element.addClass('youtube_started');
				},500);
			}
			if (event.data === YT.PlayerState.PAUSED) {
				this.states.playing = false;
				this.states.paused = true;
				this.$element.addClass('youtube_paused');
				this.onPause();
			}
			if (event.data === YT.PlayerState.ENDED) {
				this.$timeout.cancel(this.startedTimer);
				this.states.playing = false;
				this.states.paused = false;
				this.$element.removeClass('youtube_playing');
				this.$element.removeClass('youtube_paused');
				this.$element.removeClass('youtube_started');
				this.onEnd();
			}
		};

		private iOS = () => {
			var iDevices = [
				'iPad Simulator',
				'iPhone Simulator',
				'iPod Simulator',
				'iPad',
				'iPhone',
				'iPod'
			];
			if (!!navigator.platform) {
				while (iDevices.length) {
					if (navigator.platform === iDevices.pop()){ return true; }
				}
			}
			return false;
		};

		private onError = (event) => {
			this.$element.addClass('youtube_error');
			this.onLoadError();
		};

		constructor(private $element, private youtubeService:YoutubeService, private $timeout, private $scope, private $q:ng.IQService) {
			$element.addClass('youtube');

			if (!this.iOS()) {
				this.$element.bind('click', this.togglePlay);
			}
			else {
				this.$element.bind('click', this.togglePlay);
				this.$element.addClass('youtube_ios');
			}

			this.$element.addClass('youtube_ready');
		}

		private createPlayer() {
			var defer = this.$q.defer();

			var playerElement = this.$element[0].querySelector('.youtube__video');
			var createPlayer = () => {
				this.player = new YT.Player(playerElement, {
					playerVars: this.playerVars,
					events: {
						'onStateChange': this.onPlayerStateChange,
						'onError': this.onError
					},
					height: this.height,
					width: this.width,
					videoId: this.videoid
				});
				this.states.ready = true;
				this.playerCreated = true;

				defer.resolve();
			};

			this.youtubeService.getOnReady().then(createPlayer);

			return defer.promise;

		}

		$onInit() {
			this.formattedThumbSrc = this.thumbSrc.indexOf("img.youtube.com") === -1 ? this.thumbSrc + "&width=800&height=550&mode=max&quality=70" : this.thumbSrc;
		}

		$onDestroy() {
			this.$element.unbind('click');
			if (this.player) {
				this.onEnd();
				this.player.destroy();
			}
		}
	}

	class YoutubeComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				height: "<",
				width: "<",
				videoid: "<",
				autoplay: "<",
				thumbSrc: "<",
				onPlay: "&",
				onEnd: "&",
				onPause: "&",
				onLoadError: "&"
			};
			this.controller = YoutubeController;
			this.template = HtmlTemplates.youtube.html;
		}
	}

	angular.module(moduleId).component("youtube", new YoutubeComponent());

}
