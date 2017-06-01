///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	function priceBaseFilter() {
		return (input) => {
			return Math.floor(input);
		};
	}

	angular.module(moduleId).filter("priceBase", priceBaseFilter);
}