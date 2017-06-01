
module Nemlig.Models {
	export enum ValidationGroup {
		Restrictions = 0,
		ChangesToBasket = 1
	}
}
module SCommerce.Core.FieldTypes.Interface {
	export enum LinkType {
		NotSet = 0,
		Anchor = 1,
		External = 2,
		JavaScript = 3,
		Internal = 4,
		MailTo = 5,
		Media = 6
	}
}
module SCommerce.Website.Code.Video.Model {
	export enum MediaType {
		Image = 0,
		Video = 1
	}
}
module SCommerce.Website.Code.WebAPI.Controllers {
	export enum NewsletterSubscriptionStatus {
		Subscribed = 0,
		AlreadySubscribed = 1,
		InvalidEmail = 2,
		Error = 3
	}
}
module SCommerce.Website.Code.WebAPI.Models.Basket {
	export enum OrderStepRequiredViewModel {
		None = 0,
		DeliveryTimeReservation = 1,
		IdentityConfirmation = 2,
		Payment = 3,
		Basket = 4,
		Order = 5,
		PaymentForbidden = 6
	}
}
module SCommerce.Website.Code.WebAPI.Models.Error {
	export enum ErrorCodes {
		MissingArguement = 0,
		MissingContextItem = 1,
		NotFound = 2,
		InvalidFormat = 3,
		UnauthorizedAccess = 4,
		ValidationError = 5,
		Error = 6,
		NoOrders = 7,
		OrderNotFound = 8,
		OrderCancellationNotAllowed = 9,
		UserNotActivated = 10,
		MemberNotFound = 11
	}
}
module Vertica.Intervare.DeliveryService {
	export enum TimeSlotAvailabilities {
		Available = 0,
		PastDeadline = 1,
		SoldOut = 2,
		NotActive = 3
	}
}
module Vertica.Intervare.Model.Values {
	export enum AccountPostingSubType {
		Delay = 0,
		PoorQuality = 1,
		Failure = 2,
		MissingItems = 3,
		BrokenProducts = 4,
		BadExperienceKs = 5,
		BadExperienceDriver = 6
	}
	export enum AccountPostingType {
		Compensation = 0,
		Transfer = 1,
		Correction = 2,
		Bottle = 3,
		Gift = 4,
		Reversal = 5,
		Competition = 6,
		TransferToBank = 7,
		Welcome = 8,
		Loyalty = 9,
		TakeAway = 10
	}
	export enum LockReasonCode {
		EnteredIncorrectly = 0,
		IsLocked = 1,
		HasUnpaidBills = 2,
		NoLongerUse = 3
	}
	export enum MemberType {
		Private = 0,
		Business = 1,
		Public = 5,
		PotentionalMember = 6
	}
	export enum PaymentMethod {
		Default = 0,
		Giro = 1,
		GiroOneTime = 5,
		ElektroniskFakturering = 2,
		Leverandørservice = 3,
		PayEx = 4
	}
}

