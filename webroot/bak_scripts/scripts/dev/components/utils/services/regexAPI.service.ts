/// <reference path="../../../../references/references.ts" />

/**
 * Created by MKI on 13/09/2016.
 */
namespace UtilsModule {

	export class RegexApiService {

		constructor() {}

		/**
		 *  TODO the RegEx should come from the SettingsService so they are universal
		 */

		/**
		 * @author MKI
		 * @description Returns RegEx for password
		 * @returns {string}
		 * @private
		 */
		private _password() {
			return '^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9\W]).*$';
		}


		/**
		 * @author MKI
		 * @description Returns API used by ELEKS
		 * @returns {RegExp}
		 * @private
		 */
		private _email() {
			return /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
			//return /^[A-Za-z0-9][A-Za-z0-9._!%+-]?@(?:[A-Za-z0-9-]?\.)+[A-Za-z]{2,}$/;
		}
		
		private _phone() {
			return /([2-8][0-9]{7}|9[0-8][0-9]{6}|99[0-8][0-9]{5}|999[0-8][0-9]{4}|9999[0-8][0-9]{3}|99999[0-8][0-9]{2}|999999[0-8][0-9]|9999999[0-9])/;
		}

		/**
		 *
		 * @returns {{password: string, email: RegExp}}
		 * @constructor
		 */
		public API() {
			return {
				password: this._password(),
				email: this._email(),
				phone:this._phone()
			};
		}
	}

	angular.module(moduleId).service("regexApiService", RegexApiService);
}
