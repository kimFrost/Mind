///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 01-08-2016.
 */

namespace CheckoutModule {
	import TranslationsService = TranslationsModule.TranslationsService;

	import ValidationGroup = Nemlig.Models.ValidationGroup;

	type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;
	type ValidationFailureViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.ValidationFailureViewModel;

	type ValidateFormService = UtilsModule.ValidateFormService;


	export class CheckoutStates {
		Agreements: Object = {
			ShowMinimumAgeRequired: false
		};
		InvoiceAddressIsDeliveryAddress: boolean = true;
		IsAuthorized: boolean = false;
		IsPending: boolean = false;
		MinimumAgeForBasket: number = 0;
		PaymentMethod: string = 'Pending';
		SelectedPaymentCard = null;
		GotoCheckoutButtonHasBeenClicked: boolean = false;
		ShowDeliverySection: boolean = false;
		ShowMessageToDriver: boolean = false;
		ShowPasswordForPayment: boolean = false;

		constructor(){}
	}

	export class User {
		DeliveryAddress: Object = {};
		FormattedDeliveryTime: string = null;
		Email: string = null;
		MessageToDriver: string = null;

		constructor(){}
	}

	export class CheckoutService {
		public isCheckoutActive = false;
		private formData = {} as CheckoutInterfaces.FormDataModel;
		private orderConfirmationPageUrl:string;
		public state = new CheckoutStates() as CheckoutInterfaces.StateModel;
		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public user = new User()as CheckoutInterfaces.UserModel;


		// Keep a local basket to update in checkout components
		public basketData = this.basketService.basket;

		constructor(
			private $log,
			private $rootScope,
			private $timeout: ng.ITimeoutService,
			private basketService: BasketModule.BasketService,
			private checkoutHelperService: HelperService,
			private checkoutHttpService: CheckoutHttpService,
			private dialogService: DialogModule.DialogService,
			private generalUtilService: UtilsModule.GeneralUtilService,
			private mergeOrderService: MergeOrderService,
			private paymentService: PaymentModule.PaymentService,
			private scrollService: UtilsModule.ScrollService,
			private settingsService: PageModule.SettingsService,
			private testConditionService: UtilsModule.TestConditionService,
			private timeslotDialogService:TimeslotModule.TimeslotDialogService,
			private timeslotStateService:TimeslotModule.TimeslotStateService,
			private trackingService: TrackingModule.TrackingService,
			private translationsService: TranslationsService,
			private validateFormService: ValidateFormService,
			private userService:UserModule.UserService) {
			this.translations = translationsService.translations;
			this.orderConfirmationPageUrl = this.settingsService.settings.OrderConfirmationUrl;
			this._watchOnUserStates();
			this._watchOnBasket();
			this._watchOnTimeslotUpdate();
			this._watchOnDontMergeOrders();
			this._watchOnTimeslotTimezone();
		}

		/**
		 * @author TTH
		 * @description Watch timeslot deliveryZone object to update it accordingly
		 */
		private _watchOnTimeslotTimezone() {
			this.$rootScope.$on('deliveryZone_UPDATED', (ev, deliveryZone) => {
				this.user.DeliveryAddress = deliveryZone;
			});
		}


		/**
		 * @author MKI
		 * @description watch for changes on the user and set Logged in state
		 * @private
		 * TODO can be listen on isLoggedIn
		 */
		private _watchOnUserStates() {
			this.$rootScope.$watch(() => {
				return this.userService.states;
			}, () => {
				this._setStateIsAuthenticated(this.userService.states.isLoggedIn);
			}, true);
		}

		/**
		 * @author MKI
		 * @description Watch for basket changes
		 * @private
		 */
		private _watchOnBasket() {
			this.$rootScope.$watch(() => {
				return this.basketService.basket;
			}, (basket: BasketViewModel) => {

				let basketHasLoaded = this.testConditionService.test.objects.hasProperties(basket);
				if(basketHasLoaded) {
					this._onBasketChange(basket);
				}
			}, true);
		}

		/**
		 * @author MKI
		 * @description
		 * @param basket
		 * @private
		 */
		private _onBasketChange(basket:BasketViewModel):void {

			const MINIMUM_AGE = 0;
			let minimumAgeForPlacingOrder = basket.MinimumAgeRequired || MINIMUM_AGE;
			let showMinimumAge = this._isMinimumAgeValidFormat(minimumAgeForPlacingOrder);

			// Update basket and view
			this.basketData = basket;
			let minimumBasketValueReached = this.basketData.IsMinTotalValid;
			let maximumBasketValueReached = !this.basketData.IsMaxTotalValid;
			// Make sure that Checkout step is hidden if basket minimum and maximum values are not valid
			if (!minimumBasketValueReached || maximumBasketValueReached) {
				this.showDeliveryInformation(false);
			}

			// Show or hide agreements form minimum age component
			this._setStateMinimumAgeRequired(showMinimumAge);

			// Set minimum age for placing a order with Basket items.
			this._setStateMinimumAgeForBasket(minimumAgeForPlacingOrder);

			this._updatePaymentMethod(basket.PaymentMethod);

			// Set Conditions for showing the password input for continue payment
			this._isPasswordFieldIsRequiredForPayment();

			// Update the user object with information from the basket
			this._updateUserInformation({
				DeliveryAddress: basket.DeliveryAddress,
				FormattedDeliveryTime: basket.FormattedDeliveryTime,
				Email: basket.Email,
				MessageToDriver: basket.Notes
			});
		}

		/**
		 * @author MKI
		 * @description Setting the state of SelectedPaymentCard
		 * @param val
		 * @private
		 */
		public _setStateSelectedPaymentCard(val:Object = {}):void {
			this.state.SelectedPaymentCard = val;
		}

		/**
		 * @author MKI
		 * @description Conditions for showing the password field on payment and set the ShowPasswordInput state
		 * @private
		 */
		private _isPasswordFieldIsRequiredForPayment():void{
			let paymentMethod = this.state.PaymentMethod;
			let selectedPaymentCard = this.state.SelectedPaymentCard;

			let conditions = [
				this._doesPaymentTypeRequirePassword(paymentMethod)
			];

			let paymentTypeIsCard = this.testConditionService.test.strings.mustMatch(paymentMethod, 'PaymentCard');
			if(paymentTypeIsCard){

				let hasSavedCards = this.testConditionService.test.isDefined(selectedPaymentCard);

				if (hasSavedCards) {
					conditions.push(true);
				} else {
					conditions.push(false);
				}
			}

			let usePasswordForPayment = this.testConditionService.isAllConditionsTrue(conditions);
			this._setStateShowPasswordForPayment(usePasswordForPayment);
		}


		/**
		 * @author MKI
		 * @description Does this payment method require a password box
		 * @param paymentMethod
		 * @returns {boolean}
		 * @private
		 */
		private _doesPaymentTypeRequirePassword(paymentMethod:string = ''):boolean{

			let paymentRequiresPasswordArray = [
				'ElectronicInvoice',
				'Giro',
				'PaymentCard',
				'DeliveryService'
			];

			return this.testConditionService.test.arrays.inArray(paymentMethod, paymentRequiresPasswordArray);
		}



		/**
		 * @author TTH
		 * @description When time slot is updated, we want to initiate the delivery step
		 */
		private _watchOnTimeslotUpdate(): void {

			this.$rootScope.$on('timeslotUpdate_SUCCESS', () => {
				let isTimeSlotSelected = this.basketService.basket.DeliveryTimeSlot.Reserved;

				if (isTimeSlotSelected && this.state.GotoCheckoutButtonHasBeenClicked) {
					this.showDeliveryInformation(true);
				}

				if (this.state.GotoCheckoutButtonHasBeenClicked) {
					this.showDeliveryInformation(true);
				}
			});
		}


		/**
		 * @author MKI
		 * @description Listen on "DONT_MERGE_ORDERS" and set property not to check for orders to merge
		 * @private
		 */
		private _watchOnDontMergeOrders() {
			this.$rootScope.$on('DONT_MERGE_ORDERS', () =>{
				let checkForOrdersToMerge = false;
				this._placeOrderForFastTrack(this.formData, checkForOrdersToMerge);
			});
		}


		/**
		 * @author MKI
		 * @description Placing the order for Fast Track checkout
		 * @param FastTrackFormData
		 * @param checkForOrdersToMerge
		 * @private
		 */
		private _placeOrderForFastTrack(FastTrackFormData, checkForOrdersToMerge:boolean = true):void {

			if(!checkForOrdersToMerge){
				FastTrackFormData.CheckForOrdersToMerge = false;
			}

			this._setStateIsPending(true);

			this.checkoutHttpService.placeOrderLoggedIn(FastTrackFormData)
				.then(this._placedOrderLoggedInSuccessFull)
				.catch(this._placedOrderLoggedInFailed)
				.finally(() => { this._setStateIsPending(false);});
		}

		/**
		 * @author MKI
		 * @description Placed order has been successful. Then is checks for merging order or proceed to payment action
		 * @param basket
		 * @private
		 */
		private _placedOrderLoggedInSuccessFull = (basket) =>{

			let otherOrders = basket.OrdersToMergeWith;

			let conditions = [
				this.mergeOrderService.hasUserPlacedMultipleOrders(otherOrders)
			];

			// Is every conditions for Merge Orders Fulfilled?
			let isEveryConditionsTrue = this.testConditionService.isAllConditionsTrue(conditions);

			if(isEveryConditionsTrue){
				this._askUserToMergedOrders(otherOrders);
			}else{
				this.proceedWithPaymentAction(basket);
			}
		};


		/**
		 * @author MKI
		 * @description When Placing order when logged in
		 * @param response
		 * @private
		 * TODO this is not DRY
		 */
		private _placedOrderLoggedInFailed = (response) => {

			let basketHasErrors = this._isStatusFourHundred(response.status);

			if (basketHasErrors) {
				let paymentMethod = response.data.PaymentMethod;
				let validationFailures = response.data.ValidationFailures;

				let basketHasValidationMessages	= this._hasBasketValidationErrors(validationFailures);

				let checkForPaymentErrors = this._checkForPaymentErrors.bind(null, paymentMethod);

				if(basketHasValidationMessages){
					this._showValidationFailures(validationFailures)
						.then(checkForPaymentErrors)
							.then( () => {
								this.basketService.get();
							});
				}
			}
		};


		/**
		 * @author MKI
		 * @description Redirects user to payment Actions
		 * @param response
		 * @private
		 */
		private _placingOrderForAnonymousSuccessFull = (response) => {
			this.proceedWithPaymentAction(response);
		};


		/**
		 * @author MKI
		 * @description When Anonymous user placing orders has failed then check for validation & payment errors
		 * @param response
		 * @private
		 */
		private _placingOrderForAnonymousFailed = (response) => {

			let basketHasErrors = this._isStatusFourHundred(response.status);

			if(basketHasErrors){

				let paymentMethod = response.data.PaymentMethod;
				let validationFailures = response.data.ValidationFailures;

				let basketHasValidationMessages	= this._hasBasketValidationErrors(validationFailures);

				let checkForPaymentErrors = this._checkForPaymentErrors.bind(null, paymentMethod);

				if(basketHasValidationMessages){
					this._showValidationFailures(validationFailures)
						.then(checkForPaymentErrors)
							.then( () => {
								this.basketService.get();
							});
				}
			}

		};

		/**
		 * @author MKI
		 * @description Check if payment provider is down "PayWithGiroOneTime" and let LoggedIn users pay with Giro
		 * @param paymentMethod
		 * @private
		 */
		private _checkForPaymentErrors = (paymentMethod:number = 0) => {

			let isPaymentGiroOneTime = this._isPaymentGiroOneTime(paymentMethod);

			let loggedInConditions = [
				isPaymentGiroOneTime,
				this._isUserLoggedIn()
			];

			let anonymousConditions = [
				isPaymentGiroOneTime
			];

			let conditionForLoggedIn = this.testConditionService.isAllConditionsTrue(loggedInConditions);
			let conditionForAnonymous = this.testConditionService.isAllConditionsTrue(anonymousConditions);

			if(conditionForLoggedIn){
				this._issueWithPaymentProvider();
			}else if(conditionForAnonymous){
				this._issueWithPaymentProvider();
			}
		};

		/**
		 * @author MKI
		 * @description Check if paymentMethod is 5 "GiroOneTime"
		 * @param paymentMethod
		 * @returns boolean
		 * @private
		 */
		private _isPaymentGiroOneTime = (paymentMethod:number = 0) => {
			let giroOneTime = Vertica.Intervare.Model.Values.PaymentMethod.GiroOneTime;
			return this.testConditionService.test.numbers.isNumberEqual(paymentMethod, giroOneTime);
		};



		/**
		 * @author MKI
		 * @description Show a dialog modal with validation errors
		 * @param validationMessages
		 * @returns {ng.IPromise<any>}
		 * @private
		 */
		private _showValidationFailures(validationMessages:ValidationFailureViewModel[]) {

			let header = this.translations.Checkout.Payment.PaymentValidationHeadline;
			let template = this.checkoutHelperService.createValidationTemplate(validationMessages);

			if (validationMessages.length) {
				let validationMessage = validationMessages[0];
				switch(validationMessage.Group) {
					case ValidationGroup.ChangesToBasket: 
						header = this.translations.Checkout.Payment.PaymentValidationChangesToBasketHeadline;
						break;
					case ValidationGroup.Restrictions: 
						header = this.translations.Checkout.Payment.PaymentValidationRestrictionsHeadline;
						break;
				}
			}

			const dialogSettings = {
				header: header,
				content: template,
				close: false,
				size: 'large',
				appendClass: 'basket-validation-dialog',
				buttons: {
					button1: {
						text: this.translations.Checkout.Payment.PaymentValidationButton,
						confirm: true,
						callback: false
					}
				}
			} as DialogModule.IDialogSettings;

			return this.dialogService.openDialog(dialogSettings);
		}


		/**
		 * @author check if user is state is loggedIn
		 * @returns {boolean}
		 * @private
		 */
		private _isUserLoggedIn() {
			let isLoggedIn = this.state.IsAuthorized;
			return this.testConditionService.test.booleans.isTrue(isLoggedIn);
		}


		/**
		 * @author MKI
		 * @description Check if the error collection holds items or is empty
		 * @param errorCollection
		 * @returns boolean
		 * @private
		 */
		private _hasBasketValidationErrors(errorCollection:Array<any>):boolean {
			return this.testConditionService.test.arrays.hasArrayElements(errorCollection);
		}

		/**
		 * @author MKI
		 * @description Check if status code is equal to 400
		 * @param statusCode
		 * @returns boolean
		 * @private
		 */
		private _isStatusFourHundred(statusCode:number = 0):boolean{
			let validationStatus = 400;
			return this.testConditionService.test.numbers.isNumberEqual(statusCode, validationStatus);
		}


		/**
		 * @author MKI
		 * @description Opens DIBS payment window and redirects to order confirmation page
		 * @param basketResponse
		 * @private
		 */
		private _goToPaymentWindow(basketResponse){

			const ORDER_CONFIRMATION_PAGE_URL = this.settingsService.settings.OrderConfirmationUrl;

			this.paymentService.payWithNoCard()
				.then((validateBasket: any) => {
					this._goToOrderConfirmationPage(ORDER_CONFIRMATION_PAGE_URL, validateBasket.PreviousOrderNumber, validateBasket.PreviousBasketGuid, validateBasket.PreviousBasketId);})
				.catch( err => {
					this.$log.log(err);
				});
		};


		/**
		 * @author MKI / NNH
		 * @description Redirects user to another page
		 * @param URLPath
		 * @param orderNumber
		 * @param guid
		 * @private
		 */
		private _goToOrderConfirmationPage(URLPath:string, orderNumber, guid:string, basketId:number): void{

			let path = `${URLPath}?orderNumber=${orderNumber}&uniqueId=${guid}&basketId=${basketId}`;
			this.generalUtilService.goToUrl(path);
		}


		/**
		 * @author MKI
		 * @description Starting merging order procedure
		 * @param otherOrders
		 */
		private _askUserToMergedOrders(otherOrders:Array<any>):void{
			this.mergeOrderService.startMergeOrders(otherOrders);
		}



		/**
		 * @author MKI
		 * @description If minimumAge is null or 0 then return false
		 * @param minimumAge
		 * @returns {boolean}
		 * @private
		 */
		private _isMinimumAgeValidFormat(minimumAge:number = 0):boolean {
			return !(!minimumAge || minimumAge === 0);
		}


		/**
		 * @author MKI
		 * @description Get information about DIBS is down and show a dialog box
		 * @private
		 */
		private _issueWithPaymentProvider():void{

			this.checkoutHttpService.getPaymentProviderFailedInformation()
				.then((information) => {
					let header = this.translationsService.translations.Checkout.PayWithGiro.PaymentProviderFailed;
					this.checkoutHelperService.openDialog(information, {header});
				})
				.catch((err) => {
					let header = this.translationsService.translations.Checkout.PayWithGiro.PaymentProviderFailed;
					this.checkoutHelperService.openDialog(err, {header});
				});
		}



		/**
		 * @author
		 * @description Method to get and set states
		 * TODO can be refactored to return private methods that get and set
		 * @returns {{get: (()=>CheckoutInterfaces.StateModel), set: ((stateProperties:any)=>undefined)}}
		 * @private
		 */
		private _states(){
			return {
				get: () => {
					return this.state;
				},

				set: (stateProperties) => {
					let newProperties: Object = {};

					for (let prop in stateProperties) {

						let statePropertyName = prop;
						let statePropertyKey = stateProperties[statePropertyName];

						newProperties[statePropertyName] = statePropertyKey;
					}
					angular.merge(this.state, newProperties);
				}
			};
		}



		/**
		 * @author MKI
		 * @description Updates the User Object with new properties
		 * @param value
		 * @private
		 */
		private _updateUserInformation(value: Object): void {
			angular.merge(this.user, value);
		}


		/**
		 * @author MKI
		 * @description Set the state if "MinimumAgeRequired"
		 * @param value
		 * @private
		 */
		private _setStateMinimumAgeRequired(value:boolean = false):void {
			this._states().set({
				Agreements: {
					ShowMinimumAgeRequired: value
				}
			});
		}


		/**
		 * @author MKI
		 * @description Sets the state if, password input element should be visible 
		 * @param value
		 * @private
		 */
		private _setStateShowPasswordForPayment(value:boolean = false):void {
			this._states().set({
				ShowPasswordForPayment: value
			});
		}

		/**
		 * @author MKI
		 * @description Set state if user is Authenticated/Logged in
		 * @param authenticated
		 * @private
		 */
		private _setStateIsAuthenticated(authenticated:boolean = false):void {
			this._states().set({
				IsAuthorized: authenticated
			});
		}

		/**
		 * @author MKI
		 * @description Set and update the state PaymentMethod
		 * @param paymentName
		 * @private
		 */
		private _setStatePaymentMethod(paymentName:string = 'pending') {
			this._states().set({
				PaymentMethod: paymentName
			});
		}

		/**
		 * @author MKI
		 * @description Set and update the state IsPending
		 * @param value
		 * @private
		 */
		private _setStateIsPending(value:boolean = false) {
			this._states().set({
				IsPending: value
			});
		}

		/**
		 * @author MKI
		 * @description Set the minimum age state "MinimumAgeForBasket" for basket.
		 * @param minimumAge
		 * @private
		 */
		private _setStateMinimumAgeForBasket(minimumAge:number = 0):void {
			this._states().set({
				MinimumAgeForBasket: minimumAge
			});
		}



		/**
		 * @author MKI
		 * @description Convert the paymentMethod number to a name, and set the PaymentMethod state
		 * @param paymentMethod
		 * @private
		 */
		private _updatePaymentMethod(paymentMethod:number):void{

			let paymentName = this.checkoutHelperService.convertPaymentNumberToPaymentName(paymentMethod);
			this._setStatePaymentMethod(paymentName);

		}


		/**
		 * @author MKI
		 * @description Displays a modal box that user has typed a wrong password
		 * @private
		 */
		private _promptForWrongTypedPassword():void {
			let content = this.translations.Checkout.OrderPlacement.ConfirmationPasswordInvalid;
			let header = this.translations.Checkout.OrderPlacement.ConfirmationPasswordInvalidHeader;

			this.checkoutHelperService.openDialog(content, {header});
		}

		/**
		 * @author MKI
		 * @description test if the formName is 'fastTrack'
		 * @param formName
		 * @returns {boolean}
		 * @private
		 */
		private _isSubmittedFormFastTrack(formName:string):boolean {

			const FAST_TRACK_NAME = 'fastTrack';
			return this.testConditionService.test.strings.mustMatch(formName, FAST_TRACK_NAME);
		}


		/**
		 * @MST/MKI
		 * @description Decide action what to do when click "payment"
		 * @param basket
		 * @private
		 */
		private _decidePaymentAction(basket:BasketViewModel):void {
			switch(basket.OrderStepRequired) {
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.None:
					//	None = 0
					const ORDER_CONFIRMATION_PAGE_URL = this.settingsService.settings.OrderConfirmationUrl;
					let orderNumber = basket.PreviousOrderNumber;
					let basketGuid = basket.PreviousBasketGuid;
					let basketId = basket.PreviousBasketId;

					this._goToOrderConfirmationPage(ORDER_CONFIRMATION_PAGE_URL, orderNumber, basketGuid, basketId);
					break;
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.DeliveryTimeReservation:
					//	DeliveryTimeReservation = 1, Show time slot picker
					this.timeslotStateService.setTimeslotState(TimeslotModule.TimeslotStates.TimeslotSelector);
					break;
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.IdentityConfirmation: // Tell user that password was wrong
					//	IdentityConfirmation = 2, prompt user to confirm with password
					this._promptForWrongTypedPassword();
					break;
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.Payment: // Go to DIBS
					//	Payment = 3, Open payment window and Go to DIBS
					this._goToPaymentWindow(basket);
					break;
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.Basket: // Go to basket page
					//	Basket = 4, // FAil in basket, Show the basket
					this.scrollService.scrollToTop();
					break;
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.Order: // Only relevant on OrderConfirmation page
					// Basket = 5 Do nothing on checkout step
					break;
				case SCommerce.Website.Code.WebAPI.Models.Basket.OrderStepRequiredViewModel.PaymentForbidden: // Show giro popup
					//	GiroPayment = 6 // Problem with Payment provider show giro popup
					//this.giroService.issueWithPaymentProviderUseGiro();

					this._issueWithPaymentProvider();
					break;
			}
		}


		///////// PUBLIC /////////

		/**
		 * @author MKI
		 * @description Initialize the timeSlot change address dialog
		 */
		public changeDeliveryZone():void {
			this.timeslotDialogService.initCheckAddress();
		}

		/**
		 * @author MKI
		 * @description redirects to _decidePaymentAction
		 * @param basket
		 */
		public proceedWithPaymentAction(basket):void{
			this._decidePaymentAction(basket);
		}


		/**
		 * @author MKI
		 * @description Return the checkout states object Model
		 * @returns {CheckoutInterfaces.StateModel}
		 */
		public getStates() {
			return this.state;
		}

		/**
		 * @author TTH
		 * @description An indicator that we want to go to payment, if interrupted in flow. I.e. user needs to fill out 
		 * @param value
		 */
		public gotoPaymentFlowInitialiser(value:boolean) {
			if (value) {
				this._states().set({ GotoCheckoutButtonHasBeenClicked: true });
			} else {
				this._states().set({ GotoCheckoutButtonHasBeenClicked: false });
			}
		}


		/**
		 * @author MKI
		 * @description Set the state to show the delivery section in checkout and scroll user into the view
		 * @param value
		 */
		public showDeliveryInformation(value: boolean): void {
			if (this.isCheckoutActive) {
				if (value && this.state.GotoCheckoutButtonHasBeenClicked) {
					this._states().set({ ShowDeliverySection: value });

					// Apply timeout to make sure all elements that should be hidden or shown are taken into calculation
					this.$timeout(() => {
						this.scrollService.scrollToId('checkout');
					});
				}
				else if (!value && this.state.ShowDeliverySection) {
					this.scrollService.scrollToTop()
						.then(() => {
							this._states().set({ ShowDeliverySection: value });
						});
				} else {
					this._states().set({ ShowDeliverySection: value });
				}
			} else {
				this._states().set({ ShowDeliverySection: value });
			}
		}


		/**
		 * @author MKI
		 * @description Prepare the data for placing the order
		 * @param settings
		 */
		public prepareSubmitForm(settings:CheckoutInterfaces.PrepareSubmitDataModel){

			let submittedFormName = settings.FormName;
			let isFormFastTrack = this._isSubmittedFormFastTrack(submittedFormName);

			// Check if Settings.FormData has picked up data from input fields.
			if(settings.FormData){
				angular.merge(this.formData, settings.FormData);
			}

			// Check if Settings.ExtraFormData has been added from Dialog box. etc. Password
			if(settings.ExtraFormData){
				angular.merge(this.formData, settings.ExtraFormData);
			}

			this.trackingService.checkout(3, submittedFormName);

			if(isFormFastTrack){
				this._placeOrderForFastTrack(this.formData);
			} else {
				this._placeOrderForAnonymous(this.formData);
			}
		}


		/**
		 * @author MKI
		 * @description Placing the order the the anonymous checkout
		 * @param anonymousFormData
		 * @returns {IPromise<TResult>}
		 */
		public _placeOrderForAnonymous(anonymousFormData){

			this._setStateIsPending(true);

			this.checkoutHttpService.placeOrderNotLoggedIn(anonymousFormData)
				.then(this._placingOrderForAnonymousSuccessFull)
				.catch(this._placingOrderForAnonymousFailed)
				.finally(() => {this._setStateIsPending(false);});
		}


		/**
		 * @author MKI
		 * @description Validates the form and return condition if the form validates
		 * @param form
		 * @param scrollToError
		 * @returns {boolean}
		 */
		public isFormValid(form:ng.IFormController, scrollToError?: boolean):boolean {
			return this.validateFormService.validateForm(form, scrollToError);
		}


		/**
		 * @author MKI
		 * @description Toggle the state property for showing the delivery message to driver
		 * @param value
		 */
		public toggleStateShowMessageToDriver(value:boolean):void {
			value = !value;
			this._states().set({ShowMessageToDriver: value});
		}

		/**
		 * @author MKI
		 * @description Setting State and update conditions for showing password input when using payment
		 * @param selectedCard
		 */
		public updateSelectedPaymentCard(selectedCard:Object = {}):void {
			this._setStateSelectedPaymentCard(selectedCard);
			this._isPasswordFieldIsRequiredForPayment();
		}

		/* STATIC FUNCTIONS*/
	}

	angular.module(moduleId).service("checkoutService", CheckoutService);
}
