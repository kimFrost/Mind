///<reference path="../../../references/references.ts"/>



namespace LessonsFilterModule {

    export const moduleId: string = "lessonsFilterModule";


    export interface ILessonsFilterFacet
    {
        Count?:Number;
        Key:string;
        Selected?:boolean;
        TotalCount?:Number;
    }
    export class FilterFacet implements ILessonsFilterFacet {
        constructor (
            public Key:string = '',
            public Selected: boolean = false,
            public Count:Number = 0, 
            public TotalCount:Number = 0, 
        ) {}  
    }
    export interface ILessonsFilterFacetList
    {
        Name: string;
        Values: Array<ILessonsFilterFacet>
    }
    export interface ILessonsLesson
    {
        Title: string;
        Description?: string;
        Grade?: string;
        Duration?: string;
        Difficulty?: string;
        Subjects?: Array<string>;
        MediaUrl?: string;
    }
    export interface ILessonsSearchResult
    {
        Facets:Array<ILessonsFilterFacetList>;
        Hits:Array<ILessonsLesson>;
        PageSize:Number;
        Skip:Number;
        TotalHits:Number;
    }
    export interface ILessonsFilterData
    {
        Filters:Array<ILessonsFilterFacetList>;
        Lessons:Array<ILessonsLesson>;
    }

    define([
        "./services/page.data.service",
        "./services/lessons.filter.service",
        "./controllers/lessons.filter.controller",
        "./components/lessons.filter.facet.component",
        "./components/lessons.filter.facetlist.component",
         "text!./templates/lessons.filter.facet.html",
         "text!./templates/lessons.filter.facetlist.html"
        
    ], function (pageDataService, lessonsFilterService, lessonsFilterCtrl, lessonsFilterFacetComponent, lessonsFilterFacetlistComponent, lessonsFilterFacetTemplate, lessonsFilterFacetlistTemplate) {

        var app = angular.module(moduleId, []).run(function($templateCache) {
            $templateCache.put("lessons.filter.facet.html", lessonsFilterFacetTemplate);
            $templateCache.put("lessons.filter.facetlist.html", lessonsFilterFacetlistTemplate);
        });

        pageDataService(app);
        lessonsFilterService(app);
        lessonsFilterCtrl(app);
        lessonsFilterFacetComponent(app); 
        lessonsFilterFacetlistComponent(app);
    });

}
