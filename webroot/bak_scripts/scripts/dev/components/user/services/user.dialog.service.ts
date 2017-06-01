/**
 * Created by mikkel on 01/12/16.
 */

namespace UserModule {


	export class UserDialogService {


		constructor(private dialogService:DialogModule.DialogService,
					private translationsService: TranslationsModule.TranslationsService
					) {


		}


		public showZipCodeIsOverwritten() {

			// Dialog settings
			const loginDialogSettings = {
				header: this.translationsService.translations.Authentication.Login.AnonymousSessionZipcodeOverwrittenDialogHeader,
				content: `<div> ${this.translationsService.translations.Authentication.Login.AnonymousSessionZipcodeOverwrittenDialogText} </div>`,
				close: false,
				size: 'medium',
				buttons: {
					button1: {
						text: this.translationsService.translations.Authentication.Login.AnonymousSessionZipcodeOverwrittenDialogButtonText,
						confirm: false,
						callback: false
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(loginDialogSettings);

		}

	}

	angular.module(moduleId).service("userDialogService", UserDialogService);

}
