///<reference path="../references/references.ts"/>


declare var Rx: any; // RxJS declaration - DO NOT REMOVE
declare var Mob: XamarinModule.IMob; // Mob declaration - for use on Xamarin APP - DO NOT REMOVE
declare var Raven: any; //Raven - sentry.io

Raven.config('https://6116da2572e54525a32c724c309d1371@sentry.io/100045').install();

namespace MainApp {

	angular.module("nemligApp", [
		"ui.router",
		"ngSanitize",
		"ngMessages",
		"ipCookie",
		"hmTouchEvents",
		"LocalStorageModule",
		"ngRaven",

		// Modules sorted alphabetically
		AccordionModule.moduleId,
		AdModule.moduleId,
		AddressLocationModule.moduleId,
		BasketModule.moduleId,
		BrandSpotModule.moduleId,
		BreadcrumbModule.moduleId,
		BundleModule.moduleId,
		CampaignModule.moduleId,
		ChangeAddressModule.moduleId,
		CheckoutModule.moduleId,
		CheckZipCodeOrLoginModule.moduleId,
		CombiSpotModule.moduleId,
		ContactModule.moduleId,
		CookieWarningModule.moduleId,
		CouponModule.moduleId,
		CreditCardFeeModule.moduleId,

		CustomerserviceModule.moduleId,
		DialogModule.moduleId,
		FeatureImageSpotModule.moduleId,
		FilterModule.moduleId,
		ImageSpotModule.moduleId,
		JobOfferingsModule.moduleId,
		LabelsModule.moduleId,
		LeftMenuModule.moduleId,
		MinibasketModule.moduleId,
		MobileMenuModule.moduleId,
		MosaicLayoutsModule.moduleId,
		MyNemligModule.moduleId,
		NavigationModule.moduleId,
		NewsletterModule.moduleId,
		NotificationbarModule.moduleId,
		OnerowModule.moduleId,
		OrderConfirmationModule.moduleId,
		PageModule.moduleId,
		PaymentModule.moduleId,
		ProductDetailsModule.moduleId,
		ProductlistModule.moduleId,
		RecipeModule.moduleId,
		RecipeSpotModule.moduleId,
		RecipelistModule.moduleId,
		RibbonsLayoutModule.moduleId,
		RichTextSpotModule.moduleId,
		SearchModule.moduleId,
		SocialModule.moduleId,
		SubscriptionsModule.moduleId,
		TextSpotModule.moduleId,
		ThemeLinkSpotModule.moduleId,
		TimeslotModule.moduleId,
		TrackingModule.moduleId,
		TranslationsModule.moduleId,
		TrustpilotModule.moduleId,
		UserModule.moduleId,
		UtilsModule.moduleId,
		VideoSpotModule.moduleId,
		WelcomeSpotModule.moduleId,
		XamarinModule.moduleId,
		YoutubePlayerModule.moduleId,
		TooltipModule.moduleId
	])
		.controller('AppCtrl', (
				$scope, 
				$rootScope, 
				$location,
				statesService: UtilsModule.StatesService, 
				swipeService: UtilsModule.SwipeService) => {

			$scope.resetPosition = true;
			$scope.history = [];

			$rootScope.$on('$locationChangeSuccess', function () {
				
				// Determine scroll position depending on history length
				// KEEP THIS FOR FUTURE DEVELOPMENT ON THIS
				// if ($location.path() !== $scope.history[$scope.history.length - 1]) {

				// 	if ($location.path() === $scope.history[$scope.history.length - 2]) {
				// 		$scope.resetPosition = false;
				// 		$scope.history.pop();
				// 	} else {
				// 		$scope.resetPosition = true;
				// 		$scope.history.push($location.path());
				// 	}
				// }

			});

			//
			// Global Swipe functionality
			// ======================================================
			$scope.onHammerSwipeMobilemenu = (event) => {
				var element: any = event.target;
				var threshold: number = 20;

				// If attribute: non-swipeable is on element, cancel swipe
				// If viewport is desktop sized, cancel swipe

				swipeService.swipeEvent("global").then((response) => {
					if (response === "global") {
						if (element.getAttribute('non-swipeable') !== null || window.innerWidth > 1024) {
							return;
						}

						if (event.direction === 2) {
							// Swipe left
							if (event.distance > threshold && event.angle < -150 || event.angle > 150) {
								statesService.setState("mobileNavigation", false);
							}
						} else if (event.direction === 4) {
							// Swipe right
							if (event.distance > threshold && event.angle <= 30 && event.angle >= -30) {
								statesService.setState("mobileNavigation", true);
							}
						}
					}
				});
			};
		})
		.factory('httpInterceptor', ($q, $location, $timeout,
			dialogService: DialogModule.DialogService,
			settingsService: PageModule.SettingsService) => {

			function handleResponse(response) {
				if (response.status === 200) {
					return $q.resolve(response);
				} else {
					if (response.status === 401) {
						var redirectUrl = settingsService.settings.LoginPageUrl;
						
						$timeout(() => {
							$location.url(redirectUrl);
						});
					}

					// Override HTTP interceptor.
					if (response.status === 500 && response.config.headers.Ignore500 === "true"){
						return $q.reject(response);
					}

					if (response.status === 500) {
						let headerText = window['translations'].General.HttpInterceptor.Header;
						let messageText = window['translations'].General.HttpInterceptor.Text;

						dialogService.closeDialog();
						
						// Create settings object
						let defaultDialogSettings = {
							header: headerText,
							content: `<div>${messageText}</div>`,
							close: true,
							size: 'medium'
						};

						// Open Dialog that informs user about failing service
						dialogService.openDialog(defaultDialogSettings);
					}

					return $q.reject(response);
				}

			}

			return {
				response: handleResponse,
				responseError: handleResponse
			};
		})
		.run(MainApp.appRun)
		.config(MainApp.appConfig);

}
