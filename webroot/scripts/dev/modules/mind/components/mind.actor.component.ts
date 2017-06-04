///<reference path="../mind.module.ts"/>
///<reference path="../services/mind.service.ts"/>


namespace MindModule {

	type MindService = MindModule.MindService;

	class MindActorController {

		public data: any;
		//public onFacetChange:Function;
		public time: number;
		public needs: Array<INeed>;
		public wants: Array<IWant>;

		public needPreferences = [
			{
				Id: "NEED_Food",
				MinValue: 10
			},
			{
				Id: "NEED_Sleep",
				MinValue: 20
			}
		];

		constructor(
			$rootScope: ng.IRootScopeService,
			$scope: ng.IScope,
			private mindService: MindService
		) {
			this.needs = [];
			this.wants = [];

			$scope.$on('timeUpdate', (e: any, arg: any) => {
				//this.onTimeUpdate(arg...);
				this.onTimeUpdate(arg.currentTime, arg.timeProgressed);
			});
		}

		$onInit() {
			console.log('mind actor init');
			/*
			let need = {
				type: 'eat',
				level: 1,
				wants: [
					{
						targetTags: ['food']
					}
				]
			}
			*/
			let need = new Need('NEED_Food');
			this.needs.push(need);

			//this.mindService.bindToTimeUpdate(this, this.onTimeUpdate);

			// Strive for emotional balance.

		}

		public onTimeUpdate(time: number, timeProgressed: number): void {
			//console.log('onTimeUpdate', time, timeProgressed);
			this.time = time;
			this.progressNeeds(timeProgressed);
		}

		public progressNeeds(timeProgressed: number): void {
			for (let need of this.needs) {
				//need.Wants
				need.Value += timeProgressed;
			}


		}

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

