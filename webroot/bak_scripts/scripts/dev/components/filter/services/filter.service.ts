///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 11/05/16.
 */

namespace FilterModule {
	import SettingsService = PageModule.SettingsService;
	import ContentService = PageModule.ContentService;
	import MetaDataService = PageModule.MetaDataService;

	export class FilterService {

		public fetchingFilters: boolean = false;
		private filterSubscribers: Function[] = [];

		public sorting: string = "default";
		public sortingOptions: Array<any> = [];

		public facets: Array<any> = [];
		public selectedFacets: Array<any> = [];

		public getFilters(filterParams: string): ng.IPromise<any> {
			const defer = this.$q.defer();
			this.fetchingFilters = true;
			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId; 
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const pageId = this.metadataService.pageMetaData.Id;
			const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;
			
			let url: string = `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/${pageId}/Filter/GetFilter`;
			if (filterParams) {
				url += `?${filterParams}`;
			}

			this.$http({
				method: "GET",
				url: url
			}).then((response) => {

				const data: any = response.data;

				this.selectedFacets.splice(0, this.selectedFacets.length);

				this.sortingOptions.splice(0, this.sortingOptions.length);
				data.SortingList.forEach((sort) => {
					this.sortingOptions.push(sort);
					if (sort.IsSelected) {
						this.sorting = sort.UrlName;
					}
				});

				this.facets.splice(0, this.facets.length);
				data.FacetGroups.forEach((facet) => {
					this.facets.push(facet);

					facet.Items.forEach((item) => {
						if (item.IsSelected) {
							this.selectedFacets.push(item);
						}
					});
				});

				this.fetchingFilters = false;
				defer.resolve();

			}).finally(() => {
				defer.reject();
				this.fetchingFilters = false;
			});

			return defer.promise;
		}

		public publishFilterUpdate(filterParams: string) {
			const subscriberArray = this.filterSubscribers;
			for (let i = 0, iMax = subscriberArray.length; i < iMax; i++) {
				subscriberArray[i](filterParams);
			}
		}

		public getFilterParamsFromUrl() {
			return this.$httpParamSerializer(this.$location.search());
		}

		public subscribeFilterUpdate(handler: Function) {
			this.filterSubscribers.push(handler);
		}

		public clearSubscribers() {
			this.filterSubscribers.splice(0, this.filterSubscribers.length);
		}

		constructor(
			private $rootScope: ng.IRootScopeService,
			private $q: ng.IQService,
			private $location: ng.ILocationService,
			private $httpParamSerializer,
			private settingsService: SettingsService,
			private $http: ng.IHttpService,
			private $filter: ng.IFilterService,
			private metadataService: MetaDataService,
			private contentService: ContentService) {


			this.$rootScope.$on('REFRESH_PRODUCTS', () => {
				this.getFilters(this.$httpParamSerializer(this.$location.search()));
			});

			this.$rootScope.$on('PAGE_CHANGED', () => {
				this.clearSubscribers();
				this.sorting = "default";

				if (this.contentService.showFilter !== false) {
					this.getFilters(this.$httpParamSerializer(this.$location.search()));
				}
			});
		}
	}

	angular.module(moduleId).service("filterService", FilterService);
}