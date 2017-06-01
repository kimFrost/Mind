///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 19-04-2016.
 */

namespace PageModule {

	export class ContentService {
		public showLeft: boolean;
		public showFilter: boolean = false;

		private firstPageLoad = true;

		public content;

		public stateObj = {
			initialPageLoad: true,
			toUrl: "",
			fromUrl: ""
		};

		constructor(private $q: ng.IQService,
			private $http: ng.IHttpService,
			private $window,
			private $timeout: ng.ITimeoutService,
			private $location: ng.ILocationService,
			private $rootScope: any,
			private responsiveService:UtilsModule.ResponsiveService,
			private trackingService:TrackingModule.TrackingService,
			private xamarinService:XamarinModule.XamarinService,
			private statesService: UtilsModule.StatesService,
			private metadataService: MetaDataService,
			private settingsService: SettingsService) {
			
			$rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
				this.stateObj.toUrl = toParams.path;
				this.stateObj.fromUrl = fromParams.path;

				if (this.stateObj.fromUrl) {
					this.stateObj.initialPageLoad = false;
				}
			});
		}

		public getItem(url: string): ng.IPromise<any> {
			var dfd = this.$q.defer();

			if (this.firstPageLoad) {
				var firstPageData = this.$window.contentAsJson;
				this.xamarinService.firstPageLoaded();
				this.setPageData(firstPageData);
				dfd.resolve(firstPageData);
			} else {
				const siteSettings = this.settingsService.settings;
				const deliveryZoneId = siteSettings.DeliveryZoneId;
				const timeslotUtcParam = siteSettings.TimeslotUtc;
				const urlWithParams = url +
					(url.indexOf("?") >= 0 ? "&" : "?") +
					"GetAsJson=1&t=" +
					timeslotUtcParam +
					"&d=" +
					deliveryZoneId;
				this.$http({
					method: 'GET',
					url: urlWithParams
				})
				.then((response) => {
					this.setPageData(response.data);
					dfd.resolve(response.data);
				})
				.catch(() => {
					dfd.reject();
				});
			}
			this.firstPageLoad = false;
			return dfd.promise;
		}

		private setPageData(pageData) {
			if (this.metadataService.pageMetaData !== undefined && this.metadataService.pageMetaData !== null) {
				angular.merge(this.metadataService.pageMetaData, pageData.MetaData);
			} else {
				this.metadataService.pageMetaData = pageData.MetaData;
			}

			this.settingsService.updateSettings(pageData.Settings);

			this.content = pageData.content;
			this.$rootScope.pageTitle = this.metadataService.pageMetaData.PageTitle;

			var identifier = this.getTemplateIdentifier(this.metadataService.pageMetaData.TemplateId);
			this.setTemplatesStates(identifier);

			if(identifier === "loginpage" && this.$location.search().resetpassword !== "true") {
				this.xamarinService.loginRequested();
			}

			this.$rootScope.$broadcast("PAGE_CHANGED", this.metadataService.pageMetaData);

			this.xamarinService.navigated(this.metadataService.pageMetaData.Url, this.metadataService.pageMetaData.AuthenticationRequired, this.metadataService.pageMetaData.PageTitle);
			this.trackingService.pageVisit();

			// Updating mobile navigation state and content-overlay based on the AutoHideMobileNavigation property on page
			this.$timeout(() => {
				this.statesService.setState("nonFastTrackMode", pageData.MetaData.AutoHideMobileNavigation);
				if (pageData.MetaData.AutoHideMobileNavigation && this.responsiveService.responsiveState.device === 'mobile') {
					this.statesService.setState("mobileNavigation", false);
				}
			});

		}


		public setTemplatesStates(identifier) {

			if (identifier === "productdetailpage") {
				this.statesService.setState("leftmenu", true);
				this.statesService.setState("productPage", true);
				this.showFilter = false;
			} else if (identifier === "recipepage") {
				this.statesService.setState("leftmenu", true);
				this.statesService.setState("productPage", false);
				this.showFilter = true;
			} else if (identifier === "filterpage") {
				this.statesService.setState("leftmenu", true);
				this.statesService.setState("productPage", false);
				this.showFilter = true;
			}  else if (identifier === "favoritepage") {
				this.statesService.setState("leftmenu", false);
				this.statesService.setState("productPage", false);
				this.showFilter = true;
			} else if (identifier === "leftmenupage") {
				this.statesService.setState("leftmenu", true);
				this.statesService.setState("productPage", false);
				this.showFilter = false;
			} else if (identifier === "sitemappage") {
				this.statesService.setState("leftmenu", false);
				this.statesService.setState("productPage", false);
				this.showFilter = false;
			} else {
				this.statesService.setState("leftmenu", false);
				this.statesService.setState("sitemapPage", false);
				this.showFilter = false;
			}
		}

		public getTemplateIdentifier(templateId) {
			var identifier;

			switch (templateId) {
				case "572463cc-fbfa-4f41-acec-7f3acb9726de": // Productdetail page
					identifier = "productdetailpage";
					break;
				case "fe05775a-4609-4095-908e-298566f0082d": // Recipe page
					identifier = "recipepage";
					break;
				case "25997ff0-7455-4d0f-bd48-3de2f3a5c3d8": // Filter page
					identifier = "filterpage";
					break;
				case "7e4dbd3d-daf0-42e4-9c00-eab4d1a441ab": // Favorite page
					identifier = "favoritepage";
					break;
				case "5cbee633-ec7f-4911-99ac-2c7549f14671": // Leftmenu page
					identifier = "leftmenupage";
					break;
				case "45662b70-c564-4c38-b42e-1d1578d0b550": // Error page
					identifier = "errorpage";
					break;
				case "76598584-3853-4ed8-8181-36862669bb44": // Blank page
					identifier = "blankpage";
					break;
				case "c6b1359b-cc72-44d8-a8d7-4c11e39bc472": // Front page has own site core template but uses blank page for the front end code
					identifier = "blankpage";
					break;
				case "0ab3d145-24c8-46b2-9c94-f23b2ea1581b": // Checkout page
					identifier = "checkoutpage";
					break;
				case "34218eec-d5ff-4f73-85a8-43c99f831f7d": // Login page
					identifier = "loginpage";
					break;
				case "b3a9a9af-f9b2-4b42-b103-cdd4824fef61": // Reset password page
					identifier = "resetpasswordpage";
					break;
				case "9e41a7c6-0078-4d34-ae07-d96333809768": // Create user page
					identifier = "createuserpage";
					break;
				case "8dffa929-90ff-472b-9c15-239234369a38": // Buy confirmation page
					identifier = "confirmationpage";
					break;
				case "90a7f8fc-2606-497a-9fc4-f2ee3d115ed0": // Sitemap page
					identifier = "sitemappage";
					break;
				default:
					identifier = "blankpage";
					break;
			}

			return identifier;
		}
	}

	angular.module(moduleId).service("contentService", ContentService);
}
