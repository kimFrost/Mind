///<reference path="../../../../references/references.ts"/>

/**
 * Author: MST
 */

namespace TimeslotModule {
	type DialogService = DialogModule.DialogService;
	type TranslationsService = TranslationsModule.TranslationsService;

	export class TimeslotDialogService {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		constructor(private dialogService: DialogService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

		}

		public initNoDelivery() {
			const defaultDialogSettings = {
				header: this.translations.Timeslot.NoDeliveryDialog.DialogHeader,
				content: '<timeslot-nodelivery></timeslot-nodelivery>',
				close: true,
				size: 'small'
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(defaultDialogSettings);
		}

		public initConfirmBasketChanges() {
			const defaultDialogSettings = {
				header: this.translations.Timeslot.CheckAddressDialog.ChangesToBasket,
				content: '<timeslot-basketchanges></timeslot-basketchanges>',
				close: false,
				size: 'medium'
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(defaultDialogSettings);
		}

		public initCheckAddress(postalCode: number = 0, initiateFlow:boolean = true):ng.IPromise<any> {
			const defaultDialogSettings = {
				header: this.translations.Timeslot.CheckAddressDialog.DialogHeader,
				content: `<timeslot-checkaddress postal-code="${postalCode.toString()}" initiate-flow="${initiateFlow}"></timeslot-checkaddress>`,
				close: true,
				size: 'small',
				appendClass: 'checkaddress-dialog'
			} as DialogModule.IDialogSettings;

			return this.dialogService.openDialog(defaultDialogSettings);
		}

		public timeslotClosesSoon(minutes) {

			const defaultDialogSettings = {
				header: this.translations.Timeslot.ClosesSoon.Title,
				content: `<div>${this.translations.Timeslot.ClosesSoon.Description} <b>${minutes} ${this.translations.Timeslot.ClosesSoon.Minutes}</b></div>`,
				close: true,
				size: 'small'
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(defaultDialogSettings);
		}
	}

	angular.module(moduleId).service("timeslotDialogService", TimeslotDialogService);
}
