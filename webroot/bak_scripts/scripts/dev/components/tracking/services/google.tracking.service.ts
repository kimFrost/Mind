///<reference path="../../../../references/references.ts"/>


namespace TrackingModule {


	export class GoogleTrackingService {

		public trackingId: string = window['scom'].gtm.gtmId;
		public isEnabled:boolean = window['scom'].gtm.gtmEnabled;

		private firstLoad = true;

		private originalLocation = '';

		constructor(private $window: any,
					private loadscriptService:UtilsModule.LoadScriptService, 
					private xamarinService: XamarinModule.XamarinService, 
					private settingsService: PageModule.SettingsService)
		{
			this.$window.dataLayer = this.$window.dataLayer || [];
//			this.loadscriptService.loadScript("//www.googletagmanager.com/gtm.js?id=" + this.trackingId, true);
		
			if(sessionStorage.getItem('originalLocation')) {
				this.originalLocation = sessionStorage.getItem('originalLocation');
			} else {
				let url = document.location.protocol + '//' + document.location.hostname +
		                  document.location.pathname + document.location.search;

				this.originalLocation = url;

				try {
					sessionStorage.setItem('originalLocation', url);
				} catch(e) {
				}
			}

		}

		public flushDataLayer() {
			//we cannot just set to new array (as in dataLayer = []) because of the custom .push() method in GTM
			this.$window.dataLayer.length = 0;
		}

		public trackTiming(category:string, duration:number) {
			this.push({
				'event' : 'customTiming',
				category,
				duration
			});
		}

		private push(gtmDataLayerObj: any) {
			if (this.$window.dataLayer && this.isEnabled) {
				gtmDataLayerObj.platform = this.xamarinService.enabled ? 'app' : 'web';

				gtmDataLayerObj.loginStatus = this.settingsService.settings.UserId ? 'loggedin' : 'loggedout';

				if(this.settingsService.settings.UserId) {
					gtmDataLayerObj.uid = this.settingsService.settings.UserId;
				}


				this.$window.dataLayer.push(gtmDataLayerObj);
			} else {
				 console.log('dataLayer.push()', gtmDataLayerObj);
			}
		}

		private sanitizePromo(promo:any|any[], extension:Object = {}) {
			if(Array.isArray(promo)) {
				return promo.map((promo)=> {
					return this.sanitizePromo(promo, extension);
				});
			}
			return angular.merge({
				'id': (promo.Id || ((promo.TemplateName === 'advertisement' ? 'Annonce: ' : '') + promo.Name).replace(/ /g, '')),
				'name': (promo.TemplateName === 'advertisement' ? 'Annonce: ' : '') + promo.Name,
				'creative':promo.TemplateName
			}, extension);
		}

		private sanitizeProduct(product: any|any[], extension: Object = {}, namePrefix='') {
			if(Array.isArray(product)) {
				return product.map((product)=> {
					return this.sanitizeProduct(product, extension);
				});
			}

			return angular.merge({
				name: namePrefix + product.Name,
				id: product.Id,
				price: (product.ItemPrice || product.Price || '').toString(),
				brand: product.Brand,
				category: product.Category,
				quantity: product.Quantity || '',
				variant:(product.ItemPrice === 0) ? 'gave' : 'produkt'
			}, extension);

		}

		public trackCustomerService(linkText:string = '') {
			this.push({
				'event':'customerServiceLinkClick',
				'linkText': linkText
			});
		}

		public trackAddPostalCode(postalcode:Number = 0, deliverable:string) {
			this.push({
				'event':'addPostCode',
				'postalcode': postalcode.toString(),
				'deliverable': deliverable
			});
		}

		public trackProductDetailView(product) {
			this.push({
				'event':'detail',
				'ecommerce': {
					'detail': {
						'actionField': {'list': '' },
						'products': [this.sanitizeProduct(product)]
					}
				}
			});
		}

		public trackProductClick(product, extension, list='', namePrefix='', event:string = 'productclick') {
			this.push({
				event: event,
				'ecommerce':{
					'click': {
						actionField:{list},
						products:[this.sanitizeProduct(product,extension,namePrefix)]
					}
				}
			});
		}

		public trackProductView(products, list='',namePrefix='') {
			this.push({
				'event':'productimpressions',
				'ecommerce': {
					'impressions': products.map((product,index) => {
						return this.sanitizeProduct(product, {list, position:index+1}, namePrefix);
					})
				}
			});
		}

		private lastPagePush = {};

		public trackPageview(page: string, title:string, debitor="Ikke logget ind") {
			const push = {
				'event': "virtualPageView",
				'virtualPage': page,
				'pageTitle': title,
				'dimensionX': debitor,
				'type':'spa-page-load',
				'originalLocation':this.originalLocation
			};

			if(this.firstLoad) {
				push.type = 'full-page-load';
				this.firstLoad = false;
			}	

			if(angular.equals(this.lastPagePush, push)) {
				return;
			}

			this.push(angular.copy(push));
			this.lastPagePush = push;
		}

		public trackAddToBasket(product, quantity: number, location) {
			this.push({
				'event': 'addToCart',
				'ecommerce': {
					'currencyCode': 'DKK',
					'add': {
						'products': [this.sanitizeProduct(product, { quantity, dimension5: location })]
					}
				}
			});
		}

		public trackCheckout(step:number, products:any[], option?) {
			this.push({
				'event': 'checkout',
				'ecommerce': {
					'checkout': {
						'actionField': {step, option},
						'products':this.sanitizeProduct(products)
					}
				}
			});
		}

		public trackPurchase(object: any) {
			//Because of how ELEKS sends the data from basket to orderconfirmation we can't compared delivery address and invoice address objects
			//Therefore this 'hack' compares the address values in form of strings
			const invoiceAndDeliveryEquals = `${object.DeliveryAddress.StreetName} ${object.DeliveryAddress.HouseNumber} ${object.DeliveryAddress.HouseNumberLetter} ${object.DeliveryAddress.Floor} ${object.DeliveryAddress.Door} ${object.DeliveryAddress.PostalCode} ${object.DeliveryAddress.PostalDistrict}` === `${object.InvoiceAddress.StreetName} ${object.InvoiceAddress.HouseNumber} ${object.InvoiceAddress.HouseNumberLetter} ${object.InvoiceAddress.Floor} ${object.InvoiceAddress.Door} ${object.InvoiceAddress.PostalCode} ${object.InvoiceAddress.PostalDistrict}`;
			
			const lines = angular.copy(object.Lines);

			if(object.Recipes && object.Recipes.length) {
				object.Recipes.forEach(recipe => {
					lines.push({
						Name:recipe.Title,
						Id:recipe.Id,
						ItemPrice:0,
						Brand:'',
						Category:'Opskrift',
						Quantity:1

					});
				});
			}

			let couponString = '';
			if (object.Coupons) {
				for (let i = 0; i < object.Coupons.length; i++) {
					let coupon = object.Coupons[i];
					if (coupon) {
						couponString += coupon.Name;
					}
				}
			}

			this.push({
				'event':'purchase',
				'ecommerce': {
					'purchase': {
						'actionField': {
							'id': object.OrderNumber,
							'affiliation': invoiceAndDeliveryEquals ? 'Samme som faktureringsadresse' : 'Alternativ leveringsadresse',
							'revenue': object.TotalPrice,
							'tax': object.TotalPrice*.2,
							'shipping': object.DeliveryPrice,
							'coupon': couponString
						},
						'products': this.sanitizeProduct(lines)
					}
				}
			});
		}

		public trackRefund(orderNumber:string, refundType) {
			this.push({
				'event':'refund',
				'ecommerce': {
					'refund': {
						'actionField': { id: orderNumber }
					}
				},
				'refundType': refundType
			});
		}

		public trackRemoveFromBasket(product, quantity:number) {
			this.push({
				'event': "removeFromCart",
				'ecommerce': {
					'remove': {
						'products': [this.sanitizeProduct(product, { quantity })]
					}
				}
			});
		}

		public trackLogin(userId = 'n/a') {
			this.push({
				'event':'LoginStatusChanged',
				'loginStatus': 'loggedin',
				'uid': userId
			});
		}

		public trackLogout() {
			this.push({
				'event':'LoginStatusChanged',
				'loginStatus': 'loggedout'
			});
		}

		public trackPromoImpression(promos) {
			this.push({
				'event':'promoimpression',
				'ecommerce': {
					'promoView': {
						'promotions': promos.map((promo,index) => {
							return this.sanitizePromo(promo, { position: index+1 });
						})
					}
				}
			});
		}

		public trackPromoClick(promo,position) {
			this.push({
				'event':'promoclick',
				'ecommerce': {
					'promoClick': {
						'promotions': Array.isArray(promo)  ? this.sanitizePromo(promo, { 
							position: (position + 1 || undefined) 
						}) : [this.sanitizePromo(promo, { position: (position+1 || undefined) })]
					}
				}
			});
		}

	}

	angular.module(moduleId).service("googleTrackingService", GoogleTrackingService);

}
