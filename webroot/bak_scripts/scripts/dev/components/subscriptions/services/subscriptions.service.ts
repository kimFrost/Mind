/// <reference path="../../../../references/references.ts" />

namespace SubscriptionsModule {

	type UpdateSubscribtionRequestArg = SCommerce.Website.Code.WebAPI.Controllers.UpdateSubscribtionRequestArg;
	type UserService = UserModule.UserService;

	type MemberDataViewModel = SCommerce.Website.Code.WebAPI.Models.Login.MemberDataViewModel;
	type ServiceResponseModel = SCommerce.Website.Code.WebServices.ServiceResponseModel;

	export interface SubscriptionsExtended extends UpdateSubscribtionRequestArg {
		HasNewsBySMSSubscription: boolean;
	}

	export class SubscriptionsService {

		constructor(
			private $rootScope: ng.IRootScopeService,
			private $q: ng.IQService,
			private $http: ng.IHttpService,
			private $timeout: ng.ITimeoutService,
			private $location: ng.ILocationService,
			private userService:UserService) { }


		public readUrl = () => {
			let result = {
				valid: false,
				guid: this.$location.search().guid,
				pref: Array<boolean>(),
				prefString: ''
			};
			if (result.guid) {
				let pref = this.$location.search().p;
				let guidInt = parseInt(result.guid.replace(/-/g, ''));
				if (!isNaN(guidInt) && guidInt > 0) {
					result.valid = true;
				}
				else if (result.guid) {
					result.valid = true;
				}
				if (pref) {
					result.prefString = pref;
					let prefList = pref.split(',');
					for (let key in prefList) {
						if (prefList[key] === '0') { prefList[key] = false; }
						else { prefList[key] = true; }
					}
					result.pref = prefList;
					// Remove pref from url
					 this.$location.search('p', null);
				}
			}
			return result;
		};

		public activateSubscription = (guid:string, pref:string):ng.IPromise<ServiceResponseModel> => {
			let defer = this.$q.defer();
			if (guid) {
				var settings: ng.IRequestConfig = {} as ng.IRequestConfig;
				settings.url = "/webapi/Newsletter/ConfirmSubscribtion?guid=" + guid + '&p=' + pref;
				settings.method = "GET";
				this.$http(settings).then((response) => {
					defer.resolve(response.data as ServiceResponseModel);
				}).catch((error) => {
					console.log("ERROR: ", error);
					defer.reject(error.data as ServiceResponseModel);
				});
			}
			else {
				defer.reject({
					ErrorMessage: 'No guid found'
				} as ServiceResponseModel);
			}
			return defer.promise;
		};

		public constructPrefString = (pref:SubscriptionsExtended):string => {
			if (pref.HasNewsletterSubscribtion) {
				let prefString = '1';
				if (pref.HasOffersSubscribtion) {
					prefString += ',1';
				}
				else {
					prefString += ',0';
				}
				if (pref.HasMealPlanSubscribtion) {
					prefString += ',1';
				}
				else {
					prefString += ',0';
				}
				return prefString;
			}
			else {
				return '0,0,0';
			}
		};
		
		public getPotentialCustomerByActivationGuid = (guid:string):ng.IPromise<MemberDataViewModel> => {
			return this.userService.getPotentialCustomerByActivationGuid(guid);
		};


		public updateSubscription(subscription: SubscriptionsExtended): ng.IPromise<any> {
			let defer = this.$q.defer();

			let dataBody = {
				HasNewsLetterSubscription: subscription.HasNewsletterSubscribtion,
				HasNewsBySMSSubscription: subscription.HasNewsBySMSSubscription,
				HasNewsLetterWithOffersSubscription: subscription.HasOffersSubscribtion,
				HasNewsLetterWithMealplansSubscription: subscription.HasMealPlanSubscribtion
			};

			var settings: ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/Login/UpdateNewsletterSubscriptions";
			settings.method = "POST";
			settings.data = dataBody;

			this.$http(settings).then((response) => {
				defer.resolve();
			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject(error);
			});

			return defer.promise;
		}


		public subscribe(subscription: UpdateSubscribtionRequestArg): ng.IPromise<any> {
			let defer = this.$q.defer();

			var settings: ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/Newsletter/UpdateSubscribtion";
			settings.method = "POST";
			settings.data = subscription;

			this.$http(settings).then((response) => {
				defer.resolve();
			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject(error);
			});

			return defer.promise;
		}

		// Subscribe to Delivery Notification (if user has no delivery options)
		// ======================================
		public subscribeToDeliveryNotification(email: string, zipcode: string, deliveryNotification: boolean, newsletterSubscription: boolean, newsletterWeeklyOffersSubscription: boolean, newsletterCookingInspirationSubscription: boolean): ng.IPromise<any> {
			let defer = this.$q.defer();

			let dataBody = {
				Email: email,
				Zipcode: zipcode,
				SignUpForNotification: deliveryNotification,
				SignUpForNewsLetter: newsletterSubscription,
				NewsletterWeeklyOffersSubscription: newsletterWeeklyOffersSubscription,
				NewsletterCookingInspirationSubscription: newsletterCookingInspirationSubscription
			};

			this.$http({
				method: 'POST',
				url: '/webapi/Delivery/Newsletter/SubscribeToDeliveryNotification',
				data: dataBody
			}).then((response) => {
				var result = response.data;

				defer.resolve(result);
			}, (response) => {
				console.log("ERROR subscribeToDeliveryNotification: ", response);
				defer.reject();
			});

			return defer.promise;
		};


	}

	angular.module(moduleId).service("subscriptionsService", SubscriptionsService);
}