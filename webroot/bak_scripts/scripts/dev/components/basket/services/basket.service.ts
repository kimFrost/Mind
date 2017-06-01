///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 15/06/16.
 */


namespace BasketModule {

	export type BasketViewModel = SCommerce.Website.Code.WebAPI.Models.Basket.BasketViewModel;
	type RecipeProductSelectionViewModel = SCommerce.Website.Code.WebAPI.Models.Recipe.RecipeProductSelectionViewModel;

	const CHECKOUT_API_PATH = '/webapi/Checkout/';

	export class BasketService {

		public basket: BasketViewModel = {} as BasketViewModel;
		public basketGroups:BasketInterfaces.IBasketGroupModel[];
		public basketRecipes:BasketInterfaces.IBasketGroupModel[];
		public basketObservable:any;
		private observer;
		private basketUpdateSubscribers: Function[] = [];
		private updateProductSubjects = {};
		private translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};


		private basketStates = {
			clearingBasket: false,
			isBasketEmpty: true,
			isLoggedIn: false,
			isBasketValidForCheckout: false,
			isDeliveryAddressEmpty: true,
			isTimeSlotSelected: false
		} as BasketInterfaces.IBasketStates;


		constructor(
			private $http: ng.IHttpService,
			private $Ohttp: any,
			private $rootScope: ng.IRootScopeService,
			private $q: ng.IQService,
			private dialogService: DialogModule.DialogService,
			private settingsService:PageModule.SettingsService,
			private testConditionService: UtilsModule.TestConditionService,
			private trackingService: TrackingModule.TrackingService,
			private translationsService: TranslationsModule.TranslationsService,
			private userService: UserModule.UserService) {

			this.translations = this.translationsService.translations;

			this.basketObservable = new Rx.Observable.create((observer) => {
				this.observer = observer;
			}).publish();

			this.basketObservable.connect();

			this.updateBasketGroups();
			this._watchOnUserLoggedIn();
			this._watchOnBasket();
		}

		/* Private*/

		/**
		 * @author MKI
		 * @description Condition to test if an delivery address accepted
		 * @param isDeliveryAddressEmpty
		 * @returns {boolean}
		 */
		private _isDeliveryAddressAccepted(isDeliveryAddressEmpty:boolean = true):boolean {

			let conditions = [
				this.testConditionService.test.booleans.mayNotBeNull(isDeliveryAddressEmpty),
				this.testConditionService.test.booleans.isFalse(isDeliveryAddressEmpty)
			];

			return this.testConditionService.isAllConditionsTrue(conditions);
		}

		/**
		 * @author MKI
		 * @description When user log in/out the set login state and get new basket
		 * @private
		 */
		private _watchOnUserLoggedIn() {

			this.$rootScope.$watch(() => {
				return this.userService.states.isLoggedIn;
			}, (isLoggedIn) => {
				this._setStateIsLoggedIn(isLoggedIn);
				this.get();
			});
		}

		/**
		 * @author MKI
		 * @description angular watch that triggers when basket changes
		 * @private
		 */
		private _watchOnBasket() {

			this.$rootScope.$watch(() => {
				return this.basket;
			}, (basket) => {

				let basketHasProperties = this.testConditionService.test.objects.hasProperties(basket);

				if (basketHasProperties) {

					let itemsInBasket = basket.Lines;
					let isBasketEmpty = BasketService.isBasketEmpty(itemsInBasket);
					let isTimeSlotSelected = basket.DeliveryTimeSlot.Reserved;
					let isDeliveryAddressEmpty = basket.DeliveryAddress.IsEmptyAddress;

					// Setting new states from basket
					this._setStateIsBasketEmpty(isBasketEmpty);
					this._setStateIsTimeSlotSelected(isTimeSlotSelected);
					this._setStateIsDeliveryAddressEmpty(isDeliveryAddressEmpty);

					this._setValidationForProceedingPayment(isTimeSlotSelected, isDeliveryAddressEmpty);
					this.updateBasketGroups();
				}

			});
		}

		/**
		 * @author MKI
		 * @description Setting the state is basket has validated true for proceeding to checkout section
		 * @param val
		 * @private
		 */
		private _setStateIsBasketValidForCheckout(val:boolean = false):void {
			this.basketStates.isBasketValidForCheckout = val;
		}

		/**
		 * @author MKI
		 * @description Set the state if user has a empty delivery address
		 * @param val
		 * @private
		 */
		private _setStateIsDeliveryAddressEmpty(val:boolean = true):void {
			this.basketStates.isDeliveryAddressEmpty = val;
		}


		/**
		 * @author MKI
		 * @description Set the state if user has selected a time slot
		 * @param val
		 * @private
		 */
		private _setStateIsTimeSlotSelected(val:boolean = false):void {
			this.basketStates.isTimeSlotSelected = val;
		}



		/**
		 * @author MKI
		 * @description Set the state if the user is logged in
		 * @param val
		 * @private
		 */
		private _setStateIsLoggedIn(val:boolean = false):void {
			this.basketStates.isLoggedIn = val;
		}

		/**
		 * @author MKI
		 * @description Set the state if basket is empty
		 * @param val
		 * @private
		 */
		private _setStateIsBasketEmpty(val:boolean = true):void {
			this.basketStates.isBasketEmpty = val;
		}


		/**
		 * @author MKI
		 * @param isTimeSlotSelected
		 * @param isDeliveryAddressEmpty
		 * @private
		 */
		private _setValidationForProceedingPayment(isTimeSlotSelected:boolean = false, isDeliveryAddressEmpty:boolean = true):void{

			let conditions = [
				BasketService.isTimeSlotSelected(isTimeSlotSelected),
				this._isDeliveryAddressAccepted(isDeliveryAddressEmpty)
			];

			let allConditionsIsTrue = this.testConditionService.isAllConditionsTrue(conditions);

			this._setStateIsBasketValidForCheckout(allConditionsIsTrue);
		}


		/*Public */


		/**
		 * @author MKI
		 * @description Returning the states
		 * @returns {BasketInterfaces.IBasketStates}
		 */
		public getStates() {
			return this.basketStates;
		}


		/**
		 * @author MKI
		 * @description opens dialog box that kicks off check-zip-code-or-login component
		 */
		public openCheckZipCodeOrLogin():void {

			let className = 'check-zipCode-or-login-modal';
			let componentName = '<check-zip-code-or-login></check-zip-code-or-login>';

			const dialogSettings = {
				header: this.translations.Checkout.CheckZipCodeOrLogin.DialogHeadline,
				content: `<div class="${className}">${componentName}</div>`,
				close: true,
				size: 'small'
			};

			this.dialogService.openDialog(dialogSettings);
		}

		public publishBeforeBasketUpdate() {
			this.$rootScope.$broadcast('BASKET_UPDATED');
		}




		// Basket update publisher
		// ---------------------
		// Publish changes in address object
		public publishBasketUpdate() {

			const subscriberArray = this.basketUpdateSubscribers;
			for (let i = 0, iMax = subscriberArray.length; i < iMax; i++) {
				subscriberArray[i]();
			}
		}

		// Subscribe to address changes
		public subscribeBasketUpdate(handler: Function) {
			this.basketUpdateSubscribers.push(handler);
		}

		public updateBasketGroups() {
			this.basketGroups = [];
			if (!Array.isArray(this.basket.Lines)) {
				return;
			}
			this.basket.Lines.forEach((line) => {
				let found = false;
				this.basketGroups.forEach((group) => {
					if (group.Title === line.MainGroupName) {
						found = true;
						group.Lines.push(line);
					}
				});
				if (!found) {
					let group = {} as BasketInterfaces.IBasketGroupModel;
					group.Title = line.MainGroupName;
					group.Lines = [];
					group.Lines.push(line);
					this.basketGroups.push(group);
				}
			});
			//~~ Recipes ~~//
			this.basketRecipes = [];
			if (!Array.isArray(this.basket.Recipes)) {
				return;
			}
			this.basket.Recipes.forEach((recipe) => {
				let group = {} as BasketInterfaces.IBasketGroupModel;
				group.Id = recipe.Id;
				group.Title = recipe.Title;
				group.Url = recipe.Url;
				group.Lines = [];
				recipe.ProductIds.forEach((productId) => {
					this.basket.Lines.forEach((line) => {
						if (line.Id === productId) {
							group.Lines.push(line);
						}
					});
				});

				// Only push groups that have products
				if (group.Lines.length) {
					this.basketRecipes.push(group);
				}
			});
		}

		public productQuantityInBasket(productId: string) {
			var quantity = 0;
			if (this.basket.Lines !== undefined) {
				this.basket.Lines.forEach((line) => {
					if (line.Id === productId) {
						quantity = line.Quantity;
						return;
					}
				});
			}
			return quantity;
		}

		private update(basket: BasketViewModel, changes: Array<string> = null) {
			this.basket = basket;
			
			// Catch custom basket errors
			if(this.basket.ValidationFailures.length > 0) {
				var errorList = "";
				this.basket.ValidationFailures.forEach( (errors) => {
					var errorGroup = "";
					if(errors.Header !== null) {
						errorGroup += `<b>${errors.Header}</b>`;
					}
					errors.Messages.forEach( (error) => {
						errorGroup += `<div>${error}</div>`;
					});
					errorList += `<div class="dialog__error-group">${errorGroup}</div>`;
                });
				const errorDialogSettings = {
					header: this.translationsService.translations.Basket.ErrorDialog.Title,
                    content: `<div><div>${errorList}</div></div>`,
					close: true,
					size: 'small'
				} as DialogModule.IDialogSettings;
				this.dialogService.openDialog(errorDialogSettings);
			}

			this.settingsService.settings.ZipCode = this.basket.DeliveryAddress.PostalCode > 0 ? this.basket.DeliveryAddress.PostalCode.toString():"";

			// Publish basket data
			this.publishBasketUpdate();
			this.updateBasketGroups();
			this.observer.onNext(changes);
		}

		public get(): ng.IPromise<BasketViewModel> {
			let defer = this.$q.defer();
			this.$http({ method: 'GET', url: '/webapi/basket/' + 'GetBasket' }).then((response) => {
				this.update(response.data as BasketViewModel, null);
				this.$rootScope.$emit("BASKET_READY_TRACKING");
				defer.resolve(this.basket);
			}, (response) => {
				console.log("ERROR: ", response);
				defer.reject(this.basket);
			});
			return defer.promise;
		}

		public updateProduct(productId: string, quantity: number, position = ''):void {
			if(!this.updateProductSubjects[productId]) {
				this.updateProductSubjects[productId] = new Rx.Subject();
				this.updateProductSubjects[productId]
					.flatMapLatest(quantity => {
						this.publishBeforeBasketUpdate();
						return this.$Ohttp({
							method: 'POST',
							url: '/webapi/basket/' + 'AddToBasket',
							data: {
								productId: productId,
								quantity: quantity
							}
						})
						.catch(() => {
							return Rx.Observable.empty();
						});
					})
					.subscribe(response => {
						let responseProduct = response.data.Lines.filter(line=>line.Id ===productId)[0];
						let basketProduct = this.basket.Lines.filter(line=>line.Id ===productId)[0];
						let quantityDelta = (responseProduct ? responseProduct.Quantity : 0) - (basketProduct ? basketProduct.Quantity : 0);

						this.trackingService.updateBasket(responseProduct ? responseProduct : basketProduct, quantityDelta, position);
						this.update(response.data as BasketViewModel, [productId]);
					});
			}

			this.updateProductSubjects[productId].onNext(quantity.toString());
		}

		private _setStateclearingBasket(value:boolean = false){
			this.basketStates.clearingBasket = value;
		}


		public clearBasket = () => {
			let defer = this.$q.defer();

			this._setStateclearingBasket(true);

			this.$http({ method: 'GET', url: '/webapi/basket/' + 'ClearBasket' }).then((response) => {
				this.update(response.data as BasketViewModel);
				this._setStateclearingBasket(false);
				defer.resolve(this.basket);
			}, (response) => {
				console.log("ERROR: ", response);
				this._setStateclearingBasket(false);
				defer.reject(this.basket);
			});

			return defer.promise;
		};

		/**
		 * @author MKI
		 * @description Test method to view if Credit Card Fee selector should be visible
		 * @returns {boolean}
		 */
		public displayCreditCardFeeSelector() {

			let { CreditCardId, PaymentMethod} = this.basket;
			let {isLoggedIn} = this.basketStates;

			if(isLoggedIn){
				return this._conditionsForFeeSelectorLoggedIn(isLoggedIn, CreditCardId, PaymentMethod);
			}else{
				return this._conditionsForFeeSelectorAnonymous(isLoggedIn);
			}
		}

		/**
		 * @author
		 * @description Conditions for showing CreditCard Fee selector for Logged in user
		 * @param isLoggedIn
		 * @param savedCreditCard
		 * @param paymentMethod
		 * @returns {boolean}
		 * @private
		 */
		private _conditionsForFeeSelectorLoggedIn(isLoggedIn, savedCreditCard, paymentMethod) {

			const paymentIsCreditCard = 0;

			let conditions = [
				// User must be logged in
				this.testConditionService.test.booleans.isTrue(isLoggedIn),
				//User must not have any saved cards
				this.testConditionService.test.isUnDefined(savedCreditCard),
				//Payment has to be credit Card
				this.testConditionService.test.numbers.isNumberEqual(paymentIsCreditCard, paymentMethod)
			];

			return this.testConditionService.isAllConditionsTrue(conditions);
		}

		/**
		 * @author MKI
		 * @description Conditions for showing CreditCard Fee selector for anonymous user
		 * @param isLoggedIn
		 * @returns {boolean}
		 * @private
		 */
		private _conditionsForFeeSelectorAnonymous(isLoggedIn) {
			let conditions = [
				// User may not be logged in
				this.testConditionService.test.booleans.isFalse(isLoggedIn)
			];

			return this.testConditionService.isAllConditionsTrue(conditions);
		}


		public addRecipeWithDefaults(recipeId: string, servings: number, sorting: string): ng.IPromise<BasketViewModel> {
			let defer = this.$q.defer();
			
			this.publishBeforeBasketUpdate();
			this.$http({ method: 'GET', url: `/webapi/Basket/AddRecipeToBasket?recipeId=${recipeId}&NumberOfPeople=${servings}&sorting=${sorting}` }).then((response) => {

				this.trackingService.addRecipe(recipeId,[],response.data['Recipes'].filter(rec=>rec.Id === recipeId)[0].Title, true);

				this.update(response.data as BasketViewModel);
				defer.resolve(this.basket);
			}, (response) => {
				console.log("ERROR: ", response);
				defer.reject(this.basket);
			});
			return defer.promise;
		}

		public updateRecipeWithProducts(recipeId: string,
			products: Array<RecipeProductSelectionViewModel>,
			supplementViewModelProducts: Array<RecipeProductSelectionViewModel>,
			soldoutViewModelProducts: Array<RecipeProductSelectionViewModel>,
			servings: number): ng.IPromise<BasketViewModel> {

			this.publishBeforeBasketUpdate();

			let defer = this.$q.defer();
			// TODO: Add params
			let selectedProducts = [];
			let soldOutProducts = [];
			let supplementProducts = [];

			products.forEach((productData) => {
				let quantity = productData.Product !== null ? productData.Product.AmountForCurrentRecipe : "";
				let productId = productData.Product !== null ? productData.Product.Id : "";

				selectedProducts.push({
					ProductSelectionId: productData.ProductSelectionId,
					ProductSelectionName: productData.Title,
					ProductId: productId,
					Quantity: quantity
				});
			});
			supplementViewModelProducts.forEach((productData) => {
				let productId = productData.Product !== null ? productData.Product.Id : "";
				supplementProducts.push({
					ProductSelectionId: productData.ProductSelectionId,
					ProductSelectionName: productData.Title,
					ProductId: productId
				});
			});

			soldoutViewModelProducts.forEach((productData) => {
				soldOutProducts.push({
					ProductSelectionId: productData.ProductSelectionId,
					ProductSelectionName: productData.Title,
				});
			});

			// console.log(selectedProducts);
			// console.log(soldOutProducts);
			// console.log(supplementProducts);
			const data = {
				RecipeId: recipeId,
				NumberOfPeople: servings,
				SelectedProducts: selectedProducts,
				SoldoutProducts: soldOutProducts,
				SupplementProducts: supplementProducts
			};
			this.$http({ method: 'POST', data: data, url: '/webapi/basket/' + 'AddRecipeToBasket' }).then((response) => {
				this.update(response.data as BasketViewModel);
				defer.resolve(this.basket);
			}, (response) => {
				console.log("ERROR: ", response);
				defer.reject(this.basket);
			});
			return defer.promise;
		}

		public removeRecipe(recipeId: string): ng.IPromise<BasketViewModel> {
			let defer = this.$q.defer();
			
			this.publishBeforeBasketUpdate();
			
			this.$http({ method: 'GET', url: '/webapi/basket/' + 'RemoveRecipeFromBasket?recipeId=' + recipeId }).then((response) => {
				this.update(response.data as BasketViewModel);
				defer.resolve(this.basket);
			}, (response) => {
				console.log("ERROR: ", response);
				defer.reject(this.basket);
			});
			return defer.promise;
		}

		public removeCoupon(recipeId: string): ng.IPromise<BasketViewModel> {
			let defer = this.$q.defer();

			this.publishBeforeBasketUpdate();

			this.$http({ method: 'GET', url: '/webapi/basket/' + 'removeCoupon' }).then((response) => {
				this.update(response.data as BasketViewModel);
				defer.resolve(this.basket);
			}, (response) => {
				console.log("ERROR: ", response);
				defer.reject(this.basket);
			});
			return defer.promise;
		}

		public addCreditCard(creditCardId: Number): ng.IPromise<BasketViewModel> {
			let defer = this.$q.defer();
			this.$http({
				method: 'POST',
				url: CHECKOUT_API_PATH + 'AddCardToBasket',
				data: { creditCardId }
			}).then((response) => {
				this.update(response.data as BasketViewModel);
				defer.resolve(this.basket);
			}, (err) => {
				console.log("ERROR: ", err);
				defer.reject(this.basket);
			});
			return defer.promise;
		}


		/**
		 * @author MKI
		 * @ Check if basket collection is empty
		 * @param collection
		 * @returns {boolean}
		 * TODO May be removed
		 */
		static isBasketEmpty(collection:Array<any> = []):boolean {
			return collection.length <= 0;
		}



		/**
		 * @author MKI
		 * @description Condition to test if user has a selected time slot
		 * @param hasSelectedTimeSlot
		 * @returns {boolean}
		 */
		static isTimeSlotSelected(hasSelectedTimeSlot:boolean = false):boolean {

			if(!hasSelectedTimeSlot){
				hasSelectedTimeSlot = false;
			}

			return hasSelectedTimeSlot === true;
		}




	}


	angular.module(moduleId).service("basketService", BasketService);
}
