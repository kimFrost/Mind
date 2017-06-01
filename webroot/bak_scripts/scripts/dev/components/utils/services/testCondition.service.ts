/// <reference path="../../../../references/references.ts" />

namespace UtilsModule {

	export class TestConditionService {


		public test = {
			numbers:{
				isNumberEqual: TestConditionService.isNumberEqualTo,
				isNumbersDifferent: TestConditionService.isNumberDifferent
			},
			booleans:{
				isTrue: TestConditionService.isTruthy,
				isFalse: TestConditionService.isFalsy,
				mayNotBeNull: TestConditionService.notNullOrUndefined
			},
			strings:{
				mustNotMatch: TestConditionService.stringMustNotMatch,
				mustMatch: TestConditionService.stringMustMatch,
				mustContainSymbol: TestConditionService.stringMustContainSymbol,
				mayNotBeEmpty: TestConditionService.stringMayNotBeEmpty,

				mayNotBeOfValueNull: TestConditionService.stringMayNotBeOfValueNull,
				mayNotBeNull: TestConditionService.notNullOrUndefined
			},
			objects:{
				hasProperties: TestConditionService.objectHasProperties,
				hasPropertyName: TestConditionService.objectHasPropertyName
			},
			arrays:{
				hasArrayElements: TestConditionService.arrayMustHaveItems,
				inArray: TestConditionService.arrayMustContainStringValue
			},

			isDefined: TestConditionService.isDefined,
			isUnDefined: TestConditionService.isUnDefined
		};

		constructor() {}

		/* Numbers Start*/

		/**
		 * @author MKI
		 * @description Check that to numbers is equal to each other.
		 * @param value
		 * @param compareTo
		 * @returns {boolean}
		 */
		static isNumberEqualTo(value:number = 0, compareTo:number = 0):boolean {
			return value === compareTo;
		}

		/**
		 * @author MKI
		 * @description Check that to numbers is different from each other.
		 * @param value
		 * @param compareTo
		 * @returns {boolean}
		 */
		static isNumberDifferent(value:number = 0, compareTo:number = 0):boolean {
			return value !== compareTo;
		}


		/* Objects */

		/**
		 * @author
		 * @description Check is an Object has Properties
		 * @param object
		 * @returns {boolean}
		 */
		static objectHasProperties(object:Object = {}):boolean {
			return Object.keys(object).length >= 1;
		}


		/**
		 * @author MKI
		 * @description Check if and object has a property name
		 * @param obj
		 * @param propertyName
		 * @returns {boolean}
		 */
		static objectHasPropertyName(obj:Object = {}, propertyName:string = '') {
			return obj.hasOwnProperty(propertyName);
		}


		/**
		 * @author MKI
		 * @description Check if an Object exists.
		 * @param value
		 * @returns {boolean}
		 */
		static isDefined(value):boolean {
			return value === null || value === undefined || value === 'undefined' ? false : true;
		}

		/**
		 * @author MKI
		 * @description Check if an Object does not exists.
		 * @param value
		 * @returns {boolean}
		 */
		static isUnDefined(value):boolean {
			return value === null || value === undefined || value === 'undefined' ? true : false;
		}

		/**
		 * TODO may be deleted
		 * @param value
		 * @returns {boolean}
		 */
		static mustBeDefined(value):boolean {
			return value === null ? false : true;
		}

		/**
		 * @author
		 * @description check if value is NOT null 'undefined' or undefined
		 * @param val
		 * @returns {boolean}
		 */
		static notNullOrUndefined(val):boolean {
			return !(val === null || val === 'undefined' || val === undefined);
		}


		/* Arrays */

		/**
		 * @author MKI
		 * @description Check that an array has minimum 1 item
		 * @param arrayCollection
		 * Todo can be converted to array.find in ES2015
		 * @returns {boolean}
		 */
		static arrayMustHaveItems(arrayCollection:Array<any> = []):boolean {
			return arrayCollection.length >= 1;
		}

		/**
		 * @author
		 * @description search array for matching string value
		 * @param value
		 * @param array
		 * @returns {boolean}
		 */
		static arrayMustContainStringValue(value:string = '', array:Array<any> = []):boolean {
			return array.indexOf(value) > -1;
		}



		/* Booleans Start */

		/**
		 * @author MKI
		 * @description Check if boolean value is true
		 * @param val
		 * @returns {boolean}
		 */
		static isTruthy(val:boolean):boolean {
			return val === true;
		}

		/**
		 * @author MKI
		 * @description Check if boolean value is false
		 * @param val
		 * @returns {boolean}
		 */
		static isFalsy(val:boolean):boolean {
			return val === false;
		}


		/* Strings Start*/

		/**
		 * @author MKI
		 * @description Compare a string against another string and return false if they match each other
		 * @param str
		 * @param compareTo
		 * @returns {boolean}
		 */
		static stringMustNotMatch(str:string = '', compareTo:string = ''):boolean {
			return str === compareTo ? false : true;
		}

		/**
		 * @author MKI
		 * @description Compare a string to and another string and return true if they match
		 * @param str
		 * @param compareTo
		 * @returns {boolean}
		 */
		static stringMustMatch(str:string = '', compareTo:string = ''):boolean {
			return str === compareTo ? true : false;
		}

		/**
		 * @author MKI
		 * @description Test a string to see if it is empty. Returns true is it is not empty
		 * @param str
		 * @returns {boolean}
		 */
		static stringMayNotBeEmpty(str:string):boolean{
			return str !== '';
		}



		static stringMayNotBeOfValueNull(str:string):boolean{
			return str !== 'null';
		}


		/**
		 * @author MKI
		 * @description String must contain a symbol, char or substring
		 * @param str
		 * @param symbol
		 * @returns {boolean}
		 */
		static stringMustContainSymbol(str:string, symbol:string):boolean{
			return str.indexOf(symbol) !== -1;
		}


		/**
		 * @author MKI
		 * @description returns True if ALL conditions pass TRUE
		 * @param conditions
		 * @returns {boolean}
		 */
		public isAllConditionsTrue(conditions:Array<any>):boolean {
			return conditions.every(condition => condition === true);
		}

		/**
		 * @author MKI
		 * @description Test that SOME conditions has to be true
		 * @param conditions
		 * @returns {boolean}
		 */
		public isSomeConditionsTrue(conditions:Array<any>):boolean {
			return conditions.some(condition => condition === true);
		}



		/**
		 * @author MKI
		 * @description returns True if ALL conditions pass TRUE
		 * @param conditions
		 * @returns {boolean}
		 */
		public isAllConditionsFalse(conditions:Array<any>):boolean {
			return conditions.every(condition => condition === false);
		}


		/**
		 * @author MKI
		 * @description Test that SOME conditions returns false
		 * @param conditions
		 * @returns {boolean}
		 */
		public isSomeConditionsFalse(conditions:Array<any>):boolean {
			return conditions.some(condition => condition === false);
		}


	}

	angular.module(moduleId).service("testConditionService", TestConditionService);
}
