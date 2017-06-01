///<reference path="../../../../references/references.ts"/>

namespace MinibasketModule {
	class MinibasketButtonController {

		public timeout;


		constructor(public basketService: BasketModule.BasketService, 
					private statesService: UtilsModule.StatesService, 
					private responsiveService: UtilsModule.ResponsiveService, 
					private trackingService: TrackingModule.TrackingService,
					private $rootScope: ng.IRootScopeService,
					private searchurlService: SearchModule.SearchUrlService,
					private $element) {


			this.$rootScope.$on('BASKET_UPDATED', () => {
				this.showUpdatedBasket();
			});

		}

		private debounce(func, wait) {
			var context = this; 				
			clearTimeout(this.timeout);

			this.timeout = setTimeout( () => {
				func.apply(context);
			}, wait);			
		}

		public showUpdatedBasket() {
			
			var updatedItem = this.$element[0].getElementsByClassName('basket-button__updated')[0];

			if(updatedItem.style.display !== "block") {
				updatedItem.style.display = "block";
				
				snabbt(updatedItem, {
					fromPosition: [0, -100, 0],
					position: [0, 0, 0],
					fromOpacity: 0,
					opacity: 1,
					delay: 0,
					duration: 200,
				});

			}
			
			this.debounce(this.hideUpdatedBasket, 2000);
		}

		public hideUpdatedBasket() {

			var updatedItem = this.$element[0].getElementsByClassName('basket-button__updated')[0];
			snabbt(updatedItem, {
				position: [0, 100, 0],
				opacity: 0,
				delay: 0,
				duration: 200,
				complete: () => {
					updatedItem.style.display = "none";
				}
			});
			
		}

		public basketClicked(event) {
			if (this.responsiveService.responsiveState.device === 'desktop') {
				if (!this.statesService.states.minibasketVisible) {
					this.statesService.setState("minibasketVisible", true);
					this.trackingService.checkout(1);
				} else {
					this.statesService.setState("minibasketVisible", false);
				}

				event.preventDefault();
			} else {
				this.searchurlService.closeSearch();
			}
		}
	}

	class MinibasketButtonComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = MinibasketButtonController;
			this.template = HtmlTemplates.minibasket.button.html;
		}
	}

	angular.module(moduleId).component("minibasketButton", new MinibasketButtonComponent());

}
