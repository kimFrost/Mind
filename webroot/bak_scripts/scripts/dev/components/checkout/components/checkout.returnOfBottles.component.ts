///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 05-08-2016.
 */
namespace CheckoutModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	export class DialogSettings {
		header: string = '';
		content: string = '';
		close: boolean = true;
		size: string = 'medium';
		buttons = {};

		constructor(Header, Content) {
			this.header = Header;
			this.content = Content;
		}
	}


	class ReturnOfBottlesController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public model: boolean;

		constructor(
			private $log:ng.ILogService,
			private dialogService: DialogModule.DialogService,
			private returnOfBottlesHttpService: ReturnOfBottlesHttpService,
			private translationsService: TranslationsService) {
				this.translations = translationsService.translations;
		}


		/**
		 * @author MKI
		 * @description Get return of bottles Information and opens a dialog box
		 * @param showButtons
		 * @private
		 */
		private _getReturnOfBottlesInfo(showButtons?: boolean): void {

			this.returnOfBottlesHttpService.getReturnOfBottlesInformation()
				.then((bottleInformation) => {
					this._prepareAndShowModal(bottleInformation, showButtons);
				})
				.catch(errorMessage => {
					this._prepareAndShowModal(errorMessage, false);
				});
		}

		/**
		 * @author MKI
		 * @description Building a settings Object for Return of bottles with content.
		 * @param content
		 * @returns {CheckoutModule.DialogSettings}
		 * @private
		 */
		private _buildModalSettingsAndContent(content: string = ''){
			const DIALOG_HEADER = this.translations.Checkout.ReturnBottles.ReturnBottlesDialogHeadLine;
			return new DialogSettings(DIALOG_HEADER, content);
		}


		/**
		 * @author MKI
		 * @description Creates a settings Object and opens a dialog with provided settings
		 * @param content
		 * @param showButtons
		 * @private
		 */
		private _prepareAndShowModal(content, showButtons: boolean = false): void {

			let dialogSettings = this._buildModalSettingsAndContent(content);

			if(showButtons){

				const buttons = {
					button1: {
						text: this.translations.Checkout.ReturnBottles.ReturnBottlesDialogCloseButtonText,
						confirm: false,
						callback: false
					},
					button2: {
						text: this.translations.Checkout.ReturnBottles.ReturnBottlesDialogAcceptButtonText,
						confirm: true,
						callback: true
					}
				};

				angular.extend(dialogSettings.buttons, buttons);
			}

			this._openDialog(dialogSettings);
		}

		/**
		 * @author MKI
		 * @description Opens dialog modal with provided settings
		 * @param settings
		 * @private
		 */
		private _openDialog(settings): void {
			this.dialogService.openDialog(settings).then((response) => {
				const ACCEPT_BUTTON = 2;
				let isAcceptingTerms = (ACCEPT_BUTTON === response);

				if (isAcceptingTerms) {
					this.model = true;
					this.dialogService.closeDialog();
				}
			});
		}


		/**
		 * @author MKI
		 * @description Show dialog with return of bottles information
		 */
		public showReturnOfBottlesInformation(): void {
			this._getReturnOfBottlesInfo(true);
		}

		/**
		 * @author MKI
		 * @description User changes value in checkbox and dialog opens if checkbox is true
		 * @param yesReturnBottles
		 */
		public acceptReturnOfBottles(yesReturnBottles): void {
			if(yesReturnBottles){
				this._getReturnOfBottlesInfo(false);
			}
		}
	}

	class ReturnOfBottlesComponent implements ng.IComponentOptions {
		public controller: any;
		public bindings: any;
		public template: string;

		constructor() {
			this.controller = ReturnOfBottlesController;
			this.template = HtmlTemplates.checkout.returnOfBottles.template.html;
			this.bindings = {
				model: '='
			};
		}
	}

	angular.module(moduleId).component("returnOfBottles", new ReturnOfBottlesComponent());
}
