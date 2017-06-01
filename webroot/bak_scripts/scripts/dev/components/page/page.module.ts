///<reference path="../../../references/references.ts"/>

namespace PageModule {
	export interface IPageMetaData extends SCommerce.Website.Code.Content.Model.IMetaDataContentModel{
		MenuContextId:string;
		Id:string;
		Name:string;
		NavigationTitle:string;
		TemplateId:string;
		Url:string;
		AuthenticationRequired: boolean;
		TrackingId:string;
	}

	export interface IPageData {
		content:Array<any>;
		MetaData: IPageMetaData;
	}
	
	export const moduleId: string = "pageModule";

	angular.module(moduleId, ["ngAnimate"]);


}
