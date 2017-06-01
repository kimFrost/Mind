///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 17-08-2016.
 */
namespace CheckoutModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	type IMergeOrderViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.MergeOrderViewModel;
	
	class MergeOrdersController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public orders:IMergeOrderViewModel;

		constructor(
			private translationsService: TranslationsService,
			private mergeOrderService: MergeOrderService) {

			this.translations = translationsService.translations;
			this.orders = mergeOrderService.getOrders();
		}

		$onInit() {}

		/**
		 * @author MKI
		 * @description User has selected an order and click´s accept to merge with existing order
		 * @param selectedOrder
		 */
		public acceptToMergeOrders(selectedOrder:IMergeOrderViewModel) {
			if(selectedOrder){
				this.mergeOrderService.mergeOrders(selectedOrder);
			}
		}

		/**
		 * @author MKI
		 * @description User rejects to merge with other orders and will place that order anyway.
		 */
		public rejectToMergeOrders() {
			this.mergeOrderService.rejectToMergeOrders();
		}
	}

	class MergeOrdersComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = MergeOrdersController;
			this.template = HtmlTemplates.checkout.mergeOrders.template.html;
			this.bindings = {};
		}
	}

	angular.module(moduleId).component("mergeOrders", new MergeOrdersComponent());
}

