
// Include a comment about why this seemingly unused module exists


namespace TemplateModule {
    angular.module('templates', []);

}

namespace MindModule {

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

	export const moduleId: string = "mindModule";

    angular.module(moduleId, ['templates']);

}

