///<reference path="../../../../references/references.ts"/>


namespace LessonsFilterModule {

	type LessonsFilterService = LessonsFilterModule.LessonsFilterService;

	export class LessonsFilterCtrl
    {
        public data:ILessonsSearchResult;
        public fetching:boolean = false;

        //static $inject = ["$scope", "$http", 'lessonsFilterService'];
        constructor(
            protected $scope: ng.IScope,
            private lessonsFilterService: LessonsFilterService)
        {
            this.data = lessonsFilterService.getDataRef();
            // Bind to service data update
            this.listenForChange();
        }

        public listenForChange():void {
            this.lessonsFilterService.listenForDataChange().then((data) => {
                this.data = data;
                this.listenForChange();
            }, (data) => {
                console.warn('error', data);
            }, (data) => {
                this.data = data;
            });
        }

        public loadMore():void {
            this.lessonsFilterService.loadMore();
        }

        public resetFilters():void {
            this.lessonsFilterService.resetFilters();
        }

        public updateFiltering(filter):void
        {
            this.fetching = true;
            let query = '';
            this.lessonsFilterService.getResults().then((data) => {
                this.fetching = false;
                this.data = data;
            }).catch(() => {
                this.fetching = false;
            });
        }
    }

    define(["bootstrap"], function () {
        return function (app) {
            app.controller("lessonsFilterCtrl", LessonsFilterCtrl);
        }
    });
}
