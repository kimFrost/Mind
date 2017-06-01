///<reference path="../../../../references/references.ts"/>

/// Youtube API docs
/// https://developers.google.com/youtube/iframe_api_reference#Getting_Started

namespace SocialModule {

	import DirectiveHelperService = Global.DirectiveHelperService;

	class InstagramController {

		public share = () => {
			this.instagramService.share({
				Method: EFacebookMethod.Feed,
				Title: this.$scope.Title,
				Description: this.$scope.Desc,
				Image: this.$scope.Image
			});
		};

		constructor(private $element, private instagramService:InstagramService, private $scope) {
			var createShare = () => {
				$element.bind('click', this.share);
			};
			// Bind to instagram api ready
			instagramService.getOnReady().then(createShare);
		}

		$onInit() {
		}

		$onDestroy() {
			this.$element.unbind('click');
		}
	}

	class InstagramDirective implements ng.IDirective {
		public controller:any;
		public scope:any;

		constructor() {
			this.scope = {
				Title: '@title',
				Desc: '@desc',
				Image: '@image'
			};
			this.controller = InstagramController;
		}
	}

	angular.module(moduleId).directive("instagram", DirectiveHelperService.factory(InstagramDirective));

}
