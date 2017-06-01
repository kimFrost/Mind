declare module CheckZipCodeOrLoginInterfaces{

	interface LookupZipCodeModel {
		Pending: boolean;
	}

	interface LoginModel {
		Pending: boolean;
	}

	interface IStateModelErrors {
		Show: boolean;
		Message: string;
	}

	interface IStateModel {
		Pending: boolean;
		Errors: any;
	}

	interface LoginUserModel {
		username: string;
		password: string;
		autoLogin?: boolean;
	}
}

