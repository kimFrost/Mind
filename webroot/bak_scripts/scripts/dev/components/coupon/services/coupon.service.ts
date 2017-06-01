///<reference path="../../../../references/references.ts"/>



namespace CouponModule {

	type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;

	type BasketService = BasketModule.BasketService;

	export class CouponService {

		public states = {
			pending: false
		};

		constructor(private $q:ng.IQService,
					private $http:ng.IHttpService,
					private basketService: BasketService) {

		}

		public addCoupon = (coupon:string):ng.IPromise<any> => {
			let defer = this.$q.defer();

			coupon = coupon.replace(/\s/g, ''); // Remove spaces from coupon string

			this.states.pending = true;
			this.$http({method: 'GET', url: '/webapi/Coupon/' + 'addCoupon?couponCode=' + coupon}).then((response)=> {
				this.states.pending = false;
				this.basketService.get();
				defer.resolve(response);
			}, (response) => {
				this.states.pending = false;
				defer.reject(response);
			});

			return defer.promise;
		};

	}


	angular.module(moduleId).service("couponService", CouponService);
}
