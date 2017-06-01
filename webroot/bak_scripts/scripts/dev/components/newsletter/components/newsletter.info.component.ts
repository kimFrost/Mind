///<reference path="../../../../references/references.ts"/>

namespace NewsletterModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	const WEB_API_PATH = '/webapi/checkout/';

	class NewsletterInfoController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public model: boolean;

		constructor(
			private $q:ng.IQService,
			private $http:ng.IHttpService,
			private dialogService: DialogModule.DialogService,
			private translationsService: TranslationsService) {
			this.translations = translationsService.translations;
		}


		private _getReturnOfBottlesInfo(){
			let defer = this.$q.defer();

			this.$http({
					method: 'GET',
					url: WEB_API_PATH + 'GetGeneralSubscriptionInfo'} // GetSubscriptionSMSInfo
					).then((response)=> {
				defer.resolve(response.data);
			}, (error) => {
				console.log("ERROR: ", error);
				defer.reject('Could Not load Terms of agreements');
			});
			return defer.promise;
		}

		private openDialogWithContent(content) {

			let defaultDialogSettings = {
				header: this.translations.CreateUser.CreateUserHasNewsLetterSubscription.ModalHeader,
				content: `<div> ${content} </div>`,
				close: true,
				size: 'medium',
				buttons: {
					button1: null
				}
			};

			this.dialogService.openDialog(defaultDialogSettings).then((response)=>{

			});
		}

		public showNewsletterInfo() {
			this._getReturnOfBottlesInfo().then((response)=>{
				this.openDialogWithContent(response);
			}).catch((errorMessage)=>{
				console.log(errorMessage);
			});
		}
	}

	class NewsletterInfoComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = NewsletterInfoController;
			this.template = HtmlTemplates.newsletter.info.template.html;
			this.bindings = {
				model: '='
			};
		}
	}

	angular.module(moduleId).component("newsletterInfo", new NewsletterInfoComponent());
}
