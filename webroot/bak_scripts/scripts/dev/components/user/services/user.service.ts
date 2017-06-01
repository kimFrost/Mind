///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 02/08/16.
 */

namespace UserModule {

	type DialogService = DialogModule.DialogService;

	type MemberDataViewModel = SCommerce.Website.Code.WebAPI.Models.Login.MemberDataViewModel;
	export type MemberViewModel = SCommerce.Website.Code.WebAPI.Models.Login.MemberViewModel;

	export interface IRequestResetPasswordResponse {
		success: boolean;
		reponse: any;
	}

	export class UserService {

		public user: MemberViewModel = null;

		public states = { 
			isLoggedIn: false
		};

		constructor(private dialogService:DialogService,
					private $http:ng.IHttpService,
					private $q:ng.IQService,
					private $rootScope:ng.IRootScopeService,
					private xamarinService:XamarinModule.XamarinService,
					private translationsService: TranslationsModule.TranslationsService,
					private userDialogService: UserDialogService,
					private settingsService: PageModule.SettingsService,
					private $location: ng.ILocationService,
					private trackingService: TrackingModule.TrackingService,
					private $state
				) {

			this.isAuthenticated();

		}

		public getUser():ng.IPromise<any> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/GetCurrentUser";
			settings.method = "GET";

			this.$http(settings).then((response) => {

				var dataObj:any = response.data;

				this.settingsService.setUserId(dataObj.DebitorId);

				if (dataObj.Data === null) {
					this.user = null;
					defer.reject();
				} else {
					this.user = dataObj;
					defer.resolve(dataObj);
				}

			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject(error);
			});

			return defer.promise;
		}

		public getPotentialCustomerByActivationGuid(guid:string):ng.IPromise<MemberDataViewModel> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/Newsletter/GetSubscribtionByActivationGuid?activationGuid=" + guid;
			settings.method = "GET";

			this.$http(settings).then((response) => {
				defer.resolve(response.data);
			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject({} as MemberDataViewModel);
			});

			return defer.promise;
		}

		public SavePotentialCustomer(PotentialCustomerAdditionData:any):ng.IPromise<any> {
			let defer = this.$q.defer();

			return defer.promise;
		}

		public activateUser(activationId:string="", setPassword:boolean = false):ng.IPromise<any> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/ActivateUserById";
			settings.method = "POST";
			settings.data =  {
				ActivationId: activationId,
				SetPassword: setPassword
			};

			this.$http(settings).then((response) => {
				defer.resolve({
					IsActivated: response.data['IsActivated'],
					SetPassword: response.data['SetPassword'],
				});

			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject(error);
			});

			return defer.promise;
		}

		public login(username:string, password:string, autoLogin:boolean = false, checkForProducts:boolean = true, mergeBasket:boolean = true):ng.IPromise<boolean> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/login";
			settings.method = "POST";
			settings.data = {
				"Username": username,
				"Password": password,
				"AutoLogin": autoLogin,
				"CheckForExistingProducts": checkForProducts,
				"DoMerge": mergeBasket
			};

			this.$http(settings).then((response) => {

				var dataObj:any = response.data;
				
				if(dataObj.MergeSuccessful) {
					this.states.isLoggedIn = true;
					defer.resolve(true);
				} else {

					// Initiate merge basket dialog
					this.showMergeBasketDialog(username, password, autoLogin).then((response) => {
						defer.resolve(response);
					}).catch(() => {
						defer.resolve(false);
					}).finally(() => {
						defer.resolve(false);
					});

				}

				// This could be optimized so the /login api also returned the user
				this.getUser().then(_ => {
					this.trackingService.login(this.user);
				});


			}).catch((error) => {
				defer.reject(error);
			});

			return defer.promise;
		}

		public logout(redirect:boolean=false):ng.IPromise<any> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/logout";
			settings.method = "GET";

			this.$http(settings).then((response) => {

				this.settingsService.setUserId("");
				this.trackingService.login(null);
				this.user = null;

				this.xamarinService.logoutRequested();

				this.states.isLoggedIn = false;
				var dataObj: any = response.data;
				
				if (redirect) {
					if (this.$location.url() === dataObj.RedirectUrl) {
						this.$state.go(this.$state.current.name, this.$state.params, { location: false, reload: true });
					} else {
						this.$location.url(dataObj.RedirectUrl);
					}
				}

				defer.resolve(dataObj.RedirectUrl);

			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject();
			});

			return defer.promise;
		}

		public isAuthenticated():ng.IPromise<any> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/IsAuthenticated";
			settings.method = "GET";

			this.$http(settings).then((response) => {
				var dataObj:any = response.data;

				this.states.isLoggedIn = dataObj.Authenticated === true;

				defer.resolve(dataObj.Authenticated);
			}).catch((error) => {
				console.log("ERROR: ", error);
				defer.reject();
			});

			return defer.promise;
		}

		public validatePassword(password) {
			var re = /^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9\W]).*$/;
			return re.test(password);
		}

		public showMergeBasketDialog(username:string, password:string, autoLogin:boolean, redirect:boolean = false):ng.IPromise<boolean> {
			let defer = this.$q.defer();

			let dialogObj = {
				header: this.translationsService.translations.Basket.MergeDialog.Title,
				content: '<div>' + this.translationsService.translations.Basket.MergeDialog.Description + '</div>',
				close: false,
				size: 'small',
				buttons: {
					button1: {
						text: this.translationsService.translations.General.Responses.Yes,
						confirm: true,
						callback: true
					},
					button2: {
						text: this.translationsService.translations.General.Responses.No,
						confirm: false,
						callback: true
					}
				}
			} as DialogModule.IDialogSettings;

			this.dialogService.openDialog(dialogObj).then((index) => {
				// if index === 1 merge basket
				this.login(username, password, autoLogin, false, index === 1).then((response) => {
					defer.resolve(response);
				}).catch((response) => {
					defer.reject(response);
				});
				this.dialogService.closeDialog();
			});

			return defer.promise;
		}

		public requestPasswordChange(username:string):ng.IPromise<IRequestResetPasswordResponse> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = "/webapi/login/RequestPasswordChange?email=" + username;
			settings.method = "GET";
			settings.data = null;

			this.$http(settings).then((response) => {
				this.xamarinService.navigateToShopPage();
				var resolveData = {} as IRequestResetPasswordResponse;
				resolveData.success = true;
				resolveData.reponse = response;
				defer.resolve(resolveData);
			}).catch((error) => {
				console.log("ERROR: ", error);
				var resolveData = {} as IRequestResetPasswordResponse;
				resolveData.success = false;				
				resolveData.reponse = error;
				defer.resolve(resolveData);
			});

			return defer.promise;
		}

		public changePassword(oldPassword:string, newPassword:string, newPasswordConfirmed:string):ng.IPromise<Object> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = '/webapi/login/ChangePassword';
			settings.method = "POST";
			settings.data = {
				OldPassword: oldPassword,
				NewPassword: newPassword,
				NewPasswordConfirmed: newPasswordConfirmed
			};

			this.$http(settings).then((response) => {
				defer.resolve(response);
			}).catch((error) => {
				defer.reject(error);
			});

			return defer.promise;
		}

		public changePasswordByRequest(newPassword:string, newPasswordConfirmed:string, token:string):ng.IPromise<Object> {
			let defer = this.$q.defer();

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = '/webapi/login/ChangePasswordByRequest';
			settings.method = "POST";
			settings.data = {
				NewPassword: newPassword,
				NewPasswordConfirmed: newPasswordConfirmed,
				Token: token
			};

			this.$http(settings).then((response) => {
				defer.resolve(response);
			}).catch((error) => {
				defer.reject(error);
			});

			return defer.promise;
		}

	}

	angular.module(moduleId).service("userService", UserService);

}
