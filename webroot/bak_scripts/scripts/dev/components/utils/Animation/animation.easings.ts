///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {

	export class Animation {

		// Easing functions for js animations
		public static easings = {
			easeInCubic: (t) => { return Math.pow(t, 3); },
			easeOutCubic: (t) => { return 1 - Math.pow(1 - t, 3); },
			easeInOutCubic(t) {
				if (t < 0.5) { return this.easings.easeInCubic(t * 2.0) / 2.0; } else { return 1 - this.easings.easeInCubic((1 - t) * 2) / 2; }
			},
			easeInQuad: (x, t, b, c, d) => { return c * (t /= d) * t + b; },
			easeOutQuad: (x, t, b, c, d) => { return -c * (t /= d) * (t - 2) + b; },
			easeInOutQuad: (x, t, b, c, d) => {
				if ((t /= d / 2) < 1) { return c / 2 * t * t + b; } else { return -c / 2 * ((--t) * (t - 2) - 1) + b; }
			}

		};

	}
}
