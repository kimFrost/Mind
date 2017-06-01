///<reference path="../../../../references/references.ts"/>

namespace MinibasketModule {

	type SettingsService = PageModule.SettingsService;

	class MinibasketController {
		public translations;
		public showSeeAllBtn:boolean = false;

		constructor(translationsService:TranslationsModule.TranslationsService,
					public basketService:BasketModule.BasketService,
					$scope:ng.IScope, private $element,
					private $timeout:ng.ITimeoutService,
					statesService:UtilsModule.StatesService,
					public settingsService:SettingsService,
					private searchurlService:SearchModule.SearchUrlService,
					responsiveService:UtilsModule.ResponsiveService) {

			this.translations = translationsService.translations;

			$scope.$watch(() => {
				return statesService.states.minibasketVisible;
			}, (newVal) => {
				if (basketService.basket.Lines && newVal) {
					this.calculateShowAllBtn();
				}
			});

			$scope.$watch(() => {
				return basketService.basket;
			}, () => {
				if (basketService.basket.Lines && statesService.states.minibasketVisible) {
					this.calculateShowAllBtn();
				}
			});

			$scope.$watch(() => {
				return responsiveService.screen.height;
			}, () => {
				if (basketService.basket.Lines && statesService.states.minibasketVisible) {
					this.calculateShowAllBtn();
				}
			});
		}

		private calculateShowAllBtn() {
			this.$timeout(() => {
				const productContainerHeight = this.$element[0].getElementsByClassName("minibasket__product-container")[0].clientHeight + this.$element[0].getElementsByClassName("minibasket__products-head")[0].clientHeight;
				const productsContainer = this.$element[0].getElementsByClassName("minibasket__products")[0].clientHeight;

				this.showSeeAllBtn = productsContainer < productContainerHeight;
			}, 0);
		}
	}

	class MinibasketComponent implements ng.IComponentOptions {
		public controller:any;
		public template:string;

		constructor() {
			this.controller = MinibasketController;
			this.template = HtmlTemplates.minibasket.html;
		}
	}

	angular.module(moduleId).component("minibasket", new MinibasketComponent());

}
