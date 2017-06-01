///<reference path="../../../../references/references.ts"/>

/**
 * Author: MST
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type DeliveryTimeValidationViewModel = SCommerce.Website.Code.WebAPI.Models.Delivery.DeliveryTimeValidationViewModel;
	type DialogService = DialogModule.DialogService;

	class TimeslotBasketChangesController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public deliveryChanges:DeliveryTimeValidationViewModel = {} as DeliveryTimeValidationViewModel;
		public productsCheaper:Array<any> = [];
		public productsExpensive:Array<any> = [];
		public productsNotAvailable:Array<any> = [];

		constructor(private translationsService: TranslationsService,
				private $rootScope: ng.IRootScopeService,
				private timeslotService: TimeslotService,
				private timeslotStateService: TimeslotStateService,
				private dialogService: DialogService) {

			this.translations = translationsService.translations;

			this.deliveryChanges = this.timeslotService.timeslotChanges;

			// Loop through product differences
			this.deliveryChanges.ProductLineDiffs.forEach((item) => {
				if (item.Undeliverable) {
					this.productsNotAvailable.push(item);
				} else if (item.AmountDiff < 0) {
					this.productsCheaper.push(item);
				} else if (item.AmountDiff > 0) {
					this.productsExpensive.push(item);
				}
			});

			// Loop through bundle product differences
			this.deliveryChanges.BundleLineDiffs.forEach((item) => {
				if (item.Undeliverable) {
					this.productsNotAvailable.push(item);
				} else if (item.AmountDiff < 0) {
					this.productsCheaper.push(item);
				} else if (item.AmountDiff > 0) {
					this.productsExpensive.push(item);
				}
			});
		}

		public acceptBasketChanges() {
			this.timeslotService.updateTimeslot(this.timeslotService.unconfirmedTimeslot, true);
			this.dialogService.closeDialog();
			this.$rootScope.$broadcast('basketChanges_ACCEPTED');
		}

		// User rejects changes in basket, and new timeslot
		// Broadcast to timeslotSelector so he knows what is up
		public rejectBasketChanges() {
			this.$rootScope.$broadcast('basketChanges_REJECTED');
			this.dialogService.closeDialog();
			this.timeslotStateService.setTimeslotState(TimeslotStates.TimeslotSelector);
		}
	}


	class TimeslotBasketChangesComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
			};
			this.controller = TimeslotBasketChangesController;
			this.template = HtmlTemplates.timeslot.basketchanges.html;
		}
	}

	angular.module(moduleId).component("timeslotBasketchanges", new TimeslotBasketChangesComponent());


}
