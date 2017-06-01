declare module CheckoutInterfaces{
	type customerInformationAddressViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.AddressViewModel;
	type MergeOrderViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.MergeOrderViewModel;


	interface UserModel {
		DeliveryAddress: customerInformationAddressViewModel[];
		FormattedDeliveryTime: string;
		Email: string;
		MessageToDriver: string;
	}

	interface StateModel {
		InvoiceAddressIsDeliveryAddress: boolean;
		IsAuthorized: boolean;
		IsPending: boolean;
		PaymentMethod: string;
		SelectedPaymentCard: Object;
		ShowDeliverySection: boolean;
		ShowMessageToDriver: boolean;
		GotoCheckoutButtonHasBeenClicked:boolean;
		ShowPasswordForPayment: boolean;
		MinimumAgeForBasket:number;
		Agreements: Object;
	}

	interface FormDataModel {
		TermsAndConditionsAccepted?: boolean;
		TicketSubscriptionRequested?: boolean;
		ReturnOfBottlesRequested?: boolean;
		Email?: string;
		MemberType?: string;
		HasNewsLetterSubscription?: boolean;
		HasNewsBySMSSubscription?: boolean;
		AcceptMinimumAge?: boolean;
		InvoiceAddressIsDeliveryAddress?: boolean;
		EAN?: string;
		CVR?: string;
		RequisitionNumber?: string;
		Notes?: string;
		MemberInvoiceAddressData?: Object;
		MemberDeliveryAddressData?: Object;
		AcceptedGiroPayment?: boolean;
	}

	interface PrepareSubmitDataModel {
		FormName:string;
		FormData: Object;
		ExtraFormData?: Object;
	}

	interface IMergeOrderDataModel extends MergeOrderViewModel{
		useDeliveryTime?: boolean;
	}

	interface IAnonymousFormDataModel{

		DeliveryAddress: Object;
		Email?: string;
		InvoiceAddress: Object;
		InvoiceAddressIsDeliveryAddress: boolean;

		MemberType: string;
	}

	interface IMergeOrdersViewStatesModel{
		errors: Object;
	}

}

