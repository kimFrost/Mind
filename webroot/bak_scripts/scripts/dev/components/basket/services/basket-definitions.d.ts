declare module BasketInterfaces{
	type BasketLineViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketLineViewModel;

	interface IBasketGroupModel {
		Id: string;
		Title: string;
		Url:string;
		Lines: BasketLineViewModel[];
	}

	export interface IBasketStates {
		clearingBasket?: boolean;
		isBasketEmpty?: boolean;
		isLoggedIn: boolean;
		isBasketValidForCheckout: boolean;
		isDeliveryAddressEmpty: boolean;
		isTimeSlotSelected: boolean;
	}
}

