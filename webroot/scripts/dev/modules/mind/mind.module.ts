
// Include a comment about why this seemingly unused module exists


namespace TemplateModule {
    angular.module('templates', []);

}

namespace MindModule {

    export interface INeed
    {
        Id:string;
        Title:string;
        Importance?:number;
        Wants?:Array<any>;
    }
    export class Need implements INeed {
        constructor (
            public Id:string = '',
            public Title: string = '',
            public Importance:number = 0, 
            public Wants:Array<any> = []
        ) {}  
    }

    export interface IFeeling
    {
        Id:string;
        Title:string;
        ValueAddition?:number;
        Affections?:Array<any>;
        Convertions?:Array<any>;
    }
    export class Feeling implements IFeeling {
        constructor (
            public Id:string = '',
            public Title: string = '',
            public ValueAddition:number = 0, 
            public Affections:Array<any> = [],
            public Convertions:Array<any> = []
        ) {}  
    }

    export interface IAction
    {
        Id:string;
        Title:string;
    }
    export class Action implements IAction {
        constructor (
            public Id:string = '',
            public Title: string = ''
        ) {}  
    }

	export const moduleId: string = "mindModule";

    angular.module(moduleId, ['templates']);

}

