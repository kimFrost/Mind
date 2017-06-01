///<reference path="../../../../references/references.ts"/>

namespace AccordionModule {
	angular.module(moduleId).animation('.accordion-content', ['$animateCss', ($animateCss) => {
		var lastId = 0;
		var _cache = {};

		function getId(el) {
			var id = el[0].getAttribute("data-slide-toggle");
			if (!id) {
				id = ++lastId;
				el[0].setAttribute("data-slide-toggle", id);
			}
			return id;
		}

		function getState(id) {
			var state = _cache[id];
			if (!state) {
				state = {};
				_cache[id] = state;
			}
			return state;
		}

		function generateRunner(closing, state, animator, element, doneFn) {
			return () => {
				state.animating = true;
				state.doneFn = doneFn;

				snabbt(element, {
					duration: 300,
					easing: 'ease',
					height: (closing ? 0 : animator),
					fromHeight: (closing ? animator : 0),
					complete() {
						element[0].style.height = '';
						doneFn();
					}
				});
			};
		}

		return {
			addClass(element, className, doneFn) {
				if (className === 'ng-hide') {
					var state = getState(getId(element));
					var height = (state.animating && state.height) ?
						state.height : element[0].offsetHeight;


					var animator = $animateCss(element, {
						from: {
							height: height + 'px'
						},
						to: {
							height: '0px'
						}
					});
					if (animator) {

						state.height = height;
						return generateRunner(true,
							state,
							height,
							element,
							doneFn)();
					}
				}
				doneFn();
			},
			removeClass(element, className, doneFn) {
				if (className === 'ng-hide') {
					var state = getState(getId(element));
					var height = (state.animating && state.height) ?
						state.height : element[0].offsetHeight;

					var animator = $animateCss(element, {
						from: {
							height: '0px'
						},
						to: {
							height: height + 'px'
						}
					});

					if (animator) {
						state.height = height;
						return generateRunner(false,
							state,
							height,
							element,
							doneFn)();
					}
				}
				doneFn();
			}
		};
	}]);

}