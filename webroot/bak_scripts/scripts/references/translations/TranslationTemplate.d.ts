







declare module SCommerce.Core.Dictionary {

	interface Translations {
		SalesForceApi: SalesForceApi;
		ActivateUser: ActivateUser;
		ChangeAddress: ChangeAddress;
		EditUser: EditUser;
		CreditCardFee: CreditCardFee;
		Payment: Payment;
		Customerservice: Customerservice;
		PaymentCards: PaymentCards;
		CreateUser: CreateUser;
		Form: Form;
		Coupon: Coupon;
		Newsletter: Newsletter;
		Spots: Spots;
		JobOfferings: JobOfferings;
		MyNemlig: MyNemlig;
		Checkout: Checkout;
		Authentication: Authentication;
		Errors: Errors;
		ServerErrorMessages: ServerErrorMessages;
		Timeslot: Timeslot;
		Recipe: Recipe;
		Minibasket: Minibasket;
		ProductDetail: ProductDetail;
		Productlist: Productlist;
		CampaignSplashes: CampaignSplashes;
		Filter: Filter;
		Header: Header;
		General: General;
		Validation: Validation;
		Navigation: Navigation;
		Search: Search;
		Modals: Modals;
		Basket: Basket;
		Footer: Footer;
	}

	interface SalesForceApi {
		OrderHistory: OrderHistory;
		OrderHistoryProductDifference: OrderHistoryProductDifference;
		OrderHistoryStatus: OrderHistoryStatus;
	}

	interface OrderHistory {
	}

	interface OrderHistoryProductDifference {
		InvoiceReducedProduct: string;
		InvoiceReplacedProduct: string;
		InvoiceSoldOutProduct: string;
	}

	interface OrderHistoryStatus {
		StatusOrdered: string;
		StatusProcessing: string;
		StatusProcessed: string;
		StatusIsCreditNote: string;
	}

	interface ActivateUser {
		ActivateUserGeneral: ActivateUserGeneral;
		ActivateUserSubmit: ActivateUserSubmit;
		ActivateUserIsActivated: ActivateUserIsActivated;
	}

	interface ActivateUserGeneral {
		MainHeadline: string;
		InvoiceHeadline: string;
		DeliveryHeadline: string;
		HeaderHtml: string;
		SuccessMsg: string;
	}

	interface ActivateUserSubmit {
		Valid: string;
		InValid: string;
	}

	interface ActivateUserIsActivated {
		Headline: string;
		Text: string;
		LinkText: string;
	}

	interface ChangeAddress {
		ChangeAddressGeneral: ChangeAddressGeneral;
		ChangeAddressButtons: ChangeAddressButtons;
		DeliveryInformation: DeliveryInformation;
		AddressLocation: AddressLocation;
	}

	interface ChangeAddressGeneral {
		ChangeAddressNotificationText: string;
	}

	interface ChangeAddressButtons {
		ChangeAddressNotificationText: string;
	}

	interface DeliveryInformation {
		Name: string;
		NamePlaceHolder: string;
		StreetName: string;
		StreetNamePlaceholder: string;
		HouseNumber: string;
		HouseNumberPlaceholder: string;
		CityName: string;
		CityNamePlaceholder: string;
		PostalCode: string;
		PostalCodePlaceholder: string;
	}

	interface AddressLocation {
		Floors: string;
		Letters: string;
		Sides: string;
	}

	interface EditUser {
		EditUserGeneral: EditUserGeneral;
		EditUserChangePassword: EditUserChangePassword;
		EditUserSubmit: EditUserSubmit;
	}

	interface EditUserGeneral {
		MainHeadline: string;
		InvoiceHeadline: string;
		CustomerInfo: string;
		DeliveryHeadline: string;
		HeaderHtml: string;
		SuccessMsg: string;
	}

	interface EditUserChangePassword {
		Label: string;
		LabelLink: string;
	}

	interface EditUserSubmit {
		Valid: string;
	}

	interface CreditCardFee {
		CreditCardFeeGeneral: CreditCardFeeGeneral;
	}

	interface CreditCardFeeGeneral {
		ChooseCreditCardPlaceholder: string;
		CreditCardFeeTitle: string;
	}

	interface Payment {
		ModalOrderSummary: ModalOrderSummary;
		PaymentMethods: PaymentMethods;
		CreditcardTypes: CreditcardTypes;
	}

	interface ModalOrderSummary {
		Summary: string;
		OrderNumber: string;
		Items: string;
		ItemsUnit: string;
		Deposit: string;
		DepositUnit: string;
		Bags: string;
		BagsUnit: string;
		Delivery: string;
		Savings: string;
		NemligAccount: string;
		CreditcardFee: string;
		Total: string;
	}

	interface PaymentMethods {
		PaymentCard: string;
		Giro: string;
		ElectronicInvoice: string;
		DeliveryService: string;
		PayEx: string;
		GiroOneTime: string;
	}

	interface CreditcardTypes {
		Dk: string;
		VisaDk: string;
		VisaSe: string;
		Visa: string;
		McDk: string;
		McSe: string;
		Mc: string;
		DinDk: string;
		Din: string;
		AmexDk: string;
		Amex: string;
		MtroDk: string;
		Mtro: string;
		Elec: string;
		Jcb: string;
		Ffk: string;
	}

	interface Customerservice {
		OpenButton: OpenButton;
		Home: Home;
		Email: Email;
		Chat: Chat;
	}

	interface OpenButton {
		Title: string;
	}

	interface Home {
		HeaderTitle: string;
		Phone: string;
		Chatonline: string;
		Chatoffline: string;
		Email: string;
		Openhours: string;
		Monday: string;
		Tuesday: string;
		Wednesday: string;
		Thursday: string;
		Friday: string;
		Saturday: string;
		Sunday: string;
		LinkFAQ: string;
		LinkService: string;
	}

	interface Email {
		HeaderTitle: string;
		Name: string;
		Email: string;
		CommentLabel: string;
		CommentPlaceholder: string;
		SendButtonText: string;
		Reason: string;
		ChooseReason: string;
		OrderNum: string;
		ConfirmationText: string;
		Subject: string;
	}

	interface Chat {
		HeaderTitle: string;
		ChatMessagePlaceholder: string;
		ChatInitialisingMessage: string;
		ChatConnectionEstablishedMessage: string;
		ChatEndedMessage: string;
	}

	interface PaymentCards {
		PaymentTechnicalErrors: PaymentTechnicalErrors;
		General: General;
		UseAnotherCardDialog: UseAnotherCardDialog;
	}

	interface PaymentTechnicalErrors {
		TechnicalErrorHeadline: string;
	}

	interface General {
		UseAnotherCardButtonText: string;
	}

	interface UseAnotherCardDialog {
		UseAnotherCardHeadline: string;
	}

	interface CreateUser {
		CreateUserGeneral: CreateUserGeneral;
		CreateUserMemberType: CreateUserMemberType;
		CreateUserEmail: CreateUserEmail;
		CreateUserCompanyName: CreateUserCompanyName;
		CreateUserFirstName: CreateUserFirstName;
		CreateUserMiddleName: CreateUserMiddleName;
		CreateUserLastName: CreateUserLastName;
		CreateUserPostalCode: CreateUserPostalCode;
		CreateUserCity: CreateUserCity;
		CreateUserStreetName: CreateUserStreetName;
		CreateUserHouseNumber: CreateUserHouseNumber;
		CreateUserFloor: CreateUserFloor;
		CreateUserSide: CreateUserSide;
		CreateUserLetter: CreateUserLetter;
		CreateUserDoor: CreateUserDoor;
		CreateUserMobile: CreateUserMobile;
		CreateUserPhone: CreateUserPhone;
		CreateUserEAN: CreateUserEAN;
		CreateUserCVR: CreateUserCVR;
		CreateUserRequisitionNumber: CreateUserRequisitionNumber;
		CreateUserPassword: CreateUserPassword;
		CreateUserPasswordConfirm: CreateUserPasswordConfirm;
		CreateUserAltCompanyName: CreateUserAltCompanyName;
		CreateUserContactPerson: CreateUserContactPerson;
		CreateUserNotes: CreateUserNotes;
		CreateUserHasNewsLetterSubscription: CreateUserHasNewsLetterSubscription;
		CreateUserHasNewsLetterWithOffersSubscription: CreateUserHasNewsLetterWithOffersSubscription;
		CreateUserHasNewsLetterWithMealplansSubscription: CreateUserHasNewsLetterWithMealplansSubscription;
		CreateUserHasNewsBySMSSubscription: CreateUserHasNewsBySMSSubscription;
		CreateUserAddressesAreEqual: CreateUserAddressesAreEqual;
		CreateUserSubmit: CreateUserSubmit;
	}

	interface CreateUserGeneral {
		MainHeadline: string;
		InvoiceHeadline: string;
		DeliveryHeadline: string;
		HeaderHtml: string;
		PostalCheckLabel: string;
		PostalCheckPlaceholder: string;
		PostalCheckButton: string;
		SuccessMsg: string;
		ErrorTitle: string;
		InvalidStreetnameMessage: string;
	}

	interface CreateUserMemberType {
		Label: string;
		PrivateLabel: string;
		CompanyLabel: string;
		PublicLabel: string;
	}

	interface CreateUserEmail {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		ErrorPattern: string;
		ErrorShort: string;
		ErrorLong: string;
	}

	interface CreateUserCompanyName {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserFirstName {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserMiddleName {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserLastName {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserPostalCode {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserCity {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		NotFound: string;
		NoDelivery: string;
	}

	interface CreateUserStreetName {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserHouseNumber {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserFloor {
		Label: string;
		Placeholder: string;
	}

	interface CreateUserSide {
		Label: string;
		Placeholder: string;
	}

	interface CreateUserLetter {
		Label: string;
		Placeholder: string;
	}

	interface CreateUserDoor {
		Label: string;
		Placeholder: string;
	}

	interface CreateUserMobile {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		ErrorPattern: string;
		ErrorShort: string;
		ErrorLong: string;
	}

	interface CreateUserPhone {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		ErrorPattern: string;
		ErrorShort: string;
		ErrorLong: string;
	}

	interface CreateUserEAN {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		ErrorShort: string;
		ErrorLong: string;
	}

	interface CreateUserCVR {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		ErrorShort: string;
		ErrorLong: string;
	}

	interface CreateUserRequisitionNumber {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserPassword {
		Label: string;
		Placeholder: string;
		Tooltip: string;
		ErrorRequired: string;
		ErrorShort: string;
		ErrorPattern: string;
	}

	interface CreateUserPasswordConfirm {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
		ErrorMatch: string;
	}

	interface CreateUserAltCompanyName {
		Label: string;
		Placeholder: string;
		ErrorRequired: string;
	}

	interface CreateUserContactPerson {
		Label: string;
		Placeholder: string;
	}

	interface CreateUserNotes {
		Label: string;
		Placeholder: string;
	}

	interface CreateUserHasNewsLetterSubscription {
		Label: string;
		LabelLink: string;
		ModalHeader: string;
		ModalBody: string;
	}

	interface CreateUserHasNewsLetterWithOffersSubscription {
		Label: string;
	}

	interface CreateUserHasNewsLetterWithMealplansSubscription {
		Label: string;
	}

	interface CreateUserHasNewsBySMSSubscription {
		Label: string;
		LabelLink: string;
		ModalHeader: string;
		ModalBody: string;
	}

	interface CreateUserAddressesAreEqual {
		Label: string;
	}

	interface CreateUserSubmit {
		Valid: string;
	}

	interface Form {
		ElementValidationMessage: ElementValidationMessage;
		Element: Element;
		ElementPlaceholder: ElementPlaceholder;
	}

	interface ElementValidationMessage {
		Required: string;
		MinLength: string;
		MaxLength: string;
		EmailNotValid: string;
		PasswordNotIdentical: string;
	}

	interface Element {
		Email: string;
		FirstName: string;
		LastName: string;
		PostalCode: string;
		City: string;
		StreetName: string;
		HouseNumber: string;
		Floor: string;
		Side: string;
		Door: string;
		HouseNumberLetter: string;
		Phone: string;
		SecondaryPhone: string;
		CustomerIsPrivate: string;
		CustomerIsCompany: string;
		CustomerIsGovernment: string;
		CustomerTypeText: string;
		CompanyName: string;
		CVR: string;
		EAN: string;
		RequisitionNumber: string;
		ContactPerson: string;
	}

	interface ElementPlaceholder {
		ContactPerson: string;
		Email: string;
	}

	interface Coupon {
		InputPlaceholder: string;
		ButtonText: string;
		ListHeader: string;
		Headline: string;
		MissingCoupon: string;
		MissingInput: string;
		AlreadyUsed: string;
		NotFound: string;
		Error: string;
		ProductSoldout: string;
		MaxAllowedReached: string;
		Invalid: string;
		Expired: string;
		CannotBeUsedAgain: string;
	}

	interface Newsletter {
		SubscriptionDialog: SubscriptionDialog;
		NewsletterSubscribeState: NewsletterSubscribeState;
		NewsletterEditState: NewsletterEditState;
		NewsletterActivateState: NewsletterActivateState;
	}

	interface SubscriptionDialog {
		Title: string;
		CancelLabel: string;
	}

	interface NewsletterSubscribeState {
		Description: string;
		ChoiceLabel: string;
		SubmitButton: string;
		StatusSuccess: string;
		StatusError: string;
	}

	interface NewsletterEditState {
		Description: string;
		ChoiceLabel: string;
		SubmitButton: string;
		StatusSuccess: string;
		StatusError: string;
	}

	interface NewsletterActivateState {
		Description: string;
		ChoiceLabel: string;
		SubmitButton: string;
		StatusSuccess: string;
		StatusError: string;
	}

	interface Spots {
		Welcome: Welcome;
	}

	interface Welcome {
		Greeting: string;
		YourOrderLatest: string;
		YourOrderReady: string;
		DeliveryTotal: string;
		EditOrder: string;
		CopyOrder: string;
		NewOrder: string;
		ViewOrder: string;
		GoToMyNemlig: string;
	}

	interface JobOfferings {
		AvailablePositions: AvailablePositions;
		OpenPositions: OpenPositions;
		User: User;
	}

	interface AvailablePositions {
		Title: string;
		Description: string;
		PositionName: string;
		PositionExpirationDate: string;
	}

	interface OpenPositions {
		Title: string;
		Description: string;
		PositionName: string;
		PositionDescription: string;
	}

	interface User {
		JobagentTitle: string;
		JobagentDescription: string;
		JobagentLink: string;
		LoginTitle: string;
		LoginDescription: string;
		LoginLink: string;
	}

	interface MyNemlig {
		AccountHistory: AccountHistory;
		AccountHistoryTypes: AccountHistoryTypes;
		OrderHistory: OrderHistory;
		OrderModalEdit: OrderModalEdit;
		OrderModalCopy: OrderModalCopy;
		OrderModalCancel: OrderModalCancel;
		CardAdministration: CardAdministration;
		MyNemligNewsletter: MyNemligNewsletter;
	}

	interface AccountHistory {
		Headline: string;
		Subline: string;
		MyBalance: string;
		LoadMore: string;
		Date: string;
		Id: string;
		Type: string;
		Price: string;
		Status: string;
		NoDataText: string;
		StatusMoneyInText: string;
		StatusMoneyOutText: string;
	}

	interface AccountHistoryTypes {
		Compensation: string;
		Transfer: string;
		Correction: string;
		BottleRecycling: string;
		Gift: string;
		Reversal: string;
		Competition: string;
		TransferToBank: string;
		Welcome: string;
		Loyalty: string;
		TakeAway: string;
	}

	interface OrderHistory {
		NoOrders: string;
		OrderNotFound: string;
		OrderCancellationNotAllowed: string;
		Headline: string;
		Subline: string;
		LoadMore: string;
		OrdersDate: string;
		OrdersId: string;
		OrdersPrice: string;
		OrdersStatus: string;
		DeliveryDate: string;
		OrderStatus1: string;
		OrderStatus2: string;
		OrderStatus3: string;
		OrderStatus4: string;
		OrderTitle: string;
		OrderTitleSmall: string;
		OrderUnit: string;
		OrderUnitSmall: string;
		OrderQuantity: string;
		OrderQuantitySmall: string;
		OrderPrice: string;
		OrderPriceSmall: string;
		OrderDiscount: string;
		OrderDiscountSmall: string;
		OrderPriceTotal: string;
		OrderPriceTotalSmall: string;
		OrderControlEdit: string;
		OrderControlEditSmall: string;
		OrderControlCancel: string;
		OrderControlCancelSmall: string;
		OrderControlCopy: string;
		OrderControlCopySmall: string;
		OrderControlInvoice: string;
		OrderControlInvoiceSmall: string;
		OrderControlPrint: string;
		OrderControlPrintSmall: string;
		OrderSummaryProducts: string;
		OrderSummaryDeposits: string;
		OrderSummaryBags: string;
		OrderSummaryDelivery: string;
		OrderSummaryCardFee: string;
		OrderSummaryCouponDiscount: string;
		OrderSummaryDiscount: string;
		OrderSummaryAccount: string;
		OrderSummaryTotal: string;
		OrderSummaryLabelUnits: string;
		OrderSummaryLabelProducts: string;
		OrderSummaryLabelZonesSingular: string;
		OrderSummaryLabelZones: string;
		OrderSummaryVat: string;
		RecipeMainGroupName: string;
		BundleMainGroupName: string;
	}

	interface OrderModalEdit {
		Headline: string;
		Body: string;
		Confirm: string;
		Cancel: string;
	}

	interface OrderModalCopy {
		Headline: string;
		Body: string;
		Confirm: string;
		Cancel: string;
	}

	interface OrderModalCancel {
		Headline: string;
		Body: string;
		Confirm: string;
		Cancel: string;
	}

	interface CardAdministration {
		Header: string;
		Text: string;
		AddPaymentCard: string;
		SavedPaymentCard: string;
		NoSavedPaymentCards: string;
		ChooseCardText: string;
		Fee: string;
		Paymethod: string;
		QuestionText: string;
		CustomerService: string;
	}

	interface MyNemligNewsletter {
		Header: string;
	}

	interface Checkout {
		CheckoutTechnicalErrors: CheckoutTechnicalErrors;
		CheckZipCodeOrLogin: CheckZipCodeOrLogin;
		MergeOrders: MergeOrders;
		OrderPlacement: OrderPlacement;
		Payment: Payment;
		PayWithGiro: PayWithGiro;
		PaymentMethods: PaymentMethods;
		Validation: Validation;
		MessageToDriver: MessageToDriver;
		ShippingCost: ShippingCost;
		Login: Login;
		ChangeAddress: ChangeAddress;
		AddProfile: AddProfile;
		General: General;
		TermsAndAgreements: TermsAndAgreements;
		ReturnBottles: ReturnBottles;
		FastTrack: FastTrack;
		CustomerAddressInformationPlaceholder: CustomerAddressInformationPlaceholder;
		CustomerAddressInformation: CustomerAddressInformation;
		Signup: Signup;
		AlternativeDeliveryAddress: AlternativeDeliveryAddress;
		Agreements: Agreements;
		Dialog: Dialog;
		OrderConfirmation: OrderConfirmation;
	}

	interface CheckoutTechnicalErrors {
		TechnicalErrorHeadline: string;
	}

	interface CheckZipCodeOrLogin {
		DialogHeadline: string;
		CheckZipCodeText: string;
	}

	interface MergeOrders {
		MergeOrdersDialogHeadline: string;
		MergeOrdersInformationText: string;
		MergeOrdersInformationHelperText: string;
		MergeOrdersYesButtonText: string;
		MergeOrdersNoButtonText: string;
		MergeOrdersOrderText: string;
		MergeOrdersCurrency: string;
	}

	interface OrderPlacement {
		RestrictedProducts: string;
		RestrictedProductsManualAdjustment: string;
		UndeliverableProducts: string;
		SoldOutProducts: string;
		SoldOutProductsManualAdjustment: string;
		RestrictedZeroPricedProducts: string;
		RestrictedZeroPricedProductsManualAdjustment: string;
		AgeRestrictedProducts: string;
		ProductQuantityAutoAdjustment: string;
		ProductQuantityLeftInStock: string;
		ProductQuantityMaxAllowed: string;
		ProductRemoved: string;
		EmailMismatch: string;
		OrderNumberMismatch: string;
		BasketTotalMismatch: string;
		ConfirmationPasswordInvalid: string;
		ConfirmationPasswordInvalidHeader: string;
		OrderInProcessingState: string;
		DeliveryTimeInvalid: string;
		NoProductsInBasket: string;
		MinBasketTotalInvalid: string;
		MaxBasketTotalInvalid: string;
		PaymentCreditCardNotFound: string;
		PlaceOrderError: string;
		PaymentProviderCommunicationError: string;
		PaymentCardRejectedByAcquirer: string;
		SavedPaymentCardRejectedByAcquirer: string;
		PaymentCardPeriodExpired: string;
		SavedPaymentCardPeriodExpired: string;
		PaymentProviderError: string;
		PaymentForbidden: string;
	}

	interface Payment {
		PaymentFailedHeadline: string;
		PaymentValidationHeadline: string;
		PaymentValidationChangesToBasketHeadline: string;
		PaymentValidationRestrictionsHeadline: string;
		PaymentValidationButton: string;
		PaymentToDIBSfailedText: string;
	}

	interface PayWithGiro {
		YesPayWithGiroNotLoggedIn: string;
		YesPayWithGiroLoggedIn: string;
		NoDontPayWithGiro: string;
		PaymentProviderFailed: string;
	}

	interface PaymentMethods {
		PaymentMethodSelected: string;
		Giro: string;
		ElectronicInvoice: string;
		NoPaymentMethodSelected: string;
		GettingPayments: string;
	}

	interface Validation {
		Required: string;
		MinLength: string;
		MaxLength: string;
		EmailNotValid: string;
		PasswordNotIdentical: string;
		Pattern: string;
	}

	interface MessageToDriver {
		MessageToTheDriverButtonText: string;
	}

	interface ShippingCost {
		NextShippingPrice: string;
	}

	interface Login {
		LoginButtonText: string;
		AlreadyCustomerSubLine: string;
	}

	interface ChangeAddress {
		CantDeliverToZipcodeErrorMesssage: string;
		CheckZipCodeButtonText: string;
		CheckZipCodeButtonPlaceholderText: string;
		CloseChangeAddressDialogButtonText: string;
		ChangeAddressButtonText: string;
		ChangeAddressDialogHeading: string;
		ChangeAddressZipCodeDescription: string;
		ChangeAddressInputLabel: string;
		MakeThisDefaultAddressText: string;
		ChangeAddressNotificationText: string;
		ChangeAddressCouldtNotUpdateErrorText: string;
	}

	interface AddProfile {
		AddProfileHeadline: string;
		Password: string;
		RepeatPassword: string;
		PasswordPlaceHolder: string;
		RepeatPasswordPlaceholder: string;
	}

	interface General {
		DeliveryHeadline: string;
		CustomerInformationHeadLine: string;
		PaymentButtonText: string;
		BackToBasketButtonText: string;
		OrdersNotMerged: string;
		NoArgumentsSupplied: string;
		MissingBasket: string;
		OrderValidationError: string;
	}

	interface TermsAndAgreements {
		SeeOur: string;
		TermsAndConditionAndPrivacyPolitics: string;
		TermsOfAgreementPart1: string;
		TermsOfAgreementPart2: string;
		TermsOfAgreementPart3: string;
	}

	interface ReturnBottles {
		ReturnBottlesHeadline: string;
		ReturnBottlesHeadlineNotification: string;
		ReturnBottlesCheckboxTextpart1: string;
		ReturnBottlesCheckboxTextpart2: string;
		ReturnBottlesDialogHeadLine: string;
		ReturnBottlesDialogCloseButtonText: string;
		ReturnBottlesDialogAcceptButtonText: string;
		ReturnBottlesInformationFailedToLoad: string;
		MessageToTheDriverHeadlineText: string;
	}

	interface FastTrack {
		DeliveryHeadline: string;
	}

	interface CustomerAddressInformationPlaceholder {
		EmailPlaceholder: string;
		FirstNamePlaceholder: string;
		MiddleNamePlaceholder: string;
		LastNamePlaceholder: string;
		PostalCodePlaceholder: string;
		CityPlaceholder: string;
		StreetNamePlaceholder: string;
		HouseNumberPlaceholder: string;
		FloorPlaceholder: string;
		SidePlaceholder: string;
		DoorPlaceholder: string;
		HouseNumberLetterPlaceholder: string;
		PhonePlaceholder: string;
		MobilePhonePlaceholder: string;
		CompanyNamePlaceholder: string;
		CVRPlaceholder: string;
		EANPlaceholder: string;
		RequisitionNumberPlaceholder: string;
		Password: string;
	}

	interface CustomerAddressInformation {
		Email: string;
		FirstName: string;
		MiddleName: string;
		LastName: string;
		PostalCode: string;
		City: string;
		StreetName: string;
		HouseNumber: string;
		Floor: string;
		Side: string;
		Door: string;
		HouseNumberLetter: string;
		Phone: string;
		MobilePhone: string;
		CustomerIsPrivate: string;
		CustomerIsCompany: string;
		CustomerIsGovernment: string;
		CustomerTypeText: string;
		CompanyName: string;
		CVR: string;
		EAN: string;
		RequisitionNumber: string;
		Password: string;
	}

	interface Signup {
		SignupToNewsletterText: string;
		SignupToNewsletterNotificationText: string;
		SignupToDiscountSMSText: string;
		SignupToDiscountSMSNotificationText: string;
		SignupToRecipesText: string;
		SignupToDiscountsText: string;
	}

	interface AlternativeDeliveryAddress {
		DeliveryAddressHeadLine: string;
		UseAlternativeDeliveryAddressCheckboxText: string;
	}

	interface Agreements {
		General: General;
		MinimumAge: MinimumAge;
		Terms: Terms;
		CorrectInformation: CorrectInformation;
	}

	interface General {
		AgreementsHeadline: string;
	}

	interface MinimumAge {
		IConfirmThatImOver: string;
		Old: string;
		MininimumAgeFailedLoadingContent: string;
	}

	interface Terms {
		TermsOfAgreementPart1: string;
		TermsOfAgreementPart2: string;
		TermsOfAgreementPart3: string;
	}

	interface CorrectInformation {
		CorrectInformation: string;
	}

	interface Dialog {
		AgeRequirement: string;
		Age: string;
		AgeRequirementAccept: string;
		Close: string;
		Accept: string;
	}

	interface OrderConfirmation {
		Header: string;
		SubHeader: string;
		OrderNumber: string;
		OrderDate: string;
		OrderAmount: string;
		PaymentMethod: string;
		DeliveryAddress: string;
		BillingAddress: string;
		Contact: string;
		LastEditDate: string;
		OrderDetails: string;
		FrontPageLink: string;
		Delivery: string;
		EditOrder: string;
		RecipeHeader: string;
		ProductName: string;
		ProductUnit: string;
		Unit: string;
		Units: string;
		SummaryProductsUnit: string;
		SummaryDepositUnit: string;
		SummaryBagsUnit: string;
		ProductQuantity: string;
		ProductPricePerUnit: string;
		ProductDiscountPerUnit: string;
		ProductPrice: string;
		OrderCount: string;
		OrderDeposit: string;
		OrderBags: string;
		OrderFreight: string;
		OrderCardFee: string;
		CouponDiscount: string;
		OrderDiscount: string;
		NemligAccount: string;
		OrderTotal: string;
		ReturnDeposit: string;
		ReturnDepositText: string;
		GoToFrontPage: string;
		OfWhichVAT: string;
		CalendarDeliverySubject: string;
		CalendarFileName: string;
		CalendarDeliveryDescription: string;
		CalendarAddLinkText: string;
		OrderSummaryFailedModalHeadline: string;
		OrderSummaryFailedDefaultText: string;
		OrderSummaryFailedDialogHeader: string;
	}

	interface Authentication {
		Login: Login;
		Logout: Logout;
		CurrentUser: CurrentUser;
		ResetPassword: ResetPassword;
		RequestChangePassword: RequestChangePassword;
		ChangePassword: ChangePassword;
	}

	interface Login {
		AnonymousSessionZipcodeOverwrittenDialogHeader: string;
		AnonymousSessionZipcodeOverwrittenDialogText: string;
		AnonymousSessionZipcodeOverwrittenDialogButtonText: string;
		Success: string;
		RememberMe: string;
		MissingPassword: string;
		UsernameOrPasswordInvalid: string;
		MissingUsername: string;
		UserIsNotValid: string;
		InvalidEmail: string;
		EmailRequired: string;
		PasswordRequired: string;
		TooShortEmail: string;
		TooLongEmail: string;
		UserDoesNotExist: string;
		Login: string;
		UnspecifiedError: string;
		ErrorUserNotAuthorized: string;
		MissingActiovationId: string;
		UserIsNotAuthenticated: string;
		TokenIsNotValid: string;
		AlreadyCustomer: string;
		Welcome: string;
		WelcomeLoggedIn: string;
		UsernameLabel: string;
		PasswordLabel: string;
		UsernamePlaceholder: string;
		PasswordPlaceholder: string;
		ForgotPassword: string;
		SubmitButton: string;
		LogOutButton: string;
		CreateUser: string;
		UserIsLockedOut: string;
		UserNotActivated: string;
		UserNotActivatedLinkText: string;
		UserNotActivatedStatusEmailResendOk: string;
		UserNotActivatedStatusEmailResendFailed: string;
		MissingToken: string;
	}

	interface Logout {
		LogOut: string;
	}

	interface CurrentUser {
		LoggedInAs: string;
		NotLoggedIn: string;
	}

	interface ResetPassword {
		Success: string;
		Error: string;
		MailHasBeenSent: string;
		ForgotPassword: string;
		Reset: string;
		ResetPasswordInformation: string;
		GetANewPassword: string;
		InvalidEmail: string;
		EmailRequired: string;
		TooShortEmail: string;
		TooLongEmail: string;
		TypeYourEmail: string;
		MailNotSentError: string;
		MailNotSentNoEmailError: string;
		UserNameDoesNotExist: string;
		Title: string;
		Description: string;
		UsernameLabel: string;
		SubmitButton: string;
		ForgotEmail: string;
		GoToLogin: string;
		ContactCustomerService: string;
	}

	interface RequestChangePassword {
		Headline: string;
		LabelPasswordNew: string;
		LabelPasswordNewRepeat: string;
		PlaceholderNewPassword: string;
		PlaceholderRepeatNewPassword: string;
		SubmitButton: string;
		UnspecifiedError: string;
		ErrorTokenInvalid: string;
		ErrorNotMatching: string;
		ErrorTooShort: string;
		ErrorPatternNotMatch: string;
		ErrorNewRequired: string;
		ErrorRepeatRequired: string;
		Success: string;
	}

	interface ChangePassword {
		Headline: string;
		SubmitButton: string;
		LabelNewPasswordOld: string;
		LabelPasswordNew: string;
		LabelPasswordNewRepeat: string;
		PlaceholderOldPassword: string;
		PlaceholderNewPassword: string;
		PlaceholderRepeatNewPassword: string;
		UnspecifiedError: string;
		ErrorNotMatching: string;
		ErrorOldRequired: string;
		ErrorTooShort: string;
		ErrorPatternNotMatch: string;
		ErrorNewRequired: string;
		ErrorRepeatRequired: string;
		Success: string;
	}

	interface Errors {
		MissingArguement: string;
		BasketNotFound: string;
		ProductNotFound: string;
		RecipeNotFound: string;
		ProductBundleNotFound: string;
		NotFound: string;
		InvalidFormat: string;
		MissingContextItem: string;
		UnkownError: string;
		ErrorOccured: string;
		MemberNotFound: string;
	}

	interface ServerErrorMessages {
		Error500Header: string;
		Error500Text: string;
	}

	interface Timeslot {
		StatusButton: StatusButton;
		ClosesSoon: ClosesSoon;
		StatusDisplay: StatusDisplay;
		Prompt: Prompt;
		DevicePrompt: DevicePrompt;
		DeviceFlowHeaders: DeviceFlowHeaders;
		Selector: Selector;
		Labels: Labels;
		BasketChanges: BasketChanges;
		CheckAddressDialog: CheckAddressDialog;
		NoDeliveryDialog: NoDeliveryDialog;
		TimeslotServerMessages: TimeslotServerMessages;
		DeliveryDescription: DeliveryDescription;
	}

	interface StatusButton {
		ButtonTextState1: string;
		ButtonTextState2: string;
		ButtonTextState3: string;
		ButtonTextState4: string;
	}

	interface ClosesSoon {
		Title: string;
		Description: string;
		Minutes: string;
	}

	interface StatusDisplay {
		ButtonTextState1: string;
		ButtonTextState2: string;
		ButtonTextState3: string;
	}

	interface Prompt {
		NextDeliveryText: string;
		PostCodeCheckText: string;
		PostCodeCheckPlaceholderText: string;
		PostCodeCheckButtonText: string;
	}

	interface DevicePrompt {
		PostCodeCheckText: string;
		ChooseDeliveryTimeslot: string;
		NextDeliveryText: string;
	}

	interface DeviceFlowHeaders {
		CheckDelivery: string;
		TimeslotSelector: string;
		NoDelivery: string;
		BasketChanges: string;
	}

	interface Selector {
		ChooseDateHeader: string;
		CloseButtonText: string;
		ChooseDeliveryTimeLaterText: string;
		EarlyHoursHeaderText: string;
		MidHoursHeaderText: string;
		LateHoursHeaderText: string;
		NoAvailableTimeslotForDeliveryText: string;
		PickTimeForText: string;
		DateSeparator: string;
		TimeUnit: string;
		TimeslotChosen: string;
	}

	interface Labels {
		CheapestDayLabel: string;
		EcologicalDeliveryDayLabel: string;
		CheapestHourLabel: string;
	}

	interface BasketChanges {
		DialogHeader: string;
		DialogContentHeader: string;
		ConfirmationText: string;
		DiffTextNoDiff: string;
		DiffTextCheaper: string;
		DiffTextMoreExpensive: string;
		PriceDiffCheaperHeader: string;
		PriceDiffMoreExpensiveHeader: string;
		ProductsUnavailableHeader: string;
		CouponChangesHeader: string;
		FreeDeliveryCouponPeriodInvalid: string;
		BonusCouponPeriodInvalid: string;
		FreeProductCouponPeriodInvalid: string;
		Accept: string;
		Reject: string;
	}

	interface CheckAddressDialog {
		DialogHeader: string;
		DialogContentHeader: string;
		DialogContentText: string;
		FullAddressText: string;
		PostCodeLabel: string;
		PostCodePlaceholder: string;
		StreetnameLabel: string;
		StreetnamePlaceholder: string;
		HousenumberLabel: string;
		HousenumberPlaceholder: string;
		SubmitButtonText: string;
		ChangesToBasket: string;
		InvalidStreetnameMessage: string;
	}

	interface NoDeliveryDialog {
		DialogHeader: string;
		GetNotifiedText1: string;
		NoDeliveryInPostCode: string;
		GetNotifiedText2: string;
		EmailFieldLabel: string;
		EmailFieldPlaceholder: string;
		GetNotifiedCheckboxLabel: string;
		NewsletterCheckboxLabel: string;
		NewsletterWeeklyOffersCheckboxLabel: string;
		NewsletterCookingInspirationCheckboxLabel: string;
		SubmitButtonText: string;
		GetNotifiedSuccessHeader: string;
		GetNotifiedSuccessText: string;
	}

	interface TimeslotServerMessages {
		UpdateTimeslot500: string;
		GetDeliveryDays500: string;
		AddDeliveryAddress500: string;
		AddPostCode500: string;
	}

	interface DeliveryDescription {
		Calendar_ConditionA: string;
		Calendar_ConditionB: string;
		Calendar_ConditionC: string;
	}

	interface Recipe {
		Common: Common;
		Tags: Tags;
		Aside: Aside;
		Messages: Messages;
		Product: Product;
		List: List;
	}

	interface Common {
		Servings: string;
		Ingredients: string;
		Preparation: string;
		AddToBasket: string;
		RemoveFromBasket: string;
	}

	interface Tags {
		WorkTime: string;
		TotalTime: string;
		RecipeBy: string;
	}

	interface Aside {
		Headline: string;
		SupplementsHeadline: string;
		UnitTitle: string;
	}

	interface Messages {
		AddedToBasket: string;
		UpdatedInBasket: string;
		ConfirmChangeServingsHeader: string;
		ConfirmChangeServingsBody: string;
		ConfirmChangeSortingHeader: string;
		ConfirmChangeSortingBody: string;
		ConfirmAddToBasketWhenNoDeliveryHeader: string;
		ConfirmAddToBasketWhenNoDeliveryBody: string;
		ConfirmText: string;
		NotConfirmText: string;
	}

	interface Product {
		Add: string;
		ShowAlternative: string;
		SoldOut1: string;
		SoldOut2: string;
	}

	interface List {
		ExpectedText: string;
		SoldoutText: string;
		SoldoutLinkText: string;
		NoDeliveryText: string;
	}

	interface Minibasket {
		HeaderSection: HeaderSection;
		ProductSection: ProductSection;
	}

	interface HeaderSection {
		Close: string;
		Savings: string;
		PerUnit: string;
		ProductCount: string;
		Total: string;
		GoToBasket: string;
	}

	interface ProductSection {
		ProductsHead: string;
		EmptyBasketText: string;
		RemoveRecipeText: string;
		SeeAllInBasket: string;
	}

	interface ProductDetail {
		Declaration: Declaration;
		Description: Description;
		Bundle: Bundle;
		Availability: Availability;
	}

	interface Declaration {
		DeclarationHead: string;
		Nutrition: string;
		NutritionEnergy: string;
		NutritionFat: string;
		NutritionSaturatedFattyAcids: string;
		NutritionCarbohydrate: string;
		NutritionSugars: string;
		NutritionDietaryFibers: string;
		NutritionProtein: string;
		NutritionSalt: string;
		NutritionKiloJoule: string;
		NutritionKiloCalories: string;
		NutritionGram: string;
		PDFText: string;
	}

	interface Description {
		DescriptionHead: string;
		AttributesHead: string;
	}

	interface Bundle {
		Currency: string;
		HeadTitle: string;
		HeadAmount: string;
		HeadUnit: string;
		HeadDiscount: string;
		HeadTotal: string;
		FooterDiscount: string;
		FooterPackage: string;
		ItemUnit: string;
	}

	interface Availability {
		SoldOut: string;
		DeliveryInfo: string;
		DeliveryInfoShort: string;
	}

	interface Productlist {
		OneRow: OneRow;
	}

	interface OneRow {
		SeeAll: string;
		LoadMore: string;
		NoResult: string;
	}

	interface CampaignSplashes {
		ProductCampaignBuyXForY: ProductCampaignBuyXForY;
		ProductCampaignDiscount: ProductCampaignDiscount;
		ProductCampaignDiscountPercent: ProductCampaignDiscountPercent;
		ProductCampaignFreeProduct: ProductCampaignFreeProduct;
		ProductCampaignMixOffer: ProductCampaignMixOffer;
		ProductCampaignMaxBuy: ProductCampaignMaxBuy;
		DiscountItem: DiscountItem;
	}

	interface ProductCampaignBuyXForY {
		Text: string;
	}

	interface ProductCampaignDiscount {
		BadgeText: string;
		Text: string;
	}

	interface ProductCampaignDiscountPercent {
		BadgeText: string;
		Text: string;
	}

	interface ProductCampaignFreeProduct {
		BadgeText: string;
		Text: string;
	}

	interface ProductCampaignMixOffer {
		BadgeText: string;
		BadgeText2: string;
		Text: string;
	}

	interface ProductCampaignMaxBuy {
		Text: string;
		Text2: string;
	}

	interface DiscountItem {
		DiscountText: string;
	}

	interface Filter {
		FilterMenu: FilterMenu;
		ChosenFilters: ChosenFilters;
		Sorting: Sorting;
		MobileFilters: MobileFilters;
	}

	interface FilterMenu {
		Title: string;
	}

	interface ChosenFilters {
		ChosenFilters: string;
		RemoveAllFilters: string;
	}

	interface Sorting {
		Title: string;
		OptionPopularity: string;
		OptionPrice: string;
	}

	interface MobileFilters {
		FilterHandleText: string;
		FilterHeaderText: string;
		ApplyFilters: string;
		ClearFilters: string;
	}

	interface Header {
		TranslationService: TranslationService;
	}

	interface TranslationService {
		MainNavigationTriggerText: string;
		Login: string;
		CreateUser: string;
		Logout: string;
		MyNemligAccount: string;
		CustomerService: string;
		DeliveryText: string;
	}

	interface General {
		Responses: Responses;
		Time: Time;
		TranslationService: TranslationService;
		CallToAction: CallToAction;
		HttpInterceptor: HttpInterceptor;
	}

	interface Responses {
		Yes: string;
		No: string;
		Okay: string;
		OkayShort: string;
	}

	interface Time {
		DayAbbreviation: string;
		TimeUnit: string;
	}

	interface TranslationService {
		NoMarket: string;
	}

	interface CallToAction {
		AddToBasket: string;
		RemoveBasket: string;
	}

	interface HttpInterceptor {
		Header: string;
		Text: string;
	}

	interface Validation {
		Error: Error;
		Member: Member;
		ProductRestriction: ProductRestriction;
		DeliveryAvailability: DeliveryAvailability;
		OrderOperation: OrderOperation;
		ProductAvailability: ProductAvailability;
	}

	interface Error {
		NameRequired: string;
		EmailRequired: string;
		EmailInvalid: string;
	}

	interface Member {
		EmailMaxLengthMessage: string;
		EmailRequiredMessage: string;
		EmailInvalidMessage: string;
		PasswordRequiredMessage: string;
		PasswordInvalidMessage: string;
		PasswordLengthMessage: string;
		PasswordAndConfirmedPasswordNotSameMessage: string;
		EmailDuplicatedMessage: string;
		InvoiceAddressCompanyNameRequiredMessage: string;
		InvoiceAddressCompanyNameMaxLengthMessage: string;
		RequisitionNumberMaxLengthMessage: string;
		EanMaxLengthMessage: string;
		CvrMaxLengthMessage: string;
		NotesMaxLengthMessage: string;
		CvrRequiredMessage: string;
		CvrInvalidMessage: string;
		EanRequiredMessage: string;
		EanInvalidMessage: string;
		MemberNotFoundMessage: string;
		MemberLockedMessage: string;
		MemberLockedWithReasonMessage: string;
		MemberNotActivatedMessage: string;
		MemberNotAuthenticatedMessage: string;
		NewPasswordRequiredMessage: string;
		NewPasswordInvalidMessage: string;
		NewPasswordLengthMessage: string;
		UserNameRequiredMessage: string;
		OldPasswordRequiredMessage: string;
		NewPasswordAndConfirmedPasswordNotSameMessage: string;
		DeliveryAddressCompanyNameRequiredMessage: string;
		DeliveryAddressCompanyNameMaxLengthMessage: string;
		DeliveryAddressStreetNameRequiredMessage: string;
		DeliveryAddressHouseNumberRequiredMessage: string;
		DeliveryAddressPostalCodeRequiredMessage: string;
		DeliveryAddressStreetNameMaxLengthMessage: string;
		DeliveryAddressContactPersonMaxLengthMessage: string;
		DeliveryAddressHouseNumberMaxLengthMessage: string;
		DeliveryAddressFloorMaxLengthMessage: string;
		DeliveryAddressDoorMaxLengthMessage: string;
		DeliveryAddressPostCodeMaxLengthMessage: string;
		DeliveryAddressPostalDistrictRequiredMessage: string;
		DeliveryAddressPostalDistrictMaxLengthMessage: string;
		DeliveryAddressMobileNumberMaxLengthMessage: string;
		DeliveryAddressInvalidMobileNumberMessage: string;
		DeliveryAddressPhoneNumberMaxLengthMessage: string;
		DeliveryAddressMobileNumberShouldBeNumericMessage: string;
		DeliveryAddressMobileNumberShouldBeInRangeMessage: string;
		DeliveryAddressPhoneNumberShouldBeNumericMessage: string;
		DeliveryAddressPhoneNumberShouldBeInRangeMessage: string;
		DeliveryAddressHouseNumberLetterMaxLengthMessage: string;
		FirstNameMaxLengthMessage: string;
		FirstNameRequiredMessage: string;
		MiddleNameMaxLengthMessage: string;
		LastNameMaxLengthMessage: string;
		LastNameRequiredMessage: string;
		InvoiceAddressStreetNameRequiredMessage: string;
		InvoiceAddressHouseNumberRequiredMessage: string;
		InvoiceAddressPostalCodeRequiredMessage: string;
		InvoiceAddressStreetNameMaxLengthMessage: string;
		InvoiceAddressHouseNumberMaxLengthMessage: string;
		InvoiceAddressHouseNumberLetterMaxLengthMessage: string;
		InvoiceAddressFloorMaxLengthMessage: string;
		InvoiceAddressDoorMaxLengthMessage: string;
		InvoiceAddressPostCodeMaxLengthMessage: string;
		InvoiceAddressPostalDistrictRequiredMessage: string;
		InvoiceAddressPostalDistrictMaxLengthMessage: string;
		InvoiceAddressMobileNumberRequiredMessage: string;
		InvoiceAddressMobileNumberMaxLengthMessage: string;
		InvoiceAddressInvalidMobileNumberMessage: string;
		InvoiceAddressPhoneNumberMaxLengthMessage: string;
		InvoiceAddressMobileNumberShouldBeNumericMessage: string;
		InvoiceAddressMobileNumberShouldBeInRangeMessage: string;
		InvoiceAddressPhoneNumberShouldBeNumericMessage: string;
		InvoiceAddressPhoneNumberShouldBeInRangeMessage: string;
		TermsAndConditionsRequiredMessage: string;
		NewsletterActivationError: string;
	}

	interface ProductRestriction {
		SalesLimitationRestriction: string;
	}

	interface DeliveryAvailability {
		NoDeliveryToAddress: string;
		AddrSuggestNotFound: string;
		DeliveryZoneNotPresent: string;
		DeliveryZoneNotAvailable: string;
	}

	interface OrderOperation {
		OrderMergedSuccessfully: string;
	}

	interface ProductAvailability {
		ArchivedProducts: string;
	}

	interface Navigation {
		MainMenu: MainMenu;
		MegaMenu: MegaMenu;
		MobileMenu: MobileMenu;
	}

	interface MainMenu {
		BtnCloseMainMenu: string;
	}

	interface MegaMenu {
		ShowAllLink: string;
	}

	interface MobileMenu {
		Title: string;
		OpenLinkPrefix: string;
	}

	interface Search {
		FrontPageSearchField: FrontPageSearchField;
		SiteHeaderSearch: SiteHeaderSearch;
		SearchProductNotFoundModal: SearchProductNotFoundModal;
		SearchResultPage: SearchResultPage;
		TypeAhead: TypeAhead;
		Contact: Contact;
	}

	interface FrontPageSearchField {
		SearchField: string;
	}

	interface SiteHeaderSearch {
		SearchFieldPlaceholderText: string;
		SearchFieldPlaceholderTextShort: string;
		SearchTriggerButtonText: string;
		SearchFieldClear: string;
	}

	interface SearchProductNotFoundModal {
		Header: string;
		Content: string;
		Button: string;
	}

	interface SearchResultPage {
		TabProducts: string;
		TabRecipes: string;
		NoResult: string;
		ResultSummary1: string;
		ResultSummary2: string;
		ResultSummary3: string;
		LoadMore: string;
		LoadMoreRecipes: string;
		CloseSearch: string;
		Inspiration: string;
		RecipeTeaserHead: string;
		RecipeTeaserLinkText: string;
		NoResultsMessage: string;
	}

	interface TypeAhead {
		GoToCategory: string;
		LatestSearches: string;
		PopularSearches: string;
		Suggestions: string;
	}

	interface Contact {
		Head: string;
		SubHead: string;
	}

	interface Modals {
		DefaultErrorModal: DefaultErrorModal;
	}

	interface DefaultErrorModal {
		Heading: string;
		Description: string;
		BtnClose: string;
	}

	interface Basket {
		Head: Head;
		Summary: Summary;
		MergeDialog: MergeDialog;
		ErrorDialog: ErrorDialog;
		Nav: Nav;
		ItemHead: ItemHead;
		Item: Item;
		ItemBundle: ItemBundle;
		Minimum: Minimum;
	}

	interface Head {
		Headline: string;
		EmptyBasket: string;
	}

	interface Summary {
		Products: string;
		LabelProducts: string;
		LabelDeposits: string;
		LabelBags: string;
		LabelDelivery: string;
		LabelCouponDiscount: string;
		LabelDiscount: string;
		CreditCardFee: string;
		LabelTotal: string;
		LabelUnitSingular: string;
		LabelUnit: string;
		LabelUnits: string;
		BagsModalBody: string;
		NoProductsInBasketText: string;
		NoRecipesInBasketText: string;
		NemligAccount: string;
	}

	interface MergeDialog {
		Title: string;
		Description: string;
	}

	interface ErrorDialog {
		Title: string;
		Description: string;
	}

	interface Nav {
		Cancel: string;
		Next: string;
		ClearBasket: string;
		ClearBasketWarning: string;
		GroupProducts: string;
		GroupRecipes: string;
		GroupBundles: string;
	}

	interface ItemHead {
		Category: string;
		Recipe: string;
		Name: string;
		Info: string;
		Unit: string;
		Discount: string;
		Price: string;
		Quantity: string;
		Remove: string;
	}

	interface Item {
		ExpandBundle: string;
	}

	interface ItemBundle {
		Amount: string;
		Unit: string;
		Discount: string;
	}

	interface Minimum {
		Minimum1: string;
		Minimum2: string;
		Minimum3: string;
		MinimumNotMet: string;
	}

	interface Footer {
		Discount: Discount;
		Contact: Contact;
		Subscribe: Subscribe;
	}

	interface Discount {
		DiscountBtn: string;
		DiscountHead1: string;
		DiscountHead2: string;
		DiscountSubHead: string;
	}

	interface Contact {
		ContactPhone: string;
		ContactMail: string;
		ContactHead: string;
		ContactSubHead: string;
		ContactBox1Text: string;
		ContactBox2Text: string;
		ContactBox3Text: string;
		ContactBox3LinkText: string;
		SocialHead: string;
		AccordionHead1: string;
		AccordionHead2: string;
	}

	interface Subscribe {
		SubscribeHead: string;
		SubscribePlaceholder: string;
		SubscribeBtnText: string;
	}

}


	