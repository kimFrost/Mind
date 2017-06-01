/** Typings for Google Tag Manager using Enhanced Ecommerce (TSD currently have no typings for GTM).
 * @author: MAC
 * @link: https://developers.google.com/tag-manager/enhanced-ecommerce
 */
interface IGtmEnhancedEcommerce {
	// Local currency is optional.
	currencyCode?: string; 
	
	// Measures product impressions and also tracks a standard pageview for the tag configuration.
	// Product impressions are sent by pushing an impressions object containing one or more impressionFieldObjects.
	impressions?: IGtmImpressionFieldObject[];

	// Measure clicks on product links by pushing a click action to the data layer, along with a productFieldObject to represent the clicked product.
	click?: {
		actionField?: {
			list: string[]; // Optional list property.
		};
		products: IGtmProductFieldObject[];
	};

	// Measure a view of product details by pushing a detail action to the data layer, along with one or more productFieldObjects representing the products being viewed.
	detail?: {
		actionField?: {
			list: string[]; // detail actions have an optional list property.
		};
		products: IGtmProductFieldObject[];
	};

	// Measure adding a product to a shopping cart by using an 'add' actionFieldObject and a list of productFieldObjects.
	add?: {
		products: IGtmProductFieldObject[];
	}

	// Measure removing a product from a shopping cart by using a 'remove' actionFieldObject and a list of productFieldObjects.
	remove?: {
		products: IGtmProductFieldObject[];
	};

	// To measure a promotion impression, set the promoView key in your ecommerce data layer variable to a promoFieldObject that describes the promotions displayed to users on the page.
	promoView?: {
		promotions: IGtmPromoFieldObject[];
	}

	// To measure a click on a promotion, push the promoClick action to the data layer with an array containing a promoFieldObject describing the clicked promotion.
	promoClick?: {
		promotions: IGtmPromoFieldObject[];
	};

	// To measure the checkout process, which might include a checkout button and one or more checkout pages where users enter shipping and payment information, 
	// use the checkout action and the step field to indicate which stage of the checkout process is being measured.
	// You can also use the option field to provide a piece of additional data about the page, such as the payment type that was selected by the user.
	checkout?: {
		actionField: IGtmActionFieldObject;
		products: IGtmProductFieldObject[];
	};

	// The checkout option is useful in cases where you've already measured a checkout step but you want to capture additional information about the same checkout step.
	// For example, the shipping method selected by a user.
	// To measure this use the checkout_option action along with the step and option fields.
	checkout_option?: {
		actionField: IGtmActionFieldObject;
	};

	//Push your transaction details into the Data Layer using the purchase action, along with an event that will fire an enhanced ecommerce- enabled tag.
	purchase?: {
		actionField: IGtmActionFieldObject;
		products: IGtmProductFieldObject[];
	};

	// To measure a full refund of a transaction, push a refund actionFieldObject along with the transaction ID of the transaction being refunded.
	refund?: {
		actionField: IGtmActionFieldObject;
		products?: IGtmProductFieldObject[]; //Measure a partial refund by providing an array of productFieldObjects and specifying the ID and quantity of each product being returned.
	}
}

/** Product Field Object
* This object is used to store:
* - Product click data i.e.data of the product whose link was clicked in the product list.
* - Product details view data i.e.data of the product whose detail page was viewed.
* - Product Add to Cart data i.e.data of the products added to the shopping cart.
* - Product remove from Cart data i.e.data of the products removed from the shopping cart.
* - Checkout Steps data i.e.data of the products at each step of the checkout process.
* - Purchase data
* - Refund data
*/
interface IGtmProductFieldObject extends IGtmBaseProductFields {
	quantity?: number; // Product quantity
	coupon?: string; // Product coupon code
}

/** Impression Field Object
 * This object is used to store product list view data.
 */
interface IGtmImpressionFieldObject extends IGtmBaseProductFields {
	list?: string; // Product list
}

/** Action Field Object
 * This object is used to store action data. 
 * The action data is the data related to ecommerce action like: checkout, checkout option, purchase, refund etc.
 */
interface IGtmActionFieldObject {
	id?: string; // Transaction id 
	affiliation?: string; // Store name
	revenue?: number; // Total Revenue
	tax?: number; // Tax
	shipping?: number; // Shipping
	coupon?: string; // Order/Transaction coupon 
	list?: string; // Product list
	step?: number; // Number representing a step in the checkout process 
	option?: string; // Used to provide additional info about a checkout step like payment method used
}

/** Promo Field Object
 * This object is used to store impression and click data of internal promotion campaigns (like internal banner campaign).
 */
interface IGtmPromoFieldObject {
	id: string; // Promotion ID. Required
	name?: string; // Promotion name
	creative?: string; // Creative ad used for the promotion
	position?: string; // Position of the creative ad
}

/** Shared fields for Product Field Object and Impression Field Object.
 */
interface IGtmBaseProductFields {
	id?: string; // Product ID/SKU
	name?: string; // Product name
	category?: string; //Use / as a delimiter to specify up to 5 levels of hierarchy (e.g Men/Shirts/T-Shirts)
	brand?: string;  // Product brand
	variant?: string; // Variant of the product like color, size etc.
	price?: number; // Product price
	position?: number; // Product position in a list
}