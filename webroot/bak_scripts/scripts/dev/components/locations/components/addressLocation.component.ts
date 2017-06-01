///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 11-09-2016.
 */
namespace AddressLocationModule {
	class AddressLocationController {
		public options = [];
		public option:string = '';

		public model:string = '';
		public data:string;

		public label:any;

		constructor(
			private $scope:ng.IScope,
			private addressLocationService: AddressLocationService,
			public translationsService: TranslationsModule.TranslationsService) {
		}

		$onInit() {
			this.options = this.addressLocationService.get(this.data);
		}

	}

	class AddressLocationComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;
		public bindings: any;

		constructor() {
			this.controller = AddressLocationController;
			this.template = HtmlTemplates.addressLocation.html;
			this.bindings = {
				model:"=",
				data:"@"
			};
		}
	}

	angular.module(moduleId).component("addressLocation", new AddressLocationComponent());
}
