///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	function priceFilter(currencyFilter: ng.IFilterCurrency, numberFilter: ng.IFilterNumber) {
		return (input, disableExtension, fraction) => {
			if(typeof input === 'string') {
				input = input.replace(',','.');
			}
			fraction = (typeof fraction === 'number') ? fraction : 2;
			return disableExtension ? numberFilter(input, fraction) : currencyFilter(input, undefined, fraction);
		};
	}

	angular.module(moduleId).filter("price", ['currencyFilter', 'numberFilter', priceFilter]);
}