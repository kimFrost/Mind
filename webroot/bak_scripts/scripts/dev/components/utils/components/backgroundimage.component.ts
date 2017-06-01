///<reference path="../../../../references/references.ts"/>

namespace UtilsModule {


    class BackgroundImageController {


        constructor(
			private $element:any,
			private $rootScope:ng.IRootScopeService,
			private metadataService:PageModule.MetaDataService) {

			this.$rootScope.$on('PAGE_CHANGED', () => {
				// console.log(metadataService.pageMetaData.BackgroundImageForJson);
				$element.css("background-image", "");
            	if(metadataService.pageMetaData.BackgroundImageForJson !== null) {
					$element.css("background-image", "url('" + metadataService.pageMetaData.BackgroundImageForJson.Url + "&w=1920&h=1100&mode=crop')");
				}
			});

		}


    }

    class BackgroundImageComponent implements ng.IComponentOptions {
        
        public bindings: any;
        public controller: any;
        public template: string;

        constructor() {
            this.bindings = {
            };
            this.controller = BackgroundImageController;
            this.template = "";
        }
    }
    
    angular.module(moduleId).component("backgroundImage", new BackgroundImageComponent());

}
