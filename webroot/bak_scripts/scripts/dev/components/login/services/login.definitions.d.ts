/**
 * Created by MKI on 10/10/2016.
 */
declare module UserModuleInterfaces{

	interface ILoginModel {
		Username:string;
		Password:string;
		AutoLogin:boolean;
		CheckForExistingProducts:boolean;
		DoMerge:boolean;
	}

	interface ILoginServiceStatesModel {
		currentServerError:string;
		fetching:boolean;
		resetError:boolean;
		loginError:boolean;
		loginErrorType:string;
		authorizeError:boolean;
		resetSuccess:boolean;
		showinput:boolean;
	}

	interface ILoginFormModel {
		remember:boolean;
		userPassword:string;
		userEmail:string;
	}

	interface IActivateUserAccountModel {
		message:string;
	}






}
