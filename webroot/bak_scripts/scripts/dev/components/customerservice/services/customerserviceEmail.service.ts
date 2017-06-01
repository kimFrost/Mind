///<reference path="../../../../references/references.ts"/>



namespace CustomerserviceModule {


	export class CustomerserviceEmailService {
		constructor(private $http: ng.IHttpService,
					private settingsService: PageModule.SettingsService,
					private translationsService: TranslationsModule.TranslationsService) { }

		getOrders() {
			return this.$http({
				method: 'GET',
				url: '/webapi/Order/GetBasicOrderHistory?skip=0&take=5'
			}).then(res=>(res.data as any[]));
		}

		getReasons() {
			const reasons = this.settingsService.settings.SalesforceSettings.QuestionTypes;
			reasons.unshift({ Type: this.translationsService.translations.Customerservice.Email.ChooseReason });
			return reasons;
		}

		private stringifyObjectToContent(data) {
			return Object.keys(data).reduce((acc,key) => {
				return acc+key+': '+data[key]+'\n';
			},'');
		}

		send(data) {
			return this.$http({
				method: 'POST',
				url: '/webapi/chat/SendMailToCustomerSupport',
				data: {
					FromAddress: data.FromAddress || 'noreply@nemlig.com',
					Subject: this.translationsService.translations.Customerservice.Email.Subject,
					Content: this.stringifyObjectToContent(data)
				}
			});
		}

	}

	angular.module(moduleId).service('customerserviceEmailService', CustomerserviceEmailService);
}
