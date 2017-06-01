///<reference path="../../../../references/references.ts"/>

namespace BasketModule {

	class BasketRecipeController {

		public states = {
			extended: false,
			opened: false
		};

		public toggleOpen = () => {
			this.states.opened = !this.states.opened;
			if (this.states.opened) {
				this.$element.addClass('basket-item_open');
			}
			else {
				this.$element.removeClass('basket-item_open');
			}
		};

		constructor(private $element) {
			$element.addClass('basket-item');

		}

		$onInit() {

		}

		$onDestroy() {

		}
	}

	class BasketRecipeComponent implements ng.IComponentOptions {

		public bindings:any;
		public controller:any;
		public template:string;

		constructor() {
			this.bindings = {
				data: '<'
			};
			this.controller = BasketRecipeController;
			this.template = HtmlTemplates.basketRecipe.html;
		}
	}

	angular.module(moduleId).component("basketRecipe", new BasketRecipeComponent());

}
