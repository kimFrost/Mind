/// <reference path="../../../../references/references.ts" />

/**
 * Created by MKI on 13/09/2016.
 */
namespace UtilsModule {

	const STORAGE_PATH = 'nemlig_storage';
	const STORAGE_NAME = 'checkoutData';

	export class StorageService {

		constructor(
			private localStorageService) {
		}

		/**
		 * @author MKI
		 * @description the the stored object from Session
		 * @param storageName
		 */
		public get(storageName:string = STORAGE_NAME):any {

			const storageId = `${STORAGE_PATH}_${storageName}`;
			return this.localStorageService.get(storageId);
		}

		/**
		 * @author MKI
		 * @param storageName
		 * @param data
		 */
		public set(storageName: string = STORAGE_NAME, data: Object):void {
			const storageId = `${STORAGE_PATH}_${storageName}`;
			this.localStorageService.set(storageId, data);
		}

		/**
		 * @author MKI
		 * @description the the stored object from Session
		 * @param storageName
		 */
		public remove(storageName:string = STORAGE_NAME):void {
			const storageId = `${STORAGE_PATH}_${storageName}`;

			if(this.get(storageName)){
				this.localStorageService.remove(storageId);
			}else{
				return;
			}
		}


	}

	angular.module(moduleId).service("storageService", StorageService);
}
