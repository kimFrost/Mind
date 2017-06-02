

namespace MindModule {

	//type MindActorService = MindModule.MindActorService;

    class MindActorController {

		public data:any;
		//public onFacetChange:Function;

		public needs:Array<any>;

		constructor($rootScope:ng.IRootScopeService) {
			this.needs = [];
		}

		$onInit() {
			console.log('mind actor init');

			let need = {
				type: 'eat',
				level: 1,
				wants: [
					{
						targetTags: ['food']
					}
				]
			}
			//let need = new Need();
			//this.needs.push(need);
		}

		/*
		public updateFilter(resetUrl: boolean = false) {
			this.onFacetChange();
		}
		*/
 
	}

	class MindActorComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		//public template: string;
		public templateUrl: string;

		constructor() {
			this.bindings = {
				data: '<'
				//onFacetChange: '&'
			};
			this.controller = MindActorController;
			this.templateUrl = 'modules/mind/templates/mind.actor.template.html';
			//this.template = '<div>fdgfdg</div>';
		}
	}

	angular.module(MindModule.moduleId).component("mindActor", new MindActorComponent());

}

