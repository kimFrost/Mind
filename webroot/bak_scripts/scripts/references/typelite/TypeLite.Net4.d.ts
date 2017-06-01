






 
 








/// <reference path="Enums.ts" />

declare module Nemlig.Models {
	interface CouponLineDiffData {
		CouponNumber: string;
		EndDate: Date;
		ProcessTypeCode: string;
		StartDate: Date;
	}
	interface MemberData {
		ActivationId: System.Guid;
		AddressesAreEqual: boolean;
		Comment: string;
		CreateDateTime: Date;
		CreditLimitLCY: number;
		CustomerStartTimeFixedSeconds: string;
		CustomerStartTimeVariablePerVolumeUnit: string;
		CVR: string;
		DebitorId: string;
		DeliveryAddress: Nemlig.Models.MemberDeliveryAddressData;
		EAN: string;
		Email: string;
		FailedLoginAttempts: number;
		Groups: Nemlig.Models.MemberGroupData[];
		HasNewsBySMSSubscription: boolean;
		HasNewsLetterSubscription: boolean;
		HasNewsLetterWithMealplansSubscription: boolean;
		HasNewsLetterWithOffersSubscription: boolean;
		HasTicketSubscription: boolean;
		Id: number;
		InvoiceAddress: Nemlig.Models.MemberInvoiceAddressData;
		IsActivated: boolean;
		IsBlocked: boolean;
		IsLockedOut: boolean;
		IsRobinson: boolean;
		IsSmore: boolean;
		IsSuspiciousMember: boolean;
		IsTestCustomer: boolean;
		LastLogin: Date;
		LockReasonCode: Vertica.Intervare.Model.Values.LockReasonCode;
		LoginName: string;
		MemberType: Vertica.Intervare.Model.Values.MemberType;
		MinimumOrderTotal: number;
		NavisionLock: boolean;
		NavisionLockDate: Date;
		NavisionLockReason: string;
		NemligKontoBalance: number;
		NemligKontoList: Nemlig.Models.NemligKontoData[];
		NoFlyers: boolean;
		Notes: string;
		OverdueBalanceLCY: number;
		PackagingFee: string;
		Password: string;
		PasswordRetrievalAnswer: string;
		PasswordRetrievalQuestion: string;
		PaymentMethod: Vertica.Intervare.Model.Values.PaymentMethod;
		PaymentMethodFee: number;
		PaymentMethodTerms: string;
		PbsTicketId: string;
		RequisitionNumber: string;
		SendEmails: boolean;
		ShippingAmount1: number;
		ShippingAmount2: number;
		ShippingAmount3: number;
		ShippingPrice1: number;
		ShippingPrice2: number;
		ShippingPrice3: number;
	}
	interface MemberDeliveryAddressData {
		CompanyName: string;
		ContactPerson: string;
		Door: string;
		Floor: string;
		HouseNumber: number;
		HouseNumberLetter: string;
		IsEmptyAddress: boolean;
		MobileNumber: string;
		Name: string;
		PhoneNumber: string;
		PostalCode: number;
		PostalDistrict: string;
		Side: string;
		StreetName: string;
	}
	interface MemberGroupData {
		Id: number;
		Name: string;
	}
	interface MemberInvoiceAddressData {
		CompanyName: string;
		Door: string;
		FirstName: string;
		Floor: string;
		HouseNumber: number;
		HouseNumberLetter: string;
		IsEmptyAddress: boolean;
		LastName: string;
		MiddleName: string;
		MobileNumber: string;
		Name: string;
		PhoneNumber: string;
		PostalCode: number;
		PostalDistrict: string;
		Side: string;
		StreetName: string;
	}
	interface NemligKontoData {
		Amount: number;
		Balance: number;
		CreatedDate: Date;
		Id: number;
		LinkText: string;
		Subtype: Vertica.Intervare.Model.Values.AccountPostingSubType;
		Text: string;
		Type: Vertica.Intervare.Model.Values.AccountPostingType;
	}
	interface OrderLineHistoryData {
		Amount: number;
		AverageItemPrice: number;
		CampaignName: string;
		Description: string;
		DiscountAmount: number;
		IsDepositLine: boolean;
		IsMixLine: boolean;
		IsProductLine: boolean;
		IsRecipeLine: boolean;
		MainGroupName: string;
		OriginalItemPrice: number;
		OriginalProductName: string;
		OriginalProductNumber: string;
		OriginalQuantity: number;
		ProductName: string;
		ProductNumber: string;
		Quantity: number;
		SoldOut: number;
	}
	interface ProductLineDiffData {
		AmountDiff: number;
		ProductName: string;
		Undeliverable: boolean;
	}
}
declare module SCommerce.Core.Advertisement.Interface {
	interface IAdvertisementModel {
		Boost: number;
		CampaignEnd: Date;
		CampaignStart: Date;
		ImageModel: SCommerce.Core.FieldTypes.Interface.IImage;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Name: string;
	}
}
declare module SCommerce.Core.FieldTypes.Interface {
	interface IImage {
		Alt: string;
		Border: string;
		Class: string;
		Height: number;
		HSpace: number;
		Src: string;
		Title: string;
		VSpace: number;
		Width: number;
	}
	interface ILink {
		Anchor: string;
		Class: string;
		LinkType: SCommerce.Core.FieldTypes.Interface.LinkType;
		Query: string;
		Target: string;
		TargetId: System.Guid;
		Text: string;
		Title: string;
		Url: string;
	}
}
declare module SCommerce.Core.Product.Model {
	interface SearchResultExplanation {
	}
}
declare module SCommerce.Core.Salesforce {
	interface IChatQuestionType {
		Type: string;
	}
	interface IChatSettingsModel {
		ButtonID: string;
		ContactEmail: string;
		CustomerServiceLink: SCommerce.Core.FieldTypes.Interface.ILink;
		DeploymentID: string;
		Faqlink: SCommerce.Core.FieldTypes.Interface.ILink;
		FridayFrom: string;
		FridayTo: string;
		MondayFrom: string;
		MondayTo: string;
		OrganizationID: string;
		QuestionTypes: SCommerce.Core.Salesforce.IChatQuestionType[];
		SaturdayFrom: string;
		SaturdayTo: string;
		SundayFrom: string;
		SundayTo: string;
		ThursdayFrom: string;
		ThursdayTo: string;
		TuesdayFrom: string;
		TuesdayTo: string;
		WednesdayFrom: string;
		WednesdayTo: string;
	}
}
declare module SCommerce.Website.Code.Advertisement.Interface {
	interface IBannerAdvertisementModel {
		Boost: number;
		CampaignEnd: Date;
		CampaignStart: Date;
		Image: SCommerce.Core.FieldTypes.Interface.IImage;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
	}
}
declare module SCommerce.Website.Code.Content.Model {
	interface IMetaDataContentModel {
		BackgroundImage: SCommerce.Core.FieldTypes.Interface.IImage;
		BackgroundImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		CategoryPath: string;
		MetaDescription: string;
		MetaKeyWords: string;
		PageTitle: string;
		ResponseCode: number;
	}
}
declare module SCommerce.Website.Code.Cookie {
	interface ICookieWarningModel {
		Body: string;
		ButtonText: string;
		ButtonTextShort: string;
		Heading: string;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		LinkText: string;
	}
}
declare module SCommerce.Website.Code.FieldTypes.Model {
	interface ImageViewModel {
		AltText: string;
		IsUrlExternal: boolean;
		MediaType: SCommerce.Website.Code.Video.Model.MediaType;
		Url: string;
	}
	interface NullImage {
		Alt: string;
		Border: string;
		Class: string;
		Height: number;
		HSpace: number;
		Id: System.Guid;
		Language: string;
		Src: string;
		Title: string;
		VSpace: number;
		Width: number;
	}
	interface NullLink {
		Anchor: string;
		Class: string;
		LinkType: SCommerce.Core.FieldTypes.Interface.LinkType;
		Query: string;
		Target: string;
		TargetId: System.Guid;
		Text: string;
		Title: string;
		Url: string;
	}
}
declare module SCommerce.Website.Code.Information {
	interface ContactViewModel {
		ChatTitle: string;
		EmailText: string;
		EmailTitle: string;
		EmailUrl: string;
		PhoneNumber: string;
		PhoneTitle: string;
	}
	interface SocialViewModel {
		Facebook: string;
		GooglePlus: string;
		Instagram: string;
		LinkedIn: string;
		Twitter: string;
	}
}
declare module SCommerce.Website.Code.Information.Model {
	interface IContactModel {
		ChatTitle: string;
		EmailAddress: SCommerce.Core.FieldTypes.Interface.ILink;
		EmailTitle: string;
		PhoneNumber: string;
		PhoneTitle: string;
	}
	interface ISocialModel {
		Facebook: string;
		GooglePlus: string;
		Instagram: string;
		LinkedIn: string;
		Twitter: string;
	}
}
declare module SCommerce.Website.Code.Ribbon.Model.Interface {
	interface IAdvertisementRibbonElementRenderingModel {
		Advertisement: SCommerce.Website.Code.Advertisement.Interface.IBannerAdvertisementModel;
		AdvertisementIds: string[];
		Advertisements: SCommerce.Website.Code.Advertisement.Interface.IBannerAdvertisementModel[];
		Placeholder: string;
	}
}
declare module SCommerce.Website.Code.Settings.Model {
	interface ITextAnchorModel {
		Position: string;
	}
	interface ITextSizeModel {
		Size: string;
	}
	interface IThemeColorModel {
		Color: string;
	}
}
declare module SCommerce.Website.Code.Spot.Model {
	interface CombiSpotProductViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel {
		TemplateName: string;
	}
}
declare module SCommerce.Website.Code.Spot.Model.Interface {
	interface IBrandSpotRenderingModel {
		BrandLogo: SCommerce.Core.FieldTypes.Interface.IImage;
		BrandLogoForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		BrandName: string;
		Placeholder: string;
		SpotLink: SCommerce.Core.FieldTypes.Interface.ILink;
		SpotText: string;
	}
	interface ICombiSpotRenderingModel {
		FeatureImageSpot: SCommerce.Website.Code.Spot.Model.Interface.IFeatureImageSpotRenderingModel;
		Placeholder: string;
		Product: SCommerce.Website.Code.Spot.Model.CombiSpotProductViewModel;
		ProductId: string;
		ProductImage: SCommerce.Core.FieldTypes.Interface.IImage;
		ProductImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		ReverseSpotOrder: boolean;
	}
	interface IFeatureImageSpotRenderingModel {
		BackgroundImage: SCommerce.Core.FieldTypes.Interface.IImage;
		BackgroundImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		BackgroundImageOverlay: boolean;
		CornerRibbonText: string;
		Header: string;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Placeholder: string;
		ShowLinkAsButton: boolean;
		Subheader: string;
		TextAnchor: SCommerce.Website.Code.Settings.Model.ITextAnchorModel;
		TextBackground: boolean;
		TextSize: SCommerce.Website.Code.Settings.Model.ITextSizeModel;
	}
	interface IImageSpotRenderingModel {
		BackgroundImage: SCommerce.Core.FieldTypes.Interface.IImage;
		BackgroundImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		Header: string;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Placeholder: string;
		Subheader: string;
	}
	interface IJobOfferingSpotRenderingModel {
		Placeholder: string;
	}
	interface IRecipeSpotRenderingModel {
		Header: string;
		Image: SCommerce.Core.FieldTypes.Interface.IImage;
		ImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Placeholder: string;
		Recipe: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeListItemViewModel;
		RecipeGuid: System.Guid;
		Subheader: string;
		TextAnchor: SCommerce.Website.Code.Settings.Model.ITextAnchorModel;
		TextSize: SCommerce.Website.Code.Settings.Model.ITextSizeModel;
		Video: SCommerce.Website.Code.Video.Model.IVideoMediaType;
	}
	interface IRichTextSpotRenderingModel {
		Header: string;
		Image: SCommerce.Core.FieldTypes.Interface.IImage;
		ImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Placeholder: string;
		Text: string;
	}
	interface ISubscriptionSpotRenderingModel {
		ButtonText: string;
		CheckboxGeneralEmailSubscriptionText: string;
		CheckboxGeneralSmsSubscriptionText: string;
		CheckboxWeeklyOfferingsEmailSubscriptionText: string;
		CheckboxWeeklyRecipeEmailSubscriptionText: string;
		Description: string;
		Header: string;
		Placeholder: string;
	}
	interface ITextSpotRenderingModel {
		BackgroundImage: SCommerce.Core.FieldTypes.Interface.IImage;
		BackgroundImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		BackgroundImageOverlay: boolean;
		Header: string;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		ListLine1: string;
		ListLine2: string;
		ListLine3: string;
		ListLine4: string;
		ListLine5: string;
		Placeholder: string;
		ShowLinkAsButton: boolean;
		TextAnchor: SCommerce.Website.Code.Settings.Model.ITextAnchorModel;
		TextSize: SCommerce.Website.Code.Settings.Model.ITextSizeModel;
	}
	interface IThemeLinkSpotRenderingModel {
		BackgroundImage: SCommerce.Core.FieldTypes.Interface.IImage;
		BackgroundImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		BackgroundImageOverlay: boolean;
		Header: string;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Placeholder: string;
		ShowLinkAsButton: boolean;
	}
	interface IVideoSpotRenderingModel {
		Header: string;
		Placeholder: string;
		Subheader: string;
		TextAnchor: SCommerce.Website.Code.Settings.Model.ITextAnchorModel;
		TextSize: SCommerce.Website.Code.Settings.Model.ITextSizeModel;
		Video: SCommerce.Website.Code.Video.Model.IVideoMediaType;
	}
	interface IWelcomeSpotRenderingModel {
		Placeholder: string;
	}
}
declare module SCommerce.Website.Code.Video.Model {
	interface IMedia {
		MediaType: SCommerce.Website.Code.Video.Model.MediaType;
	}
	interface IVideoMediaType {
		ThumbnailImage: SCommerce.Core.FieldTypes.Interface.IImage;
		ThumbnailImageForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		VideoName: string;
		YouTubeId: string;
		YouTubeUrl: string;
	}
}
declare module SCommerce.Website.Code.WebAPI.Controllers {
	interface ErrorMessage {
		Headline: string;
		Text: string;
	}
	interface UpdateSubscribtionRequestArg {
		Email: string;
		HasMealPlanSubscribtion: boolean;
		HasNewsletterSubscribtion: boolean;
		HasOffersSubscribtion: boolean;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models {
	interface DateTimeForShowingViewModel {
		Date: Date;
		Hours: string;
		Minutes: string;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Advertisement {
	interface AdvertisementViewModel {
		Image: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Name: string;
	}
	interface SearchAdViewModel {
		Explain: SCommerce.Core.Product.Model.SearchResultExplanation;
		ImageUrl: string;
		IsProduct: boolean;
		Link: string;
		Product: SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Basket {
	interface AddressViewModel {
		CompanyName: string;
		ContactPerson: string;
		Door: string;
		FirstName: string;
		Floor: string;
		HouseNumber: number;
		HouseNumberLetter: string;
		IsEmptyAddress: boolean;
		LastName: string;
		MiddleName: string;
		MobileNumber: string;
		Name: string;
		PhoneNumber: string;
		PostalCode: number;
		PostalDistrict: string;
		Side: string;
		StreetName: string;
	}
	interface BasketLineViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.ProductSimpleBaseViewModel {
		BundleItems: SCommerce.Website.Code.WebAPI.Models.Basket.BundleItemViewModel[];
		DiscountSavings: number;
		IsContainedInRecipe: boolean;
		ItemPrice: number;
		MainGroupName: string;
		PrimaryImage: string;
		Quantity: number;
	}
	interface BasketViewModel {
		AddressesAreEqual: boolean;
		BasketGuid: System.Guid;
		CouponDiscount: number;
		Coupons: SCommerce.Website.Code.WebAPI.Models.Basket.CouponLineViewModel[];
		CreditCardFee: number;
		CreditCardId: number;
		DeliveryAddress: SCommerce.Website.Code.WebAPI.Models.Basket.AddressViewModel;
		DeliveryPrice: number;
		DeliveryTimeSlot: SCommerce.Website.Code.WebAPI.Models.Basket.DeliveryViewModel;
		Email: string;
		FormattedDeliveryTime: string;
		GroupFee: SCommerce.Website.Code.WebAPI.Models.Payment.FeeGroupViewModel;
		GroupFeeId: System.Guid;
		Id: string;
		InvoiceAddress: SCommerce.Website.Code.WebAPI.Models.Basket.AddressViewModel;
		IsMaxTotalValid: boolean;
		IsMinTotalValid: boolean;
		Lines: SCommerce.Website.Code.WebAPI.Models.Basket.BasketLineViewModel[];
		MinimumAgeRequired: number;
		MinimumOrderTotal: number;
		NemligAccount: number;
		Notes: string;
		NumberOfBags: number;
		NumberOfDeposits: number;
		NumberOfProducts: number;
		OrderNumber: string;
		OrderStepRequired: SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel;
		OrdersToMergeWith: SCommerce.Website.Code.WebAPI.Models.Basket.MergeOrderViewModel[];
		PaymentMethod: Vertica.Intervare.Model.Values.PaymentMethod;
		PreviousBasketGuid: string;
		PreviousBasketId: number;
		PreviousOrderNumber: string;
		Recipes: SCommerce.Website.Code.WebAPI.Models.Basket.RecipeViewModel[];
		TotalBagsPrice: number;
		TotalDepositsPrice: number;
		TotalPrice: number;
		TotalPriceWithoutFee: number;
		TotalProductDiscountPrice: number;
		TotalProductsPrice: number;
		ValidationFailures: SCommerce.Website.Code.WebAPI.Models.Basket.ValidationFailureViewModel[];
	}
	interface BundleItemViewModel {
		Description: string;
		DiscountItem: boolean;
		Id: string;
		ImageUrl: string;
		Quantity: number;
		Title: string;
		Url: string;
	}
	interface CouponLineViewModel {
		Name: string;
		Type: string;
	}
	interface DeliveryViewModel {
		Date: Date;
		Duration: number;
		EndTime: number;
		Id: string;
		ReservationLost: boolean;
		Reserved: boolean;
		StartTime: number;
	}
	interface MergeOrderViewModel {
		OrderId: number;
		OrderNumber: string;
		TimeInterval: string;
		TotalPrice: number;
	}
	interface RecipeViewModel {
		Id: string;
		Persons: number;
		PrimaryImage: string;
		ProductIds: string[];
		SoldOutProducts: SCommerce.Website.Code.WebAPI.Models.Recipe.SupplementProductViewModel[];
		SupplementProducts: SCommerce.Website.Code.WebAPI.Models.Recipe.SupplementProductViewModel[];
		Title: string;
		Url: string;
	}
	interface ValidationFailureViewModel {
		Group: Nemlig.Models.ValidationGroup;
		Header: string;
		Messages: string[];
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Delivery {
	interface DeliveryAddressregistrationViewModel {
		City: string;
		CompanyName: string;
		Days: number;
		Door: string;
		Floor: string;
		HouseNumber: number;
		HouseNumberLetter: string;
		PostalCode: number;
		Side: string;
		StreetName: string;
	}
	interface DeliveryTimeValidationViewModel {
		BundleLineDiffs: Nemlig.Models.ProductLineDiffData[];
		CouponLineDiffs: Nemlig.Models.CouponLineDiffData[];
		DeliveryZoneId: number;
		IsPriceDiffChangePositive: boolean;
		IsReserved: boolean;
		MinutesReserved: number;
		MinutesTillDeadline: number;
		PriceChangeDiff: number;
		ProductLineDiffs: Nemlig.Models.ProductLineDiffData[];
		ShowDeadlineAlert: boolean;
		TimeslotUtc: string;
	}
	interface ITimeslotSelectionMessage {
		EndTime: Date;
		Message: string;
		StartTime: Date;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Filter {
	interface FacetsViewModel {
		FacetGroups: SCommerce.Website.Code.WebAPI.Models.Filter.IFacetGroupViewModel[];
		FacetPivots: SCommerce.Website.Code.WebAPI.Models.Filter.IFacetViewModel[];
		NumFound: number;
		SortingList: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel[];
	}
	interface IFacetGroupViewModel {
		Items: SCommerce.Website.Code.WebAPI.Models.Filter.IFacetViewModel[];
		Text: string;
		Type: string;
	}
	interface IFacetViewModel {
		Amount: number;
		IsSelected: boolean;
		Text: string;
		Type: string;
		UrlName: string;
	}
	interface SortViewModel {
		IsSelected: boolean;
		Title: string;
		UrlName: string;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Login {
	interface MemberDataViewModel extends Nemlig.Models.MemberData {
	}
	interface MemberViewModel {
		DebitorId: string;
		DeliveryAddress: SCommerce.Website.Code.WebAPI.Models.Basket.AddressViewModel;
		Email: string;
		MessageToDriver: string;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Order {
	interface BasicOrderHistoryCollectionViewModel {
		NumberOfPages: number;
		Orders: SCommerce.Website.Code.WebAPI.Models.Order.BasicOrderHistoryViewModel[];
	}
	interface BasicOrderHistoryViewModel {
		Buttons: number[];
		DeliveryAddress: string;
		DeliveryDeadlineDate: string;
		DeliveryStatus: number;
		Id: number;
		IsDeliveryOnWay: boolean;
		OrderDate: string;
		OrderNumber: string;
		Status: number;
		Total: number;
	}
	interface CreditCardPaymentInfo {
		CardNumber: string;
		CardType: string;
	}
	interface OrderConfirmationViewModel extends SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel {
		CreditCardNumber: string;
		CreditCardType: string;
		OrderCreatedDate: SCommerce.Website.Code.WebAPI.Models.DateTimeForShowingViewModel;
		OrderDeadlineDate: SCommerce.Website.Code.WebAPI.Models.DateTimeForShowingViewModel;
		OrderDeliveryEndTime: SCommerce.Website.Code.WebAPI.Models.DateTimeForShowingViewModel;
		OrderDeliveryStartTime: SCommerce.Website.Code.WebAPI.Models.DateTimeForShowingViewModel;
		PaymentType: string;
		ReturnOfBottlesRequested: boolean;
		SavePaymentInfoLink: string;
		SelectedPaymentInfo: SCommerce.Website.Code.WebAPI.Models.Order.CreditCardPaymentInfo;
		TotalVatPrice: number;
		VAT: number;
	}
	interface OrderHistoryViewModel {
		AddedToAccount: number;
		Bonus: number;
		CouponDiscount: number;
		CouponLines: SCommerce.Website.Code.WebAPI.Models.Basket.CouponLineViewModel[];
		DebitorId: string;
		DeliveryDate: string;
		DeliveryDeadline: string;
		DeliveryStatus: Vertica.Intervare.DeliveryService.TimeSlotAvailabilities;
		DepositPrice: number;
		Email: string;
		Id: number;
		Lines: SCommerce.Website.Code.WebAPI.Models.Order.OrderLineHistoryViewModel[];
		Notes: string;
		NumberOfDeposits: number;
		NumberOfPacks: number;
		NumberOfProducts: number;
		OrderDate: string;
		OrderNumber: string;
		PackagingPrice: number;
		ShippingPrice: number;
		Status: number;
		SubTotal: number;
		TimeslotDuration: number;
		Total: number;
		TotalProductDiscount: number;
		TotalProductDiscountPrice: number;
		TotalVatAmount: number;
		TransactionFee: number;
		TranslationsJson: string;
	}
	interface OrderLineHistoryViewModel extends Nemlig.Models.OrderLineHistoryData {
		GroupName: string;
	}
	interface PlaceOrderIsLoggedInArgs {
		AcceptedGiroPayment: boolean;
		AcceptMinimumAge: boolean;
		CheckForOrdersToMerge: boolean;
		Notes: string;
		Password: string;
		PaymentCard: number;
		ReturnOfBottlesRequested: boolean;
		TermsAndConditionsAccepted: boolean;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Payment {
	interface CreditCardViewModel {
		CardExpirationInfo: Date;
		CardExpirationMonth: string;
		CardExpirationYear: string;
		CardId: number;
		CardMask: string;
		CardType: string;
		FeeInPercent: number;
		IsDefault: boolean;
	}
	interface FeeGroupViewModel {
		FeeInPercent: number;
		GroupFeePercentageText: string;
		GroupId: System.Guid;
		GroupName: string;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Product {
	interface AvailabilityViewModel {
		IsAvailableFewInStock: boolean;
		IsAvailableInStock: boolean;
		IsDeliveryAvailable: boolean;
		ReasonMessageKeys: string[];
	}
	interface DeclarationsViewModel {
		DietaryFiber: string;
		EnergyKcal: string;
		EnergyKj: string;
		NutritionalContentCarbohydrate: string;
		NutritionalContentFat: string;
		NutritionalContentProtein: string;
		Salt: string;
		SaturatedFattyAcid: string;
		ShowDeclarations: boolean;
		Sugar: string;
	}
	interface ProductGroupViewModel {
		Advertisements: System.Collections.Generic.KeyValuePair<number, SCommerce.Website.Code.WebAPI.Models.Advertisement.AdvertisementViewModel>[];
		NumFound: number;
		Products: SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel[];
		Start: number;
	}
	interface ProductListItemViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.ProductSimpleBaseViewModel {
		Availability: SCommerce.Website.Code.WebAPI.Models.Product.AvailabilityViewModel;
		PrimaryImage: string;
		TemplateName: string;
		YoutubeId: string;
		YoutubeThumbnailImage: string;
	}
	interface ProductSimpleBaseViewModel {
		Brand: string;
		Campaign: SCommerce.Website.Code.WebAPI.Models.Product.Campaign.CampaignBaseViewModel;
		Category: string;
		Description: string;
		DiscountItem: boolean;
		Favorite: boolean;
		Id: string;
		IsHiddenProduct: boolean;
		Labels: string[];
		Name: string;
		Price: number;
		SearchDescription: string[];
		UnitPrice: string;
		Url: string;
	}
	interface ProductViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.ProductSimpleBaseViewModel {
		Attributes: System.Collections.Generic.KeyValuePair<string, string[]>[];
		Availability: SCommerce.Website.Code.WebAPI.Models.Product.AvailabilityViewModel;
		DeclarationLabel: string;
		Declarations: SCommerce.Website.Code.WebAPI.Models.Product.DeclarationsViewModel;
		DiscountSavings: number;
		IsBundle: boolean;
		IsMedicalProduct: boolean;
		Media: SCommerce.Website.Code.Video.Model.IMedia[];
		PDFUrl: string;
		Products: SCommerce.Website.Code.WebAPI.Models.Product.Bundle.ProductbundleProductItemViewModel[];
		TechnicalDescription: string;
		TemplateName: string;
		Text: string;
		VkNumber: string;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Product.Bundle {
	interface ProductbundleProductItemViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.ProductSimpleBaseViewModel {
		Amount: number;
		DiscountSavings: number;
		PrimaryImage: string;
		TotalPrice: number;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Product.Campaign {
	interface BuyXForYCampaignViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.Campaign.CampaignBaseViewModel {
		MaxQuantity: number;
		MinQuantity: number;
		TotalPrice: number;
	}
	interface CampaignBaseViewModel {
		CampaignPrice: number;
		Type: string;
	}
	interface DiscountCampaignViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.Campaign.CampaignBaseViewModel {
		DiscountSavings: number;
		MaxQuantity: number;
	}
	interface DiscountPercentViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.Campaign.CampaignBaseViewModel {
		DiscountPercent: number;
		DiscountSavings: number;
	}
	interface MixOfferCampaignViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.Campaign.CampaignBaseViewModel {
		MaxQuantity: number;
		MinQuantity: number;
		TotalPrice: number;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Recipe {
	interface ProductRecommendationViewModel {
		Heading: string;
		ProductGroupId: string;
		Products: SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel[];
		RaptorId: string;
		RecommendationId: System.Guid;
	}
	interface RecipeAuthor {
		Link: SCommerce.Core.FieldTypes.Interface.ILink;
		Logo: SCommerce.Core.FieldTypes.Interface.IImage;
		LogoForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		Name: string;
		ShowLogo: boolean;
	}
	interface RecipeContainmentViewModel {
		IsPurchaseAvailable: boolean;
		Products: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductSelectionViewModel[];
	}
	interface RecipeDetailViewModel {
		AllowedForNumberOfPersons: number[];
		Author: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeAuthor;
		Header: string;
		IngredientGroups: any;
		Instructions: string;
		IsLockedForNumberOfPersons: boolean;
		Media: SCommerce.Website.Code.Video.Model.IMedia[];
		MetaDescription: string;
		MetaTitle: string;
		NumberOfPersons: number;
		PrimaryImageUrl: string;
		RecipeId: string;
		RecipeTags: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeTag[];
		RecipeUrl: string;
		Recommendations: SCommerce.Website.Code.WebAPI.Models.Recipe.RecommendationsViewModel;
		SortingList: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel[];
		TemplateName: string;
		TotalTime: string;
		WorkTime: string;
	}
	interface RecipeGroupViewModel {
		NumFound: number;
		Recipes: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeListItemViewModel[];
		Start: number;
	}
	interface RecipeListItemViewModel {
		AllowedForNumberOfPersons: number[];
		Author: string;
		Id: string;
		Name: string;
		NumberOfPersons: number;
		PrimaryImage: string;
		SortingList: SCommerce.Website.Code.WebAPI.Models.Filter.SortViewModel[];
		Tags: string[];
		TemplateName: string;
		TotalTime: string;
		Url: string;
	}
	interface RecipeProductGroupViewModel {
		IsFictional: boolean;
		NumFound: number;
		Products: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductListItemViewModel[];
		Start: number;
	}
	interface RecipeProductListItemViewModel extends SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel {
		AmountForCurrentRecipe: number;
		PieceUnitType: number;
		PriceForCurrentRecipe: number;
		UnitConversionFactor: number;
	}
	interface RecipeProductSelectionViewModel {
		IsFictional: boolean;
		IsNecessary: boolean;
		IsSupplementProduct: boolean;
		MeasureKg: number;
		MeasureLiter: number;
		MeasurePieces: number;
		NotFoundImage: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		NumberOfProductsFound: number;
		Product: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductListItemViewModel;
		ProductGroupId: System.Guid;
		ProductSelectionId: System.Guid;
		Title: string;
	}
	interface RecipeRecommendationViewModel {
		Heading: string;
		RecipeGroupId: string;
		Recipes: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeDetailViewModel[];
		RecommendationId: System.Guid;
	}
	interface RecipeTag {
		IconClass: string;
		Name: string;
	}
	interface RecommendationsViewModel {
		ProductsRecommendations: SCommerce.Website.Code.WebAPI.Models.Recipe.ProductRecommendationViewModel[];
		RecipeRecommendations: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeRecommendationViewModel[];
	}
	interface SupplementProductViewModel {
		Name: string;
		ProductSelectionId: System.Guid;
	}
}
declare module SCommerce.Website.Code.WebAPI.Models.Search {
	interface SearchResultViewModel<T> {
		RecipesNumFound: number;
		Results: T[];
		SearchQuery: string;
		Start: number;
	}
	interface SearchViewModel {
		Ads: SCommerce.Website.Code.WebAPI.Models.Advertisement.SearchAdViewModel[];
		AdsNumFound: number;
		Facets: SCommerce.Website.Code.WebAPI.Models.Filter.FacetsViewModel;
		Products: SCommerce.Website.Code.WebAPI.Models.Product.ProductGroupViewModel;
		ProductsNumFound: number;
		Recipes: SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeListItemViewModel[];
		RecipesNumFound: number;
		SearchQuery: string;
		Suggestions: string[];
	}
}
declare module SCommerce.Website.Code.WebServices {
	interface ServiceResponseModel {
		Data: any;
		DeveloperMessage: string;
		ErrorCode: any;
		ErrorMessage: string;
	}
}
declare module SCommerce.Website.SCom.Renderings.Layout.Models {
	interface ISiteLogosSettings {
		MedicineProductLogo: SCommerce.Core.FieldTypes.Interface.IImage;
		MedicineProductLogoForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		MedicineProductLogoLink: SCommerce.Core.FieldTypes.Interface.ILink;
		VarefaktaKontrolleretLogo: SCommerce.Core.FieldTypes.Interface.IImage;
		VarefaktaKontrolleretLogoForJson: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		VarefaktaKontrolleretLogoLink: SCommerce.Core.FieldTypes.Interface.ILink;
	}
	interface SettingsViewModel {
		ActivateUserPageUrl: string;
		BasketPageUrl: string;
		BuildVersion: string;
		CombinedProductsAndSitecoreTimestamp: string;
		CreateUserPageUrl: string;
		CustomerServicePageUrl: string;
		DeliveryZoneId: number;
		HomePageTitle: string;
		LoginPageUrl: string;
		MyNemligOrderHistoryPageUrl: string;
		MyNemligPageUrl: string;
		MyNemligPrintFriendlyPageUrl: string;
		NotFoundUrl: string;
		OrderConfirmationUrl: string;
		ProductsImportedTimestamp: string;
		ResetPasswordPageUrl: string;
		SalesforceSettings: SCommerce.Core.Salesforce.IChatSettingsModel;
		SitecorePublishedStamp: string;
		SiteLogosSettings: SCommerce.Website.SCom.Renderings.Layout.Models.ISiteLogosSettings;
		StaticResourcesPath: string;
		TimeslotBackgroundImage: SCommerce.Website.Code.FieldTypes.Model.ImageViewModel;
		TimeslotUtc: string;
		UserId: string;
		ZipCode: string;
	}
}
declare module System {
	interface Guid {
	}
}
declare module System.Collections.Generic {
	interface KeyValuePair<TKey, TValue> {
		Key: TKey;
		Value: TValue;
	}
}



