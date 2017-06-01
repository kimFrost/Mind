///<reference path="../../../../references/references.ts"/>

namespace CustomerserviceModule {
	class CustomerserviceEmailController {

		private success = false;

		private reasons: any[] = [];
		private orders: any[] = [];

		private isLoggedIn = false;

		private email: any = {};

		public translations;
		public emailRegexPattern;

		constructor(
			private customerserviceEmailService: CustomerserviceEmailService,
			private userService: UserModule.UserService,
			private translationsService: TranslationsModule.TranslationsService,
			private regexApiService: UtilsModule.RegexApiService,
			private validateFormService: UtilsModule.ValidateFormService,
			$scope: ng.IScope
		) { 
			this.translations = translationsService.translations;
			this.emailRegexPattern = regexApiService.API().email;

			$scope.$watch(() => {
				return this.userService.states.isLoggedIn;
			}, (val) => {
				this.isLoggedIn = val;

				if (this.isLoggedIn) {
					this.reasons = this.customerserviceEmailService.getReasons();
					this.email.reason = this.reasons[0].Type;
					this.customerserviceEmailService.getOrders().then(data => {
						this.orders = data;
					});
					this.userService.getUser().then(res => {
						this.email.FromAddress = res.Email;
					});
				}
			});
		}

		send(form) {
			if (this.validateFormService.validateForm(form, false)) {
				this.customerserviceEmailService.send(this.email).then(() => {
					this.success = true;
				});
			}
		}
	}

	class CustomerserviceEmailComponent implements ng.IComponentOptions {
		public controller: any;
		public template: string;

		constructor() {
			this.controller = CustomerserviceEmailController;
			this.template = HtmlTemplates.customerserviceemail.html;
		}
	}

	angular.module(moduleId).component('customerserviceEmail', new CustomerserviceEmailComponent());
}
