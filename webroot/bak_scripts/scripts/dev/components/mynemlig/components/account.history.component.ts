///<reference path="../../../../references/references.ts"/>

namespace MyNemligModule {

	type TranslationsService = TranslationsModule.TranslationsService;

    class AccountHistoryController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};
		public initialDataLoad:number = 10;
		private allData = [];
		public activeData = [];
		public balance: number = 0;

		public states = {
			fetching: false,
			moreLoaded: false
		};

		constructor(private $element,
					private accountHistoryService:AccountHistoryService,
					private translationsService:TranslationsService) {

			this.translations = translationsService.translations;
        }

		$onDestroy () {
			// Emtpy objects
			this.activeData = [];
			this.allData = [];
			this.balance = null;
		}

		$onInit() {
			// Emtpy objects
			this.activeData = [];
			this.allData = [];
			this.balance = null;

			this.getAccountHistory();
		}

		public getAccountHistory = () => {

			if (!this.states.fetching) {
				this.states.fetching = true;

				this.accountHistoryService.getAccountHistory().then((response) => {
					let result = response;
					this.balance = result.Balance;
					this.allData = result.History;

					// Get the initial amount of data
					for (var i = 0; i < this.initialDataLoad; i++) {
						if (this.allData[i]) {
							this.activeData.push(this.allData[i]);
						} else { break; }
					}

					this.states.fetching = false;
				}).catch(() => {
					this.states.fetching = false;
				});
			}
		};

		public showAllData = () => {
			this.activeData = this.allData;
		};

		

    }

    class AccountHistoryComponent implements ng.IComponentOptions {

        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
				data: '<'
            };
            this.controller = AccountHistoryController;
            this.template = HtmlTemplates.account.history.html;
        }
    }

    angular.module(moduleId).component("accountHistory", new AccountHistoryComponent());

}
