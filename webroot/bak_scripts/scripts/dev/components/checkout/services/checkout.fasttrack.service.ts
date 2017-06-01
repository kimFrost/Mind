///<reference path="../../../../references/references.ts"/>

/**
 * Created by MKI on 10/10/2016.
 */

namespace CheckoutModule {

	export class CheckoutFastTrackService {

		constructor(
			private checkoutService: CheckoutService){
		}


		/**
		 * @author MKI
		 * @description Sending data to prepareSubmitForm in settings object
		 * @param formData
		 * @private
		 */
		private _submitFastTrack(formData:CheckoutInterfaces.FormDataModel) {
			const FORM_NAME = 'fastTrack';
			this.checkoutService.prepareSubmitForm({FormName: FORM_NAME, FormData:formData});
		}

		/**
		 * @author MKI
		 * @description submits fast track
		 * @param formData
		 */
		public submitForm(formData:CheckoutInterfaces.FormDataModel) {
			this._submitFastTrack(formData);
		}

		/**
		 * @author MKI
		 * @description using another card and to checkout and set paymentCard to null
		 * @param formData
		 */
		public payWithAnotherCard(formData:CheckoutInterfaces.FormDataModel) {
			let modifiedFormData = CheckoutFastTrackService.setPaymentCardPropertyToNull(formData);
			this._submitFastTrack(modifiedFormData);

		}

		/**
		 * @author MKI
		 * @description Set PaymentCard property to null
		 * @param dataObject
		 * @returns {({}&any&{PaymentCard: null})|any}
		 */
		static setPaymentCardPropertyToNull(dataObject) {

			let defaultSettings = {
				PaymentCard: null
			};

			return angular.merge({}, dataObject, defaultSettings);
		}

	}

	angular.module(moduleId).service("checkoutFastTrackService", CheckoutFastTrackService);
}
