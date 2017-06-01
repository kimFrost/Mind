///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace UserModule {
	import ErrorCodes = SCommerce.Website.Code.WebAPI.Models.Error.ErrorCodes;

	export class LoginServiceStates {
		currentServerError: string = '';
		fetching: boolean = false;
		resetError: boolean = false;
		loginError: boolean = false;
		loginErrorType: string = '';
		authorizeError: boolean = false;
		resetSuccess: boolean = false;
		showinput: boolean = true;

		constructor() { }
	}

	export class LoginService {

		private states = {} as UserModuleInterfaces.ILoginServiceStatesModel;
		private activateUserAccount = {} as UserModuleInterfaces.IActivateUserAccountModel;

		constructor(
			private generalUtilService: UtilsModule.GeneralUtilService,
			private testConditionService: UtilsModule.TestConditionService,
			private userService: UserService,
			private $location: ng.ILocationService,
			private contentService: PageModule.ContentService,
			private settingsService: PageModule.SettingsService) {
			this.states = new LoginServiceStates();
		}

		/**
		 * @author MKI
		 * @param value
		 * @private
		 */
		private _setStateFetching(value: boolean = false): void {
			this.states.fetching = value;
		}

		/**
		 * @author MKI
		 * @param value
		 * @private
		 */
		private _setStateLoginError(value: boolean = false): void {
			this.states.loginError = value;
		}

		/**
		 * @author MKI
		 * @param message
		 * @private
		 */
		private _setStateCurrentServerError(message: string = ''): void {
			this.states.currentServerError = message;
		}

		/**
		 * @author MKI
		 * @param value
		 * @private
		 */
		private _setStateAuthorizeError(value: boolean = false): void {
			this.states.authorizeError = value;
		}

		/**
		 * @author MKI
		 * @description Set state for loginErrorType
		 * @param value
		 * @private
		 */
		private _setStateLoginErrorType(value: string = ''): void {
			this.states.loginErrorType = value;
		}

		/**
		 * @author MKI
		 * @description setting State to show error and set the error message
		 * @param message
		 * @private
		 */
		private _showErrorMessage(message: string = ''): void {
			this._setStateCurrentServerError(message);
			this._setStateLoginError(true);
		}

		/**
		 * @author MKI
		 * @description Setting properties message & activationId on activateUserAccount
		 * @param message
		 * @param activationId
		 * @private
		 */
		private _setUserNotActivatedData(message: string = '', activationId: string = ''): void {
			angular.extend(this.activateUserAccount, { message, activationId });
		}


		/**
		 * @author MKI
		 * @description Handle the server responds if the user can´t login
		 * @param error
		 * @private
		 */
		private _handleLoginError(error) {

			let errorMessage = error.ErrorMessage;
			let errorCode = error.ErrorCode;

			switch (errorCode) {
				case ErrorCodes.MissingArguement:
					this._setStateLoginErrorType('MissingArguement');
					this._showErrorMessage(errorMessage);
					break;
				case ErrorCodes.UnauthorizedAccess:
					this._setStateLoginErrorType('UnauthorizedAccess');
					this._showErrorMessage(errorMessage);
					break;
				case ErrorCodes.UserNotActivated:
					this._setStateLoginErrorType('UserNotActivated');
					this._setUserNotActivatedData(errorMessage, error.Data);
					break;
				default:
					this._setStateLoginErrorType('Unknown');
					this._showErrorMessage(errorMessage);
					break;
			}
		}

		/**
		 * @author MKI
		 * @description Resetting login error states and messages
		 * @private
		 */
		private _resetErrorMessages(): void {
			this._setStateLoginError(false);
			this._setStateLoginErrorType('');
			this._setStateAuthorizeError(false);
			this._setStateCurrentServerError('');
		}


		/**
		 * @author MKI
		 * @description Login failed
		 * @param err
		 * @private
		 */
		private _loginUserFailed = (err) => {

			let hasLoginErrors = this._isStatusFourHundred(err.status);
			let errorData = err.data;

			if (hasLoginErrors) {
				this._handleLoginError(errorData);
			}
		};

		/**
		 * @author MKI
		 * @description Login successfully
		 * @param isLoggedIn
		 * @private
		 */
		private _loginSuccessful = (isLoggedIn) => {
			if (isLoggedIn) {
				const returnUrl = this.$location.search().returnUrl;

				if (returnUrl) {
					this.$location.url(returnUrl);
				} else if (this.contentService.stateObj.initialPageLoad
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.ActivateUserPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.ResetPasswordPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.CreateUserPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.OrderConfirmationUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.MyNemligOrderHistoryPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.MyNemligPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.MyNemligPrintFriendlyPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.LoginPageUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.NotFoundUrl
						|| this.contentService.stateObj.fromUrl === this.settingsService.settings.ResetPasswordPageUrl) {
					this.generalUtilService.goToFrontPage();
				} else {
					this.generalUtilService.goBack();
				}
			} else {
				this._setStateLoginError(true);
			}
		};

		/**
		 * @author MKI
		 * @description Check is the statusCode correspond to status code 400
		 * @param statusCode:number
		 * @returns boolean
		 * @private
		 */
		private _isStatusFourHundred(statusCode: number = 0) {
			const VALIDATION_STATUS = 400;
			return this.testConditionService.test.numbers.isNumberEqual(statusCode, VALIDATION_STATUS);
		}


		/**
		 * @author MKI
		 * @description Return the state Object
		 * @returns {UserModuleInterfaces.ILoginServiceStatesModel}
		 */
		public getStates() {
			return this.states;
		}


		/**
		 * @author MKI
		 * @description Return a object that holds information text and Guid for <resend-activation-mail> component
		 * @returns {{}}
		 */
		public getActivateUserAccount() {
			return this.activateUserAccount;
		}


		/**
		 * @author MKI
		 * @description Login the user if user has correct credentials
		 * @param userLoginInformation
		 * @param redirectUser
		 */
		public login(userLoginInformation): void {

			let {Username, Password, AutoLogin} = userLoginInformation;

			this._setStateFetching(true);
			this._resetErrorMessages();

			this.userService.login(Username, Password, AutoLogin)
				.then(this._loginSuccessful)
				.catch(this._loginUserFailed)
				.finally(() => {
					this._setStateFetching(false);
				});

		}
	}

	angular.module(moduleId).service("loginService", LoginService);
}
