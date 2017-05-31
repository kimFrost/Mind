///<reference path="../../../../references/references.ts"/>


namespace LessonsFilterModule {

	type LessonsFilterService = LessonsFilterModule.LessonsFilterService;

    class LessonsFilterFacetController {

		public data:ILessonsFilterFacet;
		public onFacetChange:Function;

		constructor($rootScope:ng.IRootScopeService, private lessonsFilterService:LessonsFilterService) {}

		$onInit() {}

		public updateFilter(resetUrl: boolean = false) {
			this.onFacetChange();
		}
 
	}

	class LessonsFilterFacetComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public templateUrl: string;

		constructor() {
			this.bindings = {
				data: '<',
				onFacetChange: '&'
			};
			this.controller = LessonsFilterFacetController;
			this.templateUrl = 'lessons.filter.facet.html';
		}
	}

    define(["bootstrap"], function () {
        return function (app) {
            app.component("lessonsFilterFacet", new LessonsFilterFacetComponent());
        }
    });

}

