///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 19-04-2016.
 */

namespace PageModule {

	export interface ISiteSettings extends SCommerce.Website.SCom.Renderings.Layout.Models.SettingsViewModel {
		CdnPath: string;
	}

	export class SettingsService {
		public settings: ISiteSettings;

		constructor($window) {

			// Set standard/fallback settings
			const fallbackTimestamp = "fallback-" + Math.random() * 10000;
			this.settings = {
				CdnPath: "",
				BuildVersion: "b1.0.0.0",
				HomePageTitle: "Forside",
				ProductsImportedTimestamp: fallbackTimestamp,
				SitecorePublishedStamp: fallbackTimestamp,
				CombinedProductsAndSitecoreTimestamp: fallbackTimestamp,
				LoginPageUrl: "",
				BasketPageUrl: "",
				CreateUserPageUrl: "",
				ResetPasswordPageUrl: "",
				ActivateUserPageUrl: "",
				MyNemligPageUrl: "",
				MyNemligOrderHistoryPageUrl:  "",
				MyNemligPrintFriendlyPageUrl:  "",
				NotFoundUrl: "",
				CustomerServicePageUrl: "",
				UserId: "",
				ZipCode: "",
				SalesforceSettings: null,
				TimeslotBackgroundImage: null,
				SiteLogosSettings: null,
				DeliveryZoneId: 1,
				TimeslotUtc: "",
				OrderConfirmationUrl: "",
				StaticResourcesPath: ""
			};

			var siteSettings = $window.siteSettings;
			if (siteSettings !== undefined && siteSettings !== null) {
				this.settings = angular.merge(this.settings, siteSettings);
			}
		}

		public updateSettings(settings) {
			this.settings = angular.merge(this.settings, settings);
		}

		public setTimeslotStart(timeslot: string) {
			this.settings.TimeslotUtc = timeslot;
		}

		public setDeliveryZoneId(deliveryZoneId: number) {
			this.settings.DeliveryZoneId = deliveryZoneId;
		}

		public setZipCode(zip: string) {
			this.settings.ZipCode = zip;
		}

		public setUserId(userid: string) {
			this.settings.UserId = userid;
		}


	}

	angular.module(moduleId).service("settingsService", SettingsService);
}
