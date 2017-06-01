///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	function typeaheadFilter() {
		return (input, query) => {
			var queryString = String(query);
			return String(input).toLowerCase().replace(queryString.toLowerCase(), `<span class="typeahead__highlighted">${queryString.charAt(0).toUpperCase() + queryString.slice(1)}</span>`);
		};
	}

	angular.module(moduleId).filter("typeahead", typeaheadFilter);
}