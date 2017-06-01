///<reference path="../../../../references/references.ts"/>

namespace BasketModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	class BasketItemController {

		public states = {
			extended: false,
			opened: false
		};

		public translations: Object;

		private leaveTimer: Object;

		public toggleOpen = (state) => {
			state = (state === undefined) ? !this.states.opened : state;
			this.states.opened = state;
			if (this.states.opened) {
				this.$element.addClass('basket-item_open');
			}
			else {
				this.$element.removeClass('basket-item_open');
			}
		};

		public toggleExtend = (state) => {
			state = (state === undefined) ? !this.states.extended : state;
			this.states.extended = state;
			if (this.states.extended) {
				this.$element.addClass('basket-item_extend');
			}
			else {
				this.$element.removeClass('basket-item_extend');
			}
		};

		public stopLeaveTimer = () => {
			this.$timeout.cancel(this.leaveTimer);
		};

		public startLeaveTimer = () => {
			this.stopLeaveTimer();
			this.leaveTimer = this.$timeout(() => {
				this.toggleExtend(false);
			},1000);
		};

		constructor(private $element, private $timeout, public basketService:BasketService, public translationsService:TranslationsService) {
			$element.addClass('basket-item');
			this.translations = translationsService.translations;
			$element.bind('mouseenter', this.stopLeaveTimer);
			$element.bind('mouseleave', this.startLeaveTimer);
		}

		$onInit() {

		}

		$onDestroy() {
			this.$element.unbind('mouseenter');
			this.$element.unbind('mouseleave');
		}
	}

	class BasketItemComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				data: '<',
				onRemove: '&',
				onAmountUpdate: '&'
			};
			this.controller = BasketItemController;
			this.template = HtmlTemplates.basketItem.html;
		}
	}

	angular.module(moduleId).component("basketItem", new BasketItemComponent());

}
