declare module PaymentInterfaces{

	interface ICreditCardModel {
		IsDefault: boolean;
		FeeInPercent: string;
		CardType: string;
		CardMask: string;
		CardExpirationInfo: string;
		CardExpirationYear: string;
		CardExpirationMonth: string;
		CardId: Number;
	}

	interface IOrderSummaryModel {
		OrderNumber: string;
		NumberOfProducts: number;
		TotalProductsPrice: number;
		NumberOfDeposits?: number;
		TotalDepositsPrice?: number;
		NumberOfBags?: number;
		TotalBagsPrice?: number;
		DeliveryPrice: number;
		TotalProductDiscountPrice?: number;
		NemligAccount?: number;
		CreditCardFee: number;
		TotalPrice: number;
	}

}

