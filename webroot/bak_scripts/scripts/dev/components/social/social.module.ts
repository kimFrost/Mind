///<reference path="../../../references/references.ts"/>

namespace SocialModule {

	export enum EFacebookMethod { Feed, Share, Send }

	export interface IFacebookFeed { Method: EFacebookMethod; Title: any; Description: any; Image: any;}

	export interface IInstagramFeed { Method: EFacebookMethod; Title: any; Description: any; Image: any;}

	export const moduleId: string = "socialModule";

    angular.module(moduleId, []);

}
