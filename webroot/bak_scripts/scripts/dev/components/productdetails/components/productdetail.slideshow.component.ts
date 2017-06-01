///<reference path="../../../../references/references.ts"/>

namespace ProductDetailsModule {

	class ProductSlideshowController  {

		public media: Array<any>;
		public loading:boolean = false;
		public imageParams: string = (this.imageParams || "&w=623&h=623&mode=pad");
		public activeIndex:number = -1;

		public buffer:boolean = true;
		public image:string = "";
		public imageBuffer:string = "";
		public youtubeId = "";
		public altText = "";

		public bBuffering:boolean = true;
		public bVideoPlaying:boolean = false;

		constructor(private $scope:ng.IScope) {
			this.loadNewImage();
		}

		public loadNewImage = (index:number = 0) => {
			let src;
			let newMediaObj = this.media[index];
			let newImageSrc = "";

			if (index !== this.activeIndex && this.media && this.media.length) {

				switch (newMediaObj.MediaType) {
					case 'image':
						newImageSrc = newMediaObj.Url;
						this.altText = newMediaObj.AltText;
						break;
					case 'video':
						if (newMediaObj.ThumbnailImageForJson) {
							newImageSrc = newMediaObj.ThumbnailImageForJson.Url;
							this.altText = newMediaObj.VideoName ? newMediaObj.VideoName : "Youtube";
						}
						break;
					default:
						break;
				}

				src = this.imageBuffer === newImageSrc ? newImageSrc + "&rnd=" + Math.random() : newImageSrc;
				if (!newMediaObj.ThumbnailImageForJson || !newMediaObj.ThumbnailImageForJson.IsUrlExternal) {
					this.imageBuffer = src + this.imageParams;
				} else {
					this.imageBuffer = src;
				}

				if (newMediaObj.YouTubeId) {
					this.youtubeId = newMediaObj.YouTubeId;
				}
				else if (newMediaObj.YouTubeUrl) {
					// Parse youtube url to get youtube id
					var regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
					var match = newMediaObj.YouTubeUrl.match(regExp);
					if (match[1]) {
						this.youtubeId = match[1];
					}
					else {
						this.youtubeId = '';
					}
				}
				else {
					this.youtubeId = '';
				}

				this.activeIndex = index;
			}
		};

		public imageLoaded = (success:boolean) => {
			if(success) {
				this.$scope.$applyAsync( () => {
					this.image = this.imageBuffer;
					this.bBuffering = false;
				});
			}
			else {
				this.bBuffering = false;
			}
		};

		public onVideoPlay = () => {
			this.bVideoPlaying = true;
		};

		public onVideoEnd = () => {
			this.bVideoPlaying = false;
		};


	}

	class ProductSlideshowComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				altThumbnails: '<',
				media: '<',
				imageParams: '<',
				shareTitle: '<',
				shareDesc: '<'
			};
			this.controller = ProductSlideshowController;
			this.template = HtmlTemplates.productdetail.slideshow.html;
		}
	}

	angular.module(moduleId).component("productSlideshow", new ProductSlideshowComponent());

} 
