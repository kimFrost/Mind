///<reference path="../../../../references/references.ts"/>

namespace OnerowModule {
	class OnerowController {
		public minItemWidth: number;
		public minItems: number;
		public loadSize: number;
		public pageSize: number;
		public fetching: boolean = false;
		public pageIndex: number = 0;
		public items: any;
		public totalItems: number;
		public loadMore: Function;
		public containerWidth: number;
		public viewportWidth: number;
		public templateName: string;

		constructor($scope: ng.IScope,
			private $element,
			private $timeout: ng.ITimeoutService,
			private statesService: UtilsModule.StatesService,
			private responsiveService: UtilsModule.ResponsiveService,
			private swipeService: UtilsModule.SwipeService) {

			this.pageSize = this.loadSize;
			this.minItems = this.minItems ? this.minItems : 2;

			$scope.$watch(() => {
				return responsiveService.screen.width;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.calculateAndUpdate();
				}
			});

			$scope.$watch(() => {
				return statesService.states.mobileNavigation;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.calculateAndUpdate();
				}
			});

			$scope.$watch(() => {
				return this.items;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.calculateContainer();
					this.updatePage(this.pageIndex, true);
					this.fetching = false;
				}
			}, true);

			//Bug fix for dragging on items
			$element.on("dragstart", (e) => {
				e.preventDefault();
			});

			this.calculateAndUpdate();
		}

		private calculateAndUpdate() {
			if (this.totalItems !== 0) {
				let firstProductIndex = 0;
				if (this.pageIndex !== 0) {
					firstProductIndex = (this.pageIndex * this.pageSize) + Math.floor(this.pageSize / 2) < this.items.length ? (this.pageIndex * this.pageSize) + Math.floor(this.pageSize / 2) : this.pageIndex * this.pageSize;
				}

				this.calculateContainer();
				const newPageIndex = Math.floor(firstProductIndex / this.pageSize);
				this.pageIndex = newPageIndex;
				this.updatePage(this.pageIndex);
			}
		}

		private updatePage(pageIndex: number = 0, animate: boolean = false) {
			var pageOffset = -(this.pageIndex * this.viewportWidth);
			var duration = 300;

			if (!animate) {
				duration = 0;
			}

			this.$timeout(() => {
				snabbt(this.$element[0].getElementsByClassName('onerow__slide-show')[0], {
					position: [pageOffset, 0, 0],
					easing: 'ease',
					duration: duration
				});
			});
		}

		private calculateContainer() {
			let element = this.$element[0];
			let width = element.offsetWidth;
			const margin = Math.abs(element.getElementsByClassName("onerow__item-wrap")[0].offsetLeft) * 2;

			while (width === 0) {
				width = element.parentElement.clientWidth;

				if (width === 0) {
					element = element.parentElement;
				}
			}

			const newPageSize = this.getPageSize(width + margin);
			if (newPageSize !== this.pageSize) {
				this.pageSize = newPageSize;
			}
			const itemSize = (width + margin) / this.pageSize;
			this.containerWidth = itemSize * this.items.length;
			this.viewportWidth = itemSize * this.pageSize;
		}

		private getPageSize(width: number) {
			let maxPageSize = this.loadSize;
			const margin = Math.abs(this.$element[0].getElementsByClassName("onerow__item-wrap")[0].offsetLeft) * 2;

			while (width / maxPageSize < (this.minItemWidth + margin) && maxPageSize > this.minItems) {
				maxPageSize--;
			}

			return maxPageSize;
		}

		public getTemplateName = (item) => {
			var templateName = item.TemplateName;
			if (this.templateName) {
				templateName = this.templateName;
			}
			return templateName;
		};

		public prevPage() {
			this.pageIndex--;
			this.updatePage(this.pageIndex, true);
		}

		public nextPage() {
			if ((this.pageIndex + 2) * this.pageSize > this.items.length && this.items.length < this.totalItems) {
				this.fetching = true;
				this.loadMore();
				this.pageIndex++;
			}
			else {
				this.pageIndex++;
				this.updatePage(this.pageIndex, true);
			}
		}

		public swipeNavigate(event: any) {
			this.swipeService.swipeEvent("local").then((response) => {
				if (response === "local") {
					if (!(this.statesService.states.mobileNavigation && this.responsiveService.responsiveState.device === 'mobile')) {
						this.swipe(event);
					} else {
						if (event.direction === 2) {
							if (event.distance > 20 && event.angle < -150 || event.angle > 150) {
								this.statesService.setState("mobileNavigation", false);
							}
						} else if (event.direction === 4) {
							if (event.distance > 20 && event.angle <= 30 && event.angle >= -30) {
								this.statesService.setState("mobileNavigation", true);
							}
						}
					}
				}
			});
		}

		public swipe(event) {
			if (event.direction === 2 && this.pageSize * (this.pageIndex + 1) < this.totalItems) {
				this.nextPage();
			}
			else if (event.direction === 4 && this.pageIndex > 0) {
				this.prevPage();
			}
		}
	}

	class OnerowComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				items: '<',
				totalItems: '<',
				loadMore: '&',
				minItemWidth: '<',
				minItems: '<',
				loadSize: '<',
				templateName: '<'
			};

			this.controller = OnerowController;
			this.template = HtmlTemplates.onerow.html;
		}
	}

	angular.module(moduleId).component("onerow", new OnerowComponent());
}
