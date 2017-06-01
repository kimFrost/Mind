///<reference path="../../../../references/references.ts"/>

namespace NewsletterModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	type UpdateSubscribtionRequestArg = SCommerce.Website.Code.WebAPI.Controllers.UpdateSubscribtionRequestArg;
	type DialogService = DialogModule.DialogService;
	type SubscriptionsExtended = SubscriptionsModule.SubscriptionsExtended;
	type CreateUserService = UserModule.CreateUserService;

	type MemberDataViewModel = SCommerce.Website.Code.WebAPI.Models.Login.MemberDataViewModel;
	type ServiceResponseModel = SCommerce.Website.Code.WebServices.ServiceResponseModel;

	class SubscriptionController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public currentTranslation;
		public email: string;
		public settings: any;
		public showCancel: boolean;
		public isModalFlow: boolean = (this.isModalFlow || false);

		public withSettings: boolean = false;
		public hideEmailField: boolean = false;
		public UpdateSubscription: SubscriptionsExtended = {} as SubscriptionsExtended;
		public customer:MemberDataViewModel = {} as MemberDataViewModel;
		public isUpdatedByComponent: boolean = false;
		public isActivatedByComponent: boolean = false;

		public bConfirmationFailed: boolean = false;
		public errorOverrideMsg: string = '';

		public hasError: boolean = false;
		public fetching: boolean = false;
		public isUpdated: boolean = false;

		constructor(private translationsService: TranslationsService,
					private dialogService: DialogService,
					private createUserService: CreateUserService,
					private trackingService: TrackingModule.TrackingService,
					private userService: UserModule.UserService,
					private subscriptionsService: SubscriptionsModule.SubscriptionsService) {

			this.translations = translationsService.translations;

			if (this.currentTranslation !== translationsService.translations.Newsletter.NewsletterActivateState) {
				this.currentTranslation = translationsService.translations.Newsletter.NewsletterSubscribeState;
			}

			if (this.settings !== undefined) {
				this.currentTranslation = this.translationsService.translations.Newsletter.NewsletterEditState;
				this.hideEmailField = true;
				this.withSettings = true;
				this.UpdateSubscription.HasNewsletterSubscribtion = this.settings.HasNewsLetterSubscription;
				this.UpdateSubscription.HasMealPlanSubscribtion = this.settings.HasNewsLetterWithMealplansSubscription;
				this.UpdateSubscription.HasOffersSubscribtion = this.settings.HasNewsLetterWithOffersSubscription;
				this.UpdateSubscription.HasNewsBySMSSubscription = this.settings.HasNewsBySMSSubscription;
			} 
			else {
				this.hideEmailField = (this.email !== undefined && this.email.length > 0);
				this.UpdateSubscription.Email = this.email !== "" ? this.email : "";
				this.UpdateSubscription.HasNewsletterSubscribtion = true;
				this.UpdateSubscription.HasOffersSubscribtion = true;
				this.UpdateSubscription.HasMealPlanSubscribtion = false;
			}
		}

		$onInit() {

			this.initialize();

			// If logged in user's email is the same as the entered
			this.userService.getUser().then((user) => {
				if (user && user.Email === this.email) {
					if (this.currentTranslation === this.translationsService.translations.Newsletter.NewsletterSubscribeState) {
						this.currentTranslation = this.translationsService.translations.Newsletter.NewsletterEditState;
					}
				}
			});
		}

		public initialize = () => {

			// Only if neither email or user settings is supplied
			if (!this.settings && !this.email) {
				// Read url for guid and preferences
				let result = this.subscriptionsService.readUrl();
				if (result.valid) {
					// Pref from url
					if (result.pref[0] !== undefined) {
						this.UpdateSubscription.HasNewsletterSubscribtion = result.pref[0];
					}  
					if (result.pref[1] !== undefined) {
						this.UpdateSubscription.HasOffersSubscribtion = result.pref[1];
					}  
					if (result.pref[2] !== undefined) {
						this.UpdateSubscription.HasMealPlanSubscribtion = result.pref[2];
					} 
					// Get customer from guid
					this.fetching = true;
					this.subscriptionsService.getPotentialCustomerByActivationGuid(result.guid).then((customer) => {
						this.fetching = false;
						if (customer) {
							this.customer = customer;
							
							if (this.currentTranslation !== this.translationsService.translations.Newsletter.NewsletterActivateState) {
								this.currentTranslation = this.translationsService.translations.Newsletter.NewsletterEditState;
							}
							
							this.hideEmailField = true;
							this.UpdateSubscription.Email = customer.Email;

							if (result.prefString) {
								if (!customer.IsBlocked) {
									this.isUpdatedByComponent = false;
									this.bConfirmationFailed = false;
									this.errorOverrideMsg = '';
									this.hasError = false;
									this.subscriptionsService.activateSubscription(this.customer.ActivationId as string, result.prefString).then((response) => {
										this.isUpdatedByComponent = true;
										this.errorOverrideMsg = response.ErrorMessage;
										if (!this.customer.IsActivated) {
											this.isActivatedByComponent = true;
										}
									}).catch((response) => {
										this.bConfirmationFailed = true;
										this.hasError = true;
										if (response && response.ErrorMessage) {
											this.errorOverrideMsg = response.ErrorMessage;
										}
										// Update UpdateSubscription with customer values
										this.UpdateSubscription.HasNewsletterSubscribtion = customer.HasNewsLetterSubscription;
										this.UpdateSubscription.HasOffersSubscribtion = customer.HasNewsLetterWithOffersSubscription;
										this.UpdateSubscription.HasMealPlanSubscribtion = customer.HasNewsLetterWithMealplansSubscription;
									});
								}
							}
							else {
								// Update UpdateSubscription with customer values
								this.UpdateSubscription.HasNewsletterSubscribtion = customer.HasNewsLetterSubscription;
								this.UpdateSubscription.HasOffersSubscribtion = customer.HasNewsLetterWithOffersSubscription;
								this.UpdateSubscription.HasMealPlanSubscribtion = customer.HasNewsLetterWithMealplansSubscription;
							}
						}
					}).catch(() => {
						this.fetching = false;
					}); 
				}
			}
		};

		public showModal = (headline: string, msg: string) => {
			this.createUserService.showFeedback(headline, msg);
		};

		public cancel() {
			this.dialogService.closeDialog();
		}

		public update() {

			this.fetching = true;
			this.hasError = false;
			this.isUpdatedByComponent = false;

			if (this.customer && this.customer.ActivationId) {
				let prefString = this.subscriptionsService.constructPrefString(this.UpdateSubscription);
				this.subscriptionsService.activateSubscription(this.customer.ActivationId as string, prefString).then(() => {
					this.fetching = false;
					this.isUpdated = true;
					this.isUpdatedByComponent = true;
				}).catch(() => {
					this.fetching = false;
					this.hasError = true;
				});
			}
			else if (this.settings !== undefined) {
				this.subscriptionsService.updateSubscription(this.UpdateSubscription).then(() => {
					this.fetching = false;
					this.isUpdated = true;
				}).catch(() => {
					this.fetching = false;
					this.hasError = true;
				});
			} 
			else {
				this.subscriptionsService.subscribe(this.UpdateSubscription).then(() => {
					this.fetching = false;
					this.isUpdated = true;
					if (this.isModalFlow) {
						this.trackingService.trackCustomPageView('/tilmeld-nyhedsbrev/step2');
					}
				}).catch(() => {
					this.fetching = false;
					this.hasError = true;
				});
			}
		}

	}

	class SubscriptionComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				currentTranslation: '<',
				email: '<',
				settings: '<',
				showCancel: '<',
				isModalFlow: '<'
			};
			this.controller = SubscriptionController;
			this.template = HtmlTemplates.subscription.html;
		}
	}

	angular.module(moduleId).component("subscription", new SubscriptionComponent());
} 