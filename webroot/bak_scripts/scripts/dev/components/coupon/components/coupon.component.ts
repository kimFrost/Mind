///<reference path="../../../../references/references.ts"/>

namespace CouponModule {

	type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;

	type BasketService = BasketModule.BasketService
	type TranslationsService = TranslationsModule.TranslationsService;

	class CouponController {

		public msg: string = '';
		public translations: Object;
		public basket: BasketViewModel;
		public formData: any;
		public serviceStates: any;
		public states = {
			fetching: false,
			showMsg: false
		};

		constructor(private $element,
			private $scope: ng.IScope,
			private basketService: BasketService,
			private couponService: CouponService,
			private translationsService: TranslationsService) {

			$element.addClass('coupon');
			this.translations = translationsService.translations;

			this.serviceStates = couponService.states;

			// Watch basket for coupons. When added and reload
			this.$scope.$watch(() => {
				return basketService.basket;
			}, () => {
				this.basket = basketService.basket;
			});

		}

		public addCoupon = (coupon: string) => {
			this.states.fetching = true;
			this.states.showMsg = false;
			this.couponService.addCoupon(coupon).then(() => {
				this.states.fetching = false;
				this.resetForm();
			}).catch((response) => {
				this.states.fetching = false;
				this.msg = response.data.ErrorMessage;
				this.states.showMsg = true;
			});
		};

		public resetForm = () => {
			this.formData.coupon = '';
		};
	}

	class CouponComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.controller = CouponController;
			this.template = HtmlTemplates.coupon.html;
		}
	}

	angular.module(moduleId).component("coupon", new CouponComponent());

}
