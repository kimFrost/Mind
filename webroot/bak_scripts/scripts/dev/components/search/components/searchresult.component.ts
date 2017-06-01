///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {
	class SearchResultController {
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public itemsInRow: number;

		private timeout;

		constructor(public searchService: SearchService,
			private searchurlService: SearchUrlService,
			private scrollService: UtilsModule.ScrollService,
			translationsService: TranslationsModule.TranslationsService,
			public responsiveService: UtilsModule.ResponsiveService,
			private trackingService: TrackingModule.TrackingService,
			private $rootScope: ng.IRootScopeService,
			private $timeout: ng.ITimeoutService,
			private $location: ng.ILocationService,
			private $element) {

			this.translations = translationsService.translations;

			$rootScope.$watch(() => {
				return responsiveService.screen.width;
			}, () => {
				this.calculateItemsInRow();
			});

			$rootScope.$watch(() => {
				return this.searchService.emptyResult;
			}, (newVal) => {
				$timeout.cancel(this.timeout);

				if (newVal) {
					this.startCloseTimer();
				}				
			});
		}

		$onInit() {
			// Check url for 404 hashtag
			this.$timeout(() => {
				this.checkForNotFoundRedirect();
			}, 500);
		}

		public startCloseTimer() {
			this.timeout = this.$timeout(() => {
				this.closeSearch();
			}, 10000);
		}

		public checkForNotFoundRedirect () {
			if (this.$location.hash() === '404') {
				this.searchService.showRedirectModal();
			}
		}

		public activateTab(tab: number = 0) {
			this.searchService.activeTab = tab;

			// HACK to fix scroll to top in search overlay
			var scrollOverlay: any = document.getElementsByClassName("searchoverlay__overlay")[0];
			scrollOverlay.scrollTop = 0;

			if ((tab === 0 && this.searchService.productsInvalid) || (tab === 1 && this.searchService.recipesInvalid)) {
				this.searchService.restoreSearch = false;
				this.searchService.search(this.searchurlService.searchQuery, "", false);
			}
		}

		public calculateItemsInRow() {
			const containerWidth = this.$element[0].getElementsByClassName("searchresult__item-container")[0].offsetWidth;
			const itemMinWidth = 190;

			this.itemsInRow = Math.floor(containerWidth / itemMinWidth) > 1 ? Math.floor(containerWidth / itemMinWidth) : 2;
		}

		public closeSearch() {
			this.searchurlService.closeSearch();
		}

		public trackAdvertisementProductClick(product, index) {
			let namePrefix = 'Annonce: ';
			this.trackingService.productClick(product, { position: index + 1 }, 'Search', namePrefix);
		}

		public trackClick(product, index) {
			this.trackingService.productClick(product, { position: index + 1 }, 'Search');
		}
		public trackPromoClick(ad, index) {
			this.trackingService.trackPromoClick(ad.Product, index);
		}

	}

	class SearchResultComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = SearchResultController;
			this.template = HtmlTemplates.searchresult.html;
		}
	}

	angular.module(moduleId).component("searchresult", new SearchResultComponent());


}
