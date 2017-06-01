///<reference path="../../../../references/references.ts"/>


namespace TrackingModule {

    export class RaptorTrackingService {

		public trackingId: string = window['scom'].raptor.raptorTrackingId;
		public isEnabled:boolean = window['scom'].raptor.raptorEnabled;

		private raptorPromise: ng.IPromise<any>;

		constructor(
			private $window: any,
			private $q: ng.IQService,
			private loadscriptService:UtilsModule.LoadScriptService
		) {
			if (this.isEnabled) {
				const raptorDfd = $q.defer();
				this.raptorPromise = raptorDfd.promise;

				//window.rsa is a global object for use outside the raptorLoaded function
				this.$window.raptorLoaded = (raptor) => {
					this.$window.rsa = raptor;

					//Setup account
					raptor.initialize({ customerID: this.trackingId, productIdParamIndex: 2, eventTypeParamIndex: 1 });

					//Resolve raptor promise once raptor has loaded.
					raptorDfd.resolve(this.$window.rsa);
				};

				//Load raptor script
				this.loadscriptService.loadScript("//az19942.vo.msecnd.net/script/raptor-2.1.0.js", true);
			}
		}

		public trackPageVisit(productId?:string,productName?:string,categoryPath?:string,price?:number,userId?:string,contentId?:string,zipCode?:string) {
			this.trackEvent('visit', productId, productName, categoryPath, price, userId, contentId, zipCode, 0);
		}

		public trackBuy(object: any, userId) {
			object.Lines.forEach(line=> {
				this.trackEvent('buy', line.Id, line.Name, '', line.Price, userId, '', object.DeliveryAddress.PostalCode.toString(), line.Quantity);
			});
 
 			if(object.Recipes && object.Recipes.length) {
				object.Recipes.forEach(recipe => {
					this.trackEvent('buy', null, recipe.Title, '', 0, userId, recipe.Id, object.DeliveryAddress.PostalCode.toString(), 1);
				});
			}
		}

		public trackAddToBasket(product, delta, user, recipe="") {
			this.trackEvent('addToBasket', product.Id, product.Name, null, product.Price, user, recipe, '', delta);
		}

		private trackEvent(eventType:string,productId:string = '',productName:string = '',categoryPath:string = '',price:number = 0,userId:string = '',contentId:string = '',zipCode:string = '', delta:number = 0) {
			if (this.isEnabled) {
				this.raptorPromise.then((rsa) => {
					rsa.trackEvent(eventType, productId, productName, categoryPath, price, 'DKK', userId, contentId, '', zipCode, delta);
				});
			} else {
				console.log('rsa.trackEvent()', arguments );
			}
		}

    }

	angular.module(moduleId).service("raptorTrackingService", RaptorTrackingService);

}
