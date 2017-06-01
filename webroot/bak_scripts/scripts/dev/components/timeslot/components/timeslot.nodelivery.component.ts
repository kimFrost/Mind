///<reference path="../../../../references/references.ts"/>

/**
 * Author: MST
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;

	enum NewsletterSubscriptionStatus {
		Subscribed,
		AlreadySubscribed,
		InvalidEmail,
		Error
	}

	export interface IFormData {
		email: string;
		zipcode: string;
		deliveryNotificationSubscription: boolean;
		newsletterSubscription: boolean;
		newsletterWeeklyOffersSubscription: boolean;
		newsletterCookingInspirationSubscription: boolean;
	}


	class TimeslotNoDeliveryController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public zipCode: string = "";
		public formData: IFormData = {} as IFormData;
		public subscriptionSuccess: boolean = false;
		public emailRegexPattern:any;

		constructor(
			private $scope: ng.IScope,
			private $timeout: ng.ITimeoutService,
			private regexApiService: UtilsModule.RegexApiService,
			private timeslotService: TimeslotService,
			private subscriptionsService: SubscriptionsModule.SubscriptionsService,
			translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

			this.emailRegexPattern = regexApiService.API().email;
		}


		// Submit
		public subscriptionSubmit() {

			// Update zipcode
			this.formData.zipcode = this.timeslotService.latestKnownZipcode.toString();

			// Subscribe
			this.subscriptionsService.subscribeToDeliveryNotification(
				this.formData.email,
				this.formData.zipcode,
				this.formData.deliveryNotificationSubscription,
				this.formData.newsletterSubscription,
				this.formData.newsletterWeeklyOffersSubscription,
				this.formData.newsletterCookingInspirationSubscription).then((response) => {

					if (response === NewsletterSubscriptionStatus.Subscribed) {
						this.subscriptionSuccess = true;
					}
			});

		}


		// Newsletter checkbox' logic
		public newsletterSelection() {
			// If parent node is selected, automatically select first child as well
			if (this.formData.newsletterSubscription && !this.formData.newsletterWeeklyOffersSubscription) {
				this.formData.newsletterWeeklyOffersSubscription = true;
			}
			// If parent node is de-selected, deselect the children as well
			else if (!this.formData.newsletterSubscription) {
				this.formData.newsletterWeeklyOffersSubscription = false;
				this.formData.newsletterCookingInspirationSubscription = false;
			}
		}

		$onInit() {

			// If the user inputs a zipcode we need it here
			this.$scope.$watch(() => {
				return this.timeslotService.latestKnownZipcode;
			}, (zip) => {
				if (zip) {
					this.zipCode = this.timeslotService.latestKnownZipcode.toString();	
				}
			});

			this.$timeout(() => {
				this.formData.email = "";
				this.formData.zipcode = "";
				this.formData.deliveryNotificationSubscription = true;
				this.formData.newsletterSubscription = false;
				this.formData.newsletterWeeklyOffersSubscription = false;
				this.formData.newsletterCookingInspirationSubscription = false;
			});
		}
	}


	class TimeslotNoDeliveryComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
			};
			this.controller = TimeslotNoDeliveryController;
			this.template = HtmlTemplates.timeslot.nodelivery.html;

		}
	}

	angular.module(moduleId).component("timeslotNodelivery", new TimeslotNoDeliveryComponent());


}
