///<reference path="../../../../references/references.ts"/>

namespace MosaicLayoutsModule {

	export interface IMosaicLayoutBindings {
		mosaicdata: any;
	}

	class MosaicLayout1Controller implements IMosaicLayoutBindings {

		public mosaicdata: any;
		public dataBinding: number;
		public functionBinding: () => any;
		public sortedData;
		public fadeIn:boolean = false;

		constructor(
			private $timeout,
			private trackingService:TrackingModule.TrackingService
		) {}

		trackClick(spot, position) {
			this.trackingService.trackPromoClick(spot, position);
		}

		$onInit() {
			this.addBlockClassData(this.mosaicdata);

			this.$timeout( () => {
				this.fadeIn = true;
			}, 200);

			this.trackingService.trackPromoImpression(this.mosaicdata.subSpots);
		}

		$onDestroy() { }

		// Add additional data to model
		private addBlockClassData(data) {

			// Add block class to spots
			for (var i = 0; i < data.subSpots.length; i++) {
				data.subSpots[i].FadeIn = false;

				if (i === 0 || i === 5) {
					data.subSpots[i].BlockClass = 'big-block';
				} else {
					data.subSpots[i].BlockClass = 'small-block';
				}
			}


			// TODO: Remove block later if not necessary
			// var index = 0;
			// for (var i = 0; i < data.subSpots.length; i++) {
			//     var shuffled = this.shuffleArray(data.subSpots);
			//     this.$timeout( function() {
			//         shuffled[index].FadeIn = true;
			//         index++;
			//     }, 100 + (i * 80));
			// }

		}

		// TODO: Remove block later if not necessary
		// private shuffleArray(arr) {
		//     var array = arr.slice();
		//     for (var i = array.length - 1; i > 0; i--) {
		//         var j = Math.floor(Math.random() * (i + 1));
		//         var temp = array[i];
		//         array[i] = array[j];
		//         array[j] = temp;
		//     }
		//     return array;
		// }


	}

	class MosaicLayout1Component implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				mosaicdata: '='
			};
			this.controller = MosaicLayout1Controller;
			this.template = HtmlTemplates.mosaiclayout1.html;
		}
	}

	angular.module(moduleId).component("mosaiclayout1", new MosaicLayout1Component());

}
