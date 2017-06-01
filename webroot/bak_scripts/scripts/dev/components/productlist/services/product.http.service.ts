///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 06/12/16.
 */

namespace ProductlistModule {

	type ProductListItemViewModel = SCommerce.Website.Code.WebAPI.Models.Product.ProductListItemViewModel;

	export class ProducHttpService {
		constructor(private $q: ng.IQService,
			private settingsService: PageModule.SettingsService,
			private $http: ng.IHttpService) {
		}

		public update(product): ng.IPromise<any> {
			var defer = this.$q.defer();
			
			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId;
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const productsImportedTimestamp = siteSettings.ProductsImportedTimestamp;
			const productUrl: string = `/webapi/${productsImportedTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Products/Get?id=${product.Id}`;
			
			this.$http({
				method: 'GET',
				url: productUrl
			}).then((response) => {

				angular.merge(product, response.data);
				defer.resolve(product);

			}).finally(() => {
				defer.reject();
			});

			return defer.promise;
		}


	}
	angular.module(moduleId).service("productHttpService", ProducHttpService);
}