///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 11-09-2016.
 */
namespace AddressLocationModule {

	export class AddressLocationService {

		constructor() {}

		// Return location of doors in danish buildings
		private _sides(){
			return [
				'','TV','TH','MF'
			];
		}

		// Return floors numbers from MIN_FLOOR to MAX_FLOOR, plus special floors that are located first
		private _floors(){
			const MIN_FLOORS = 1;
			const MAX_FLOORS = 30;
			let floors = [];

			for (let i = MIN_FLOORS; i <= MAX_FLOORS ; i++) {
				floors.push(i.toString()); // Must be strings. Is stored as string i Eleks
			}

			floors.unshift("Mez");
			floors.unshift("Kld.");
			floors.unshift("St.");
			floors.unshift("");

			return floors;
		}

		// Return alphabetic letters in Danish format
		private _letters(){
			return [
				'','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Æ','Ø','Å'
			];
		}

		public get(data?:string) {
			var methodsMap = {
				Sides: this._sides(),
				Floors: this._floors(),
				Letters: this._letters()
			};
			if (data) {
				return methodsMap[data];
			}
			else {
				return methodsMap;
			}
		}
	}

	angular.module(moduleId).service("addressLocationService", AddressLocationService);
}
