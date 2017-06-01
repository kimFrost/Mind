/// <reference path="../../../../references/references.ts" />
/// <reference path="../../../../references/references.ts" />
/**
 * Created by mikkel on 17/06/16.
 */

namespace BasketModule {

	class AddToBasketController {
		public productId: string;
		public autoFold: boolean;
		public quantityInBasket: number = 0;
		public withText: boolean;

		private secondsBeforeFold: number = 2500;
		private touchSecondsBeforeFold: number = 5000;
		private foldTimer: any = null;
		private subscriber;
		private isUpToDate: boolean = true; // keep track of the state between quantity change, and to when the basket has been updated

		private inputField;

		public onChange: Function;

		public position = '';

		public states = {
			hasFocus: false,
			isBlurred: true,
			isOpen: false
		};

		constructor(private basketService: BasketService,
			private $timeout: ng.ITimeoutService,
			public translationsService: TranslationsModule.TranslationsService,
			private $element,
			private responsiveService: UtilsModule.ResponsiveService) {


			// DOM Reference to input field in button
			this.inputField = this.$element[0].getElementsByClassName('addtobasket__input')[0];

			if (this.withText === undefined) {
				this.withText = false; // set default if button is with text
			}

			if (this.autoFold === undefined) {
				this.autoFold = false; // set default autofold
			}

			if (!this.autoFold) {
				this.states.isOpen = true;
			}

			this.quantityInBasket = basketService.productQuantityInBasket(this.productId);

			this.subscriber = this.basketService.basketObservable
				.filter(changes => {
					if (changes !== null) {
						return changes.indexOf(this.productId) > -1;
					}
					return true;
				})
				.subscribe(() => {
					this.quantityInBasket = basketService.productQuantityInBasket(this.productId);
				});

		}

		public setQuantity(quantity) {
			this.basketService.updateProduct(this.productId, !quantity || quantity < 0 ? 0 : quantity, this.position);
			this.onChange();
			this.isUpToDate = true;

			// If in minibsket, remove focus, so that it cannot be triggered when closed by th eminibasket controller
			if (this.position === 'minibasket') {
				this.inputFieldBlur();
			}
		}

		public clickAdd(event) {
			// Cancel any timers that could be running when opened
			this.cancelTimer();

			if (event) {
				event.stopPropagation();
			}

			if (this.productId) {
				this.states.isOpen = true;

				if (this.quantityInBasket === 0) {
					this.setQuantity(1);
					this.quantityInBasket = 1;
				}
			}
		}

		// Input field focus handler
		public onFocus = (event) => {
			this.cancelTimer();
			this.states.hasFocus = true;
			this.states.isBlurred = false;

			this.$timeout(() => {
				this.inputField.setSelectionRange(0, this.inputField.value.length);
			});
		};

		// Input field blur handler
		public onBlur() {
			this.states.hasFocus = false;
			this.states.isBlurred = true;

			if (!this.isUpToDate) {
				this.setQuantity(this.quantityInBasket);
			}

			if (this.position === 'minibasket' || this.position === 'basket' || this.responsiveService.isTouch) {
				this.cancelTimer();
			} else {
				this.restartTimer();
			}		
		}

		private inputFieldFocus () {
			this.inputField.focus();
			this.inputField.setSelectionRange(0, this.inputField.value.length);
		}

		private inputFieldBlur () {
			this.inputField.blur();
		}

		public onKeydown(event) {

			if (this.states.hasFocus) {

				let key = event.which;
				// Not number keys
				 if (!(key >= 96 && key <= 105) && !(key >= 48 && key <= 57)) {
					// Not enter and backspace
					if (key !== 13 && key !== 8) {
						// Not arrow keys
						if (!(key >= 37 && key <= 40)) {
							// Plus key(numpad)
							if (key === 107) {
								event.preventDefault();
								this.increase();
							}
							// Minus key(numpad)
							else if (key === 109) {
								event.preventDefault();
								this.decrease();
							}
							else {
								event.preventDefault();
							}

							this.isUpToDate = false;
						}
					}
				}
				// If number but shift is down
				else if (event.shiftKey) {
					event.preventDefault();
				}
			}
		}

		public onKeyup(event) {

			if (this.states.hasFocus) {

				// If key is 'Enter'
				if (event.which === 13) {

					// Update basket
					if (!this.isUpToDate) {
						this.setQuantity(event.target.value);
					} else {
						if (this.position !== 'minibasket' && this.position !== 'basket') {
							this.closeButton();
						}
					}

					if (this.position === 'basket') {
						this.inputFieldBlur();
					}

					if (this.autoFold) {
						this.closeButton();
					}
				} else {
					this.isUpToDate = false;
				}
			}
		}

		public increase(event?:Event) {
			this.isUpToDate = false;

			if (event) {
				event.stopPropagation();
			}

			if (this.quantityInBasket < 9999) {
				this.quantityInBasket++;
				this.setQuantity(this.quantityInBasket);
				this.inputFieldFocus();
			}
			
			if (this.responsiveService.isTouch) {
				this.restartTimer();
			}
		}

		public decrease(event?:Event) {
			this.isUpToDate = false;

			if (event) {
				event.stopPropagation();
			}

			if (this.quantityInBasket > 0) {
				this.quantityInBasket--;
				this.setQuantity(this.quantityInBasket);
				this.inputFieldFocus();
			}

			if (this.responsiveService.isTouch) {
				this.restartTimer();
			}
		}

		private closeButton = () => {
			if (!this.quantityInBasket) {
				this.setQuantity(0);
				this.cancelTimer();
			} 
			// Check if basket is updated, if not we want to update it to the correct quantity
			else if (!this.isUpToDate) {
				this.setQuantity(this.quantityInBasket);
				this.cancelTimer();
			}

			if (this.foldTimer) {
				this.$timeout.cancel(this.foldTimer);
			}

			this.states.isOpen = false;
			this.foldTimer = null;
		};

		private cancelTimer() {
			if (this.foldTimer) {
				this.$timeout.cancel(this.foldTimer);
			}
		}

		private addTimer() {
			if (this.autoFold) {
				this.foldTimer = this.$timeout(() => {
					this.closeButton();
				}, !this.responsiveService.isTouch ? this.secondsBeforeFold : this.touchSecondsBeforeFold);
			}
		}

		private restartTimer() {
			this.cancelTimer();
			this.addTimer();
		}

		public mouseOver() {
			if (!this.states.isOpen) {
				this.mouseCancelTimer();
			}
		}

		public mouseLeave () {
			if (this.states.isOpen) {
				if (this.states.hasFocus) {
					this.cancelTimer();
				} else {
					this.addTimer();
				}
			}
		}

		public mouseAddTimer() {
			if (!this.responsiveService.isTouch) {
				this.addTimer();
			} else {
				this.mouseCancelTimer();
			}
		}

		public mouseCancelTimer() {
			if (!this.responsiveService.isTouch && this.states.hasFocus) {
				this.cancelTimer();
			}
		}

		public touchRestartTimer() {
			if (this.responsiveService.isTouch) {
				this.restartTimer();
			}

			this.$timeout(() => {
				this.inputFieldFocus();
			});
		}

		$onDestroy() {
			this.subscriber.dispose();
		}

	}

	class AddToBasketComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				productId: "<",
				autoFold: "<",
				withText: "<",
				position: "@",
				onChange: "&"
			};
			this.controller = AddToBasketController;
			this.template = HtmlTemplates.addtobasket.html;
		}

	}

	angular.module(moduleId).component('addtobasket', new AddToBasketComponent());

}
