///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {
	class SearchFieldController {
		public placeholder: string;
		public searchQuery: string = "";
		public clear = false;

		private scrollDistanceTillBlur = 20;

		constructor(private $scope: ng.IScope,
			public searchurlService: SearchUrlService,
			private $timeout: ng.ITimeoutService,
			private typeaheadService: TypeaheadService,
			private $location: ng.ILocationService,
			public responsiveService: UtilsModule.ResponsiveService,
			public translationsService: TranslationsModule.TranslationsService,
			public statesService: UtilsModule.StatesService,
			private $window: ng.IWindowService,
			private $element) {

			$scope.$watch(() => {
				return this.searchQuery;
			}, (newVal) => {
				this.searchurlService.updateSearchQuery(newVal, this.clear, false);
				// Reset scroll position
				var scrollBox = document.querySelector('.searchoverlay__overlay');
				if (scrollBox) {
					scrollBox.scrollTop = 0;
				}

				this.clear = false;
			});

			$scope.$watch(() => {
				return this.searchurlService.searchQuery;
			}, () => {
				this.searchQuery = this.searchurlService.searchQuery;
			});
			
			this.scrollHandle = this.scrollHandle.bind(this);
		}

		public clearInput() {
			this.clear = true;
			this.searchQuery = "";
		}

		public onFocus(evn) {
			this.searchurlService.isSearching = true;

			if (this.responsiveService.responsiveState.device === 'mobile') {
				angular.element(this.$window).on("scroll", this.scrollHandle);
			}
		}

		public onBlur() {
			if (this.responsiveService.responsiveState.device !== 'mobile') {
				this.$timeout(() => { // timeout fix to allow ngClick on typeahead items to be triggered
					this.searchurlService.isSearching = false;

					if (this.searchQuery) {
						this.typeaheadService.setLatestSearch(this.searchQuery);
					}
				},150);
			}
		}

		$onDestroy() {
			angular.element(this.$window).off("scroll", this.scrollHandle);
		}

		private mobileBlur() {
			angular.element(this.$window).off("scroll", this.scrollHandle);

			this.searchurlService.handleBlurMobile();
		}

		private scrollHandle() {
			if (this.$window.scrollY >= this.scrollDistanceTillBlur && this.responsiveService.responsiveState.device === 'mobile' && this.searchurlService.isSearching) {
				this.$element.find("input")[0].blur();
				angular.element(this.$window).off("scroll", this.scrollHandle);
			}
		}

		public keyDown(evn) {
			if (evn.keyCode === 38) {
				evn.preventDefault();
				this.typeaheadService.selectPrev();
			}
			else if (evn.keyCode === 40) {
				evn.preventDefault();
				this.typeaheadService.selectNext();
			}
			else if (evn.keyCode === 13) {
				evn.preventDefault();
				var selectedValue = this.typeaheadService.getSelectedValue();
				if (selectedValue.Name) {
					if (selectedValue.Type === 'suggestion') {
						this.searchurlService.updateSearchQuery(selectedValue.Name, undefined, true);
					} else if (selectedValue.Type === 'category') {
						this.$location.url(selectedValue.Url);
						this.searchurlService.isSearching = false;
					}
				}
				else if (this.responsiveService.responsiveState.device === 'mobile') {
					this.searchurlService.mobileSearch();
				}

				if (this.responsiveService.responsiveState.device === 'mobile') {
					this.mobileBlur();
				}
				evn.target.blur();

			} else if(!this.searchurlService.isSearching) {
				this.searchurlService.isSearching = true;
			}
		}
	}

	class SearchFieldComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				placeholder: "@",
				placeholderShort: "@"
			};
			this.controller = SearchFieldController;
			this.template = HtmlTemplates.searchfield.html;
		}
	}

	angular.module(moduleId).component("searchfield", new SearchFieldComponent());


}
