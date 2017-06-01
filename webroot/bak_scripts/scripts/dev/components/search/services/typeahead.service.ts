///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 22/06/16.
 */

namespace SearchModule {
	export class TypeaheadService {
		public items: Array<any> = [];
		public selectedItem: number = -1;
		public query: string;

		public latestSearches = [];
		public popularSearches = [];

		private updateTypeAheadSubjects;

		constructor(private $Ohttp: any, 
					private $http:ng.IHttpService, 
					private settingsService:PageModule.SettingsService) {
			if (localStorage.getItem("latestSearches")) {
				this.latestSearches = localStorage.getItem("latestSearches").split(",");
			}

			var settings:ng.IRequestConfig = {} as ng.IRequestConfig;
			settings.url = `/webapi/${this.settingsService.settings.SitecorePublishedStamp}/PopularSearches/Index`;
			settings.method = "GET";
			this.$http(settings).then( (response) => {
				var popularSearches:any = response.data;
				this.popularSearches = popularSearches;
			});

		}

		public getTypeahead(query) {
			if (query !== "") {
				this.query = encodeURIComponent(query);

				if (!this.updateTypeAheadSubjects) {
					this.updateTypeAheadSubjects = new Rx.Subject();
					this.updateTypeAheadSubjects
						.flatMapLatest((query) => {
							return this.$Ohttp({
								method: "GET",
								url: `/webapi/${this.settingsService.settings.SitecorePublishedStamp}/search/quick?query=${query}`
							})
							.catch(() => {
								Rx.Observable.empty();
							});								
						})
						.subscribe(response => {
							var data: any = response.data;

							this.items.splice(0, this.items.length);

							for (let i = 0; i < data.Suggestions.length; i++) {
								const itemObj = {
									Index: i,
									Name: data.Suggestions[i],
									Type: 'suggestion'
								};
								this.items.push(itemObj);
							}

							for (let i = 0; i < data.Categories.length; i++) {
								data.Categories[i]['Index'] = i;
								data.Categories[i]['Type'] = 'category';
								this.items.push(data.Categories[i]);
							}

							this.selectedItem = -1;
						});
				}
				this.updateTypeAheadSubjects.onNext(this.query);

			} else {
				this.items.splice(0, this.items.length);
			}
		}

		public clearitems() {
			this.items.splice(0, this.items.length);
		}

		public getSelectedValue() {
			return this.items[this.selectedItem] !== undefined ? this.items[this.selectedItem] : "";
		}

		public selectPrev() {
			this.selectedItem = this.selectedItem > 0 ? this.selectedItem - 1 : this.items.length - 1;
		}

		public selectNext() {
			this.selectedItem = this.selectedItem < this.items.length - 1 ? this.selectedItem + 1 : 0;
		}

		public setLatestSearch(query) {
			const value = query.toLowerCase();

			if (this.latestSearches.indexOf(value) !== -1) {
				this.latestSearches.splice(this.latestSearches.indexOf(value), 1);
				this.latestSearches.push(value);

			} else {
				if (this.latestSearches.length === 3) {
					this.latestSearches.shift();
				}

				this.latestSearches.push(value);
			}

			try {
				localStorage.setItem('latestSearches', this.latestSearches.toString());
			} catch (e) {
			}
		}
	}

	angular.module(moduleId).service("typeaheadService", TypeaheadService);
}