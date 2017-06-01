///<reference path="../../../../references/references.ts"/>
///<reference path="../../user/services/user.service.ts"/>

/**
 * Created by MKI on 04/11/2016.
 */

namespace CheckZipCodeOrLoginModule {

	import TranslationsService = TranslationsModule.TranslationsService;

	type DialogService = DialogModule.DialogService;
	type CheckoutService = CheckoutModule.CheckoutService;
	type TimeslotService = TimeslotModule.TimeslotService;
	type ValidateFormService = UtilsModule.ValidateFormService;
	type UserService = UserModule.UserService;

	export class CheckZipCodeOrLoginStates {
		Pending: boolean = false;
		Errors = {
			Show: false,
			Message: ''
		};
		constructor(){}
	}


	export class CheckZipCodeOrLoginService {

		private translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		private states: CheckZipCodeOrLoginInterfaces.IStateModel;

		constructor(
			private $log: ng.ILogService,
			private checkoutService: CheckoutService,
			private dialogService: DialogService,
			private timeslotService: TimeslotService,
			private translationsService: TranslationsService,
			private userService: UserService,
			private validateFormService: ValidateFormService){

				this.translations = translationsService.translations;
				this.states = new CheckZipCodeOrLoginStates() as CheckZipCodeOrLoginInterfaces.IStateModel;
		}


		/**
		 * @author MKI
		 * @description Setting the Pending property on the states Object
		 * @param value
		 * @private
		 */
		private _setStatePending(value:boolean = false): void {
			this.states.Pending = value;
		}

		private _setStateShowErrorMessage(showMessage:boolean = false, message: string = ''): void {
			this.states.Errors.Show = showMessage;
			this.states.Errors.Message = message;
		}


		/**
		 * @author MKI
		 * @description Close all open dialogs
		 * @private
		 */
		private _closeDialog():void {
			this.dialogService.closeDialog();
		}


		/**
		 * @author MKI
		 * @description Stops the spinner by setting the pending state
		 * @private
		 */
		private _startSpinner(){
			this._setStatePending(true);
		}

		/**
		 * @author MKI
		 * @description Stops the spinner by setting the pending state
		 * @private
		 */
		private _stopSpinner() {
			this._setStatePending(false);
		}

		/**
		 * @author MKI
		 * @description When adding post code fails. Its logged out in the console.
		 * TODO what shall we do here. 500/ 400? are handled by Http Interceptor
		 * @param err
		 * @private
		 */
		private _failedAddedPostCode = (err) => {
			this.$log.error(err);
		};


		/**
		 * @author MKI
		 * @description Sends zipCode to time slot service that checks for valid delivery zones
		 * @param zipCode
		 */
		public checkZipCodeForDelivery(zipCode:number):void{

			this._startSpinner();

			this.timeslotService.addPostCode(zipCode, true, true)
				.then(() => {})
				.catch(this._failedAddedPostCode)
				.finally(() => {
					this._stopSpinner();
				});
		}

		/**
		 * @author MKI
		 * @description returns states to Components or services
		 * @returns {CheckZipCodeOrLoginInterfaces.StateModel}
		 */
		public getStates() {
			return this.states;
		}


		/**
		 * @author MKI
		 * @description Validates the form and return condition if the form validates
		 * @param form
		 * @returns {boolean}
		 */
		public isFormValid(form:ng.IFormController):boolean {
			return this.validateFormService.validateForm(form);
		}


		/////// LOGIN //////
		//TODO login shall be in own component

		/**
		 * @author MKI
		 * @description Login user with supplied login information
		 * @param loginInformation
		 */
		public loginUser(loginInformation:CheckZipCodeOrLoginInterfaces.LoginUserModel): void {

			this._setStateShowErrorMessage(false);
			let {username, password, autoLogin } = loginInformation;

			this.userService.login(username, password, autoLogin, false)
				.then(this._loginResponseSuccess)
				.catch(this._loginResponseFailed);
		}

		/**
		 * @author MKI
		 * @default Clearing states for CheckZipCodeOrLogin
		 */
		public clearStates(): void {
			angular.merge(this.states, new CheckZipCodeOrLoginStates());
		}


		/**
		 * @author MKI
		 * @description Open dialog with forgot password Component
		 */
		public forgotPassword():void {
			this._closeDialog();
			
			const settings = {
				header:  this.translations.Authentication.ResetPassword.Title,
				content: `<forgot-password></forgot-password>`,
				close: true,
				size: 'small'
			};

			this.dialogService.openDialog(settings);
		}

		/**
		 * @author MKI
		 * @description If loggedIn then do _loginSuccessFull else _loginFailed with error message
		 * @param isLoggedIn
		 * @private
		 */
		private _loginResponseSuccess = (isLoggedIn:boolean = false) => {

			if(isLoggedIn){
				this._loginSuccessFull();
			}else{
				let errorMessage = this.translations.Authentication.Login.ErrorUserNotAuthorized;
				this._loginFailed(errorMessage);
			}
		};


		/**
		 * @author MKI
		 * @description If user is Logged in then close the dialog and show delivery information
		 * @private
		 */
		private _loginSuccessFull() {
			this._closeDialog();
			this.checkoutService.showDeliveryInformation(true);
		}


		/**
		 * @author MKI
		 * @description rejected Response from userService.login
		 * TODO ISSUE http intercepted takes over 401
		 * @param err
		 * @private
		 */
		private _loginResponseFailed = err => {

			if(!err.status){return;}

			const isUnauthorized = CheckZipCodeOrLoginService._isStatusUnauthorized(err.status);
			const userLoginFailed = CheckZipCodeOrLoginService._isStatusBadRequest(err.status);

			if(isUnauthorized || userLoginFailed){
				this._loginFailed(err.data.ErrorMessage);
			}
		};


		/**
		 * @author MKI
		 * @description Show error message to user
		 * @param errorMessage
		 * @private
		 */
		private _loginFailed(errorMessage): void {
			this._logoutErrorMessage(errorMessage);
			this._setStateShowErrorMessage(true, errorMessage);
		}


		/**
		 * @author MKI
		 * @description Log message
		 * @param message
		 * @private
		 */
		private _logoutErrorMessage(message: string = ''): void {
			this.$log.log(message);
		}


		/**
		 * @author MKI
		 * @description Check if input match Unauthorized StatusCode 401
		 * @param statusCode
		 * @returns {boolean}
		 * @private
		 */
		static _isStatusUnauthorized(statusCode: number): boolean {
			let unAuthorizedStatusCode = 401;
			return statusCode === unAuthorizedStatusCode ? true : false;
		}

		/**
		 * @author MKI
		 * @description Check if input match Bad Request StatusCode 400
		 * @param statusCode
		 * @returns {boolean}
		 * @private
		 */
		static _isStatusBadRequest(statusCode:number):boolean {
			let badRequestStatusCode = 400;
			return statusCode === badRequestStatusCode ? true : false;
		}

	}

	angular.module(moduleId).service("checkZipCodeOrLoginService", CheckZipCodeOrLoginService);
}
