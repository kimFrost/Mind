///<reference path="../../../../references/references.ts"/>

namespace BundleModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	type TranslationsViewModel = SCommerce.Core.Dictionary.Translations;

	class BundleController {

		public translations:TranslationsViewModel;

		constructor(public translationsService:TranslationsService,
					private $scope:ng.IScope) {
			this.translations = translationsService.translations;

		}

		$onInit() {

		}

		$onDestroy() {

		}

		public showDeliveryInfoDialog(evn) {
			evn.preventDefault();
			this.$scope.$emit('showDeliveryInfoDialog');

		}
	}

	class BundleComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				data: "<"
			};
			this.controller = BundleController;
			this.template = HtmlTemplates.bundle.html;
		}
	}

	angular.module(moduleId).component("bundle", new BundleComponent());

}

