///<reference path="../../../../references/references.ts"/>

/**
 * Xamarin mobile APP service - invokes methods on Mob object injected by Xamarin APP
 *
 * MST on 14-09-2016.
 */

namespace XamarinModule {

	export interface IMob {
		Loaded:Function;
		LoginRequested:Function;
		LogoutRequested:Function;
		Navigated:Function;
		NavigateToShopPage:Function;
	}

	export class XamarinService {

		public enabled:boolean = false;

		constructor() {

		}

		public xamarinEnabled() {
			return this.xamarinEnabled && typeof Mob !== "undefined";
		}

		// Mob.Loaded() – invoked when web application finished initialization of UI on first navigation to it.
		public firstPageLoaded() {
			if(this.xamarinEnabled()) {
				this.enabled = true;
				Mob.Loaded();
			}
		}

		// Mob.Navigated(string url, boolean requiresAuthentication) – must be invoked every time user navigates in web application for controlling navigation.
		// Mob.Navigated must be invoked on screens (b) and (d) passing navigated url and requiresAuthentication.
		public navigated(url:string, requiresAuthentication:boolean = false, title: string) {
			if (this.xamarinEnabled()) {
				Mob.Navigated(url, requiresAuthentication, `nemlig.com ${title}`);
			}
		}

		// Mob.LoginRequested() – when user press Mit Nemlig and he isn’t logged 
		public loginRequested() {
			if(this.xamarinEnabled()) {
				Mob.LoginRequested();
			}
		}

		// Mob.LogoutRequested() – when user wants to Log out
		public logoutRequested() {
			if(this.xamarinEnabled()) {
				Mob.LogoutRequested();
			}
		}

		// Mob.NavigateToShopPage() – invoked after user submitted request and should be navigated to Main page of Web app.
		// Mob.NavigateToShopPage() – invoked after user wants to Navigate to Main page of Web app after successful password resetting.
		public navigateToShopPage() {
			if(this.xamarinEnabled()) {
				Mob.NavigateToShopPage();
			}
		}

	}

	angular.module(moduleId).service("xamarinService", XamarinService);
}
