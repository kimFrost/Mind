///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 05-08-2016.
 */
namespace CheckoutModule {

	import TranslationsService = TranslationsModule.TranslationsService;
	import UserService = UserModule.UserService;

	class MessageToDriverController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public message: string;
		private storedMessage: String = null;

		constructor(
			private translationsService: TranslationsService,
			private checkoutService: CheckoutService,
			private userService: UserService,
			private $q:ng.IQService
		) {
			this.translations = translationsService.translations;
		}


		//Toggle states to show text Area
		public toggleMessageBox(value) {

			let displayTextarea = !value;

			//if no data is initialized then get stored data from "My nemlig"
			if (!this.storedMessage) {
				this.getDefaultMessageToDriver().then((response:String)=>{
					this.setMessageToDriver(response);
					this.storedMessage = response;
				});
			}

			if(displayTextarea){

				if(this.storedMessage){
					this.setMessageToDriver(this.storedMessage);
				}
				else{
					this.setMessageToDriver('');
				}
			}else{
				this.setMessageToDriver('');
			}

			this.checkoutService.toggleStateShowMessageToDriver(value);
			
		}

		// Sets the message property
		private setMessageToDriver(value) {
			this.message = value;
		}

		// Get default message to driver from user on "My nemlig"
		private getDefaultMessageToDriver() {
			let defer = this.$q.defer();

			this.userService.getUser()
				.then((response)=>{
					defer.resolve(response.MessageToDriver);
				})
				.catch((err)=>{
					//TODO inform User that data cannot be loaded
					defer.resolve(err);
				});

			return defer.promise;
		}

	}

	class MessageToDriverComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = MessageToDriverController;
			this.template = HtmlTemplates.checkout.messageToDriver.template.html;
			this.bindings = {
				showTextArea: '=',
				showToggleButton: '<',
				message: '='
			};
		}
	}

	angular.module(moduleId).component("messageToDriver", new MessageToDriverComponent());
}
