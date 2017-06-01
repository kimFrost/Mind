///<reference path="../../../../references/references.ts"/>

namespace UserModule {

	type IRequestResetPasswordResponse = UserModule.IRequestResetPasswordResponse; 

	type Translations = SCommerce.Core.Dictionary.Translations;
	type DialogService = DialogModule.DialogService;

	class LoginController {

		// Bindings
		public allowCreate:boolean;
		public passwordMode: boolean;
		public anonymousSessionZipcode: string = '';

		// Variables
		public translations:Translations = {} as Translations;
		public resetPasswordMode:boolean = false;
		public currentServerError:string = '';
		public emailRegexPattern:any;

		public formData = {} as UserModuleInterfaces.ILoginFormModel;
		public states;
		public activateUserAccount;

		public userServiceStates: any;

		private loginUsernameField;
		private loginPasswordField;

		constructor(private $element,
					private $timeout: ng.ITimeoutService,
					private userService: UserService,
					private loginService: LoginService,
					private timeslotService: TimeslotModule.TimeslotService,
					private regexApiService: UtilsModule.RegexApiService,
					public translationsService:TranslationsModule.TranslationsService,
					public settingsService:PageModule.SettingsService) {

			this.translations = translationsService.translations;
			this.userServiceStates = userService.states;
			this.emailRegexPattern = regexApiService.API().email;

			this.states = this.loginService.getStates();
			this.activateUserAccount = this.loginService.getActivateUserAccount();


			// Find and map DOM elements
			this.loginUsernameField = this.$element[0].getElementsByClassName('login-username-field')[0];
			this.loginPasswordField = this.$element[0].getElementsByClassName('login-password-field')[0];
		}

		$onInit() {

			// Check if any of the login fields are empty, and set focus in them.
			// If user login info has been remembered, user can hit enter to login, without interaction with the mouse
			this.$timeout(() => {

				if (this.loginUsernameField.value !== '') {
					this.loginPasswordFieldFocus();
				} else {
					this.loginUsernameFieldFocus();
				}
				
			});
			

			this._passwordModeEnabled(this.passwordMode);
		}

		/**
		 * @author MKI
		 * @description Turn on reset password mode
		 * @param passwordMode
		 * @private
		 */
		private _passwordModeEnabled(passwordMode:boolean = true):void {
			if(passwordMode) {
				this.resetPasswordMode = true;
			}
		}



		public logout = () => {
			if (this.userServiceStates.isLoggedIn) {
				this.states.fetching = true;
				this.userService.logout().then( () => {
					this.states.fetching = false;
				});
			}
		};


		/**
		 * @author TTH
		 * @description Handle logic before login
		 * @param email
		 * @param password
		 * @param remember
		 */
		public loginSubmit(email:string, password:string, remember:boolean) {

			// Determine if anonymous session has a valid zipcode
			if (this.timeslotService.deliveryZone.PostalCode !== 0) {
				this.anonymousSessionZipcode = this.timeslotService.deliveryZone.PostalCode.toString();
			}

			this.loginUser(email, password, remember);
		}

		/**
		 * @author TTH/MKI
		 * @param email:string
		 * @param password:string
		 * @param remember:boolean
		 */
		public loginUser(email:string, password:string, remember:boolean = false) {
			this.states.resetError = false;
			this.states.resetSuccess = false;
			// Reset login errors

			let loginUserData = {
				Username:email,
				Password:password,
				AutoLogin:remember
			};

			this.loginService.login(loginUserData);
		}


		public resetSubmit(username:string) {
			// Reset login errors
			this.states.loginError = false;
			this.states.authorizeError = false;
			// Reset reset errors			
			this.states.fetching = true;
			this.states.resetError = false;
			this.states.resetSuccess = false;

			this.userService.requestPasswordChange(username).then((response:IRequestResetPasswordResponse) => {
				this.states.fetching = false;
				if (response.success) {
					this.states.resetError = false;
					this.states.resetSuccess = true;
					this.states.showinput = false;
				} else {
					this.states.resetError = true;
					this.currentServerError = response.reponse.data.ErrorMessage;
				}
			});
		}

		private loginUsernameFieldFocus () {
			this.loginUsernameField.focus();
		}

		private loginPasswordFieldFocus () {
			this.loginPasswordField.focus();
			this.loginPasswordField.select();
			this.loginPasswordField.setSelectionRange(0, 50);
		}

	}

	class LoginComponent implements ng.IComponentOptions {
		public controller:any;
		public template:any;
		public transclude:any;
		public bindings:any;

		constructor() {
			this.controller = LoginController;
			this.transclude = true;
			this.template = HtmlTemplates.login.html;
			this.bindings = {
				allowCreate: "<",
				passwordMode:"<"
			};
		}

	}

	angular.module(moduleId).component("login", new LoginComponent());
}
