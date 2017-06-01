///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {
	function jsondateFilter() {
		return (input) => {
			return new Date(parseInt(input.substr(6)));
		};
	}

	angular.module(moduleId).filter("jsonDate", [jsondateFilter]);
}
