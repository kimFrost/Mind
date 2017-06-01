///<reference path="../../../../references/references.ts"/>

namespace SocialModule {

	import DirectiveHelperService = Global.DirectiveHelperService;

	class FacebookController {

		public share = () => {

			this.facebookService.share({
				Method: EFacebookMethod.Feed,
				Title: this.$scope.Title,
				Description: this.$scope.Desc,
				Image: window.location.origin + this.$scope.Image
			});

		};

		constructor(private $element, private facebookService:FacebookService, private $scope) {
			var createShare = () => {
				$element.bind('click', this.share);
			};
			// Bind to facebook api ready
			facebookService.getOnReady().then(createShare);
		}

		$onInit() {
		}

		$onDestroy() {
			this.$element.unbind('click');
		}
	}

	class FacebookDirective implements ng.IDirective {
		public controller:any;
		public scope:any;

		constructor() {
			this.scope = {
				Title: '@title',
				Desc: '@desc',
				Image: '@image'
			};
			this.controller = FacebookController;
		}
	}

	angular.module(moduleId).directive("facebook", DirectiveHelperService.factory(FacebookDirective));

}
