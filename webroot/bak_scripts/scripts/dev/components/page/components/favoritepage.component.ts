///<reference path="../../../../references/references.ts"/>

namespace PageModule {
	export interface IFavoritepageBindings {
		pagedata: any;
	}

	class FavoritepageController implements IFavoritepageBindings {

		public pagedata: IPageData;

		constructor(public userService: UserModule.UserService) {
		
		}
	}

	class FavoritepageComponent implements ng.IComponentOptions {
		
		public bindings: IFavoritepageBindings;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				pagedata: '<'
			};
			this.controller = FavoritepageController;
			this.template = HtmlTemplates.favoritepage.html;
		}
	}
	
	angular.module(moduleId).component("favoritepage", new FavoritepageComponent());

}
