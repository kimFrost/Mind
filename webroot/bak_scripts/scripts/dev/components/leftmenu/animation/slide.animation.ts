///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 26-04-2016.
 */

namespace LeftMenuModule {


    angular.module(moduleId).animation('.left-menu__slide-toggle', ['$animateCss', function($animateCss) {
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
            return function() {
                state.animating = true;
                //state.animator = animator;
                state.doneFn = doneFn;

                snabbt(element, {
                    duration:250,
                    height: (closing?0:animator),
                    fromHeight: (closing?animator:0),
                    complete: function() {
                        element[0].style.height = '';
                        doneFn();
                    }
                });
            };
        }

        return {

            addClass: function(element, className, doneFn) {
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
            removeClass: function(element, className, doneFn) {
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