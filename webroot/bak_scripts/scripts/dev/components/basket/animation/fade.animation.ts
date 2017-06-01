///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 26-04-2016.
 */

namespace BasketModule {


    angular.module(moduleId).animation('.fade', ['$animateCss', function($animateCss) {
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
                state.doneFn = doneFn;

                snabbt(element, {
                    duration:200,
                    opacity:closing?0:1,
                    fromOpacity: (closing?1:0),
                    fromPosition:[closing ? 0:10,0,0,0],
                    position:[0,0,0,0],
                    complete: function() {
                        doneFn();
                    }
                });
            };
        }

        return {

            addClass: function(element, className, doneFn) {
                if (className === 'ng-hide') {
                    var state = getState(getId(element));
                    var opacity=0;

                    var animator = $animateCss(element, {
                        from: {
                            opacity: 1
                        },
                        to: {
                            opacity: 0
                        }
                    });
                    if (animator) {

                        //state.height = height;
                        return generateRunner(true,
                            state,
                            opacity,
                            element,
                            doneFn)();
                    }
                }
                doneFn();
            },
            removeClass: function(element, className, doneFn) {
                if (className === 'ng-hide') {
                    var state = getState(getId(element));
                    var opacity=0;

                    var animator = $animateCss(element, {
                        from: {
                            opacity: 0
                        },
                        to: {
                            opacity: 1
                        }
                    });

                    if (animator) {
                        //state.height = height;
                        return generateRunner(false,
                            state,
                            opacity,
                            element,
                            doneFn)();
                    }
                }
                doneFn();
            }
        };
    }]);

}