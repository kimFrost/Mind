/**
 * Created by MKI on 10/10/2016.
 */
declare module ChangeAddressInterfaces{

	interface IFormDataModel {
		CompanyName:string;
		StreetName:string;
		HouseNumber:string;
		Floor?:string;
		Side?:string;
		HouseNumberLetter?:string;
		Door?:string;
		PostalCode:string;
		PostalDistrict:string;
		MakeThisDefaultAddress?: boolean;
	}

	interface IStateModel {
		HideChangeDeliveryAddressFields: boolean;
		ShowErrorMessage: boolean;
		IsPending: boolean;
		ShowErrorMessageForUpdate: boolean;
	}

}
