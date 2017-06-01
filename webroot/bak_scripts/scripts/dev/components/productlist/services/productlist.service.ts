///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 12/05/16.
 */

namespace ProductlistModule {
	export class ProductListService {
		constructor(private $q: ng.IQService,
			private $http: ng.IHttpService) {
		}

		private waitingList:Array<any> = [];
		private currentLoadItem:any = null;
		private idleTime:number = 100;

		public getProducts(url: string, componentId:string=""): ng.IPromise<any> {
			var defer = this.$q.defer();

			var request = {url:url, defer:defer, id: componentId};
			this.waitingList.push(request);
			if(this.waitingList.length === 1) {
				this.getList();
			}

			return defer.promise;
		}

		public cancelRequest(url: string, componentId:string="") {
			this.waitingList.forEach( (item, index) => {
				if(url === item.url && componentId === item.id && url !== this.currentLoadItem.url) {

					this.waitingList.splice(index, 1);
				}
			});
		}

		public getList()  {

			this.currentLoadItem = this.waitingList[0];

			this.$http({
				method: 'GET',
				url: this.currentLoadItem.url
			}).then((response) => {

				var productGroup:any = {};
				angular.merge(productGroup, response.data);
				this.currentLoadItem.defer.resolve(productGroup);
				this.waitingList.splice(0, 1);
				if(this.waitingList.length > 0) {
					setTimeout( () => {
						this.getList();
					}, this.idleTime);
				}

			}).finally(() => {
				this.currentLoadItem.defer.reject();
			});

		}

	}
	angular.module(moduleId).service("productlistService", ProductListService);
}