///<reference path="../../../../references/references.ts"/>

/**
 * Author: MST
 */

namespace NewsletterModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	type DialogService = DialogModule.DialogService;

	export class NewsletterDialogService {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		constructor(private translationsService: TranslationsService,
					private trackingService: TrackingModule.TrackingService,
					private $location: ng.ILocationService,
					private $timeout:ng.ITimeoutService,
					private dialogService: DialogService) {

			this.translations = translationsService.translations;

			if(this.$location.search().emailsettings !== undefined) {
				this.$timeout( () => {
					this.openNewsletterDialog(this.$location.search().emailsettings);
					this.$location.search("");
				}, 300);
			}

		}

		public openNewsletterDialog(email:string="") {
			const defaultDialogSettings = {
				header: this.translations.Newsletter.SubscriptionDialog.Title,
				content: `<subscription class="subscription" email="'${email}'" is-modal-flow="true" show-cancel="true"></subscription>`,
				close: true,
				size: 'medium'
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(defaultDialogSettings);

			this.trackingService.trackCustomPageView('/tilmeld-nyhedsbrev/step1');
		}

	}

	angular.module(moduleId).service("newsletterDialogService", NewsletterDialogService);
}
