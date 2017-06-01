///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	function priceDecimalsFilter() {
		return (input) => {
			let value = Math.round((input - Math.floor(input)) * 100);
			return value > 10 ? value : `0${value}`;
		};
	}

	angular.module(moduleId).filter("priceDecimals", priceDecimalsFilter);
}