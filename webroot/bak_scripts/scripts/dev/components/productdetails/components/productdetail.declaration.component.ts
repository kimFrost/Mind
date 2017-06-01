///<reference path="../../../../references/references.ts"/>

namespace ProductDetailsModule {

	class ProductDetailDeclarationController {
		public productData: SCommerce.Website.Code.WebAPI.Models.Product.ProductViewModel;
		public translations: Object;

		public productLogos: {};

		constructor(translationsService: TranslationsModule.TranslationsService,
				private settingsService: PageModule.SettingsService) {

			this.translations = translationsService.translations;

			// If settings, we cherry pick the product logos and apply them to the product data
			if (settingsService.settings !== undefined && settingsService.settings !== null) {
				this.productLogos = settingsService.settings.SiteLogosSettings;
			}
		}
	}

	class ProductDetailDeclarationComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				productData: '<'
			};
			this.controller = ProductDetailDeclarationController;
			this.template = HtmlTemplates.productdetail.declaration.html;
		}
	}

	angular.module(moduleId).component("productDetailDeclaration", new ProductDetailDeclarationComponent());

} 
