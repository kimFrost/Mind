///<reference path="../../../references/references.ts"/>

function snabbt(element:any, param2:any) {
    
}

namespace PageModule {


    export class PageTransition {


        constructor() {

            var animation = {
                enter(element, done) {

                    element.css("display", "none");

                    setTimeout(function() {
                        element.css("display", "block");
                        snabbt(element, {
                            position: [0, 0, 0],
                            fromPosition: [-800, 0, 0],
                            complete: done
                        });
                    }, 500);


                },
                leave(element, done) {

                    snabbt(element, {
                        position: [500, 0, 0],
                        fromPosition: [0, 0, 0],
                        opacity:0,
                        complete: done
                    });
                }
            };
            return animation;

        }

    }

    // angular.module(moduleId).animation(".page-animation", PageTransition);

}
 