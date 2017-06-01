///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 09-08-2016.
 */
namespace CheckoutModule {


	class StreetSuggestionController {


		private maxItems:number = 7;

		public placeholder:string;
		public requiredText:string;
		public model:string = (this.model || "");
		public postalcode:string;
		public inputDisabled:boolean;
		public isTyping:boolean = false;

		public allitems:Array<string> = [];
		public items:Array<string> = [];
		public selectedItem:number = -1;

		constructor(private $scope:ng.IScope,
					private $timeout,
					private $http:ng.IHttpService) {

			this.$scope.$watch( () => {
				return this.postalcode;
			}, () => {
				this.getStreetnames();
			});

			this.$scope.$watch( () => {
				return this.model;
			}, (newVal) => {
				this.selectedItem = -1;
				if(newVal !== "" && newVal !== null && newVal !== undefined) {

					var newItems = [];
					var extraItems = [];
					this.allitems.forEach( (street)=> {
						if((street !== null ? street : "").toLowerCase().indexOf(newVal.toLowerCase()) === 0) {
							newItems.push(street);
						}
						if((street !== null ? street : "").toLowerCase().indexOf(newVal.toLowerCase()) > 0) {
							extraItems.push(street);
						}
					});

					this.items = [...newItems, ...extraItems];
					this.items = this.items.slice(0,this.maxItems);
				} else {
					this.items.splice(0,this.items.length);
				}
			});

		}

		public getStreetnames() {

			if(this.postalcode === undefined) {
				return;
			}
			if(this.postalcode.toString().length === 4) {
				this.$http({
					method: 'GET',
					url: "/webapi/delivery/GetStreetNames?postalcode=" + this.postalcode
				}).then((response) => {
					this.allitems.splice(0,this.allitems.length);
					this.items.splice(0,this.items.length);
					var data:any = response.data;
					 data.forEach( (item) => {
						this.allitems.push(item);
					});
					this.selectedItem = -1;

				});
			} else {
				this.allitems.splice(0,this.allitems.length);
				this.items.splice(0,this.items.length);
			}
		}

		public selectPrev() {
			this.selectedItem = this.selectedItem > 0 ? this.selectedItem-1 : this.items.length-1;
		}

		public selectNext() {
			this.selectedItem = this.selectedItem < this.items.length-1 ? this.selectedItem+1 : 0;
		}

		public selectIndex(index) {
			this.selectedItem = index;
			this.model = this.items[this.selectedItem];
		}

		public onFocus() {
			this.isTyping = true;
		}

		public onBlur() {
			this.$timeout( () => {
				this.isTyping = false;
			},200);

		}

		public keyDown(evn) {
			if(evn.keyCode === 38) {
				evn.preventDefault();
				this.selectPrev();
			}
			if(evn.keyCode === 40) {
				evn.preventDefault();
				this.selectNext();
			}
			if(evn.keyCode === 13 || evn.keyCode === 9) {
				if(evn.keyCode === 13 ) {				
					evn.preventDefault();
				}
				if(this.selectedItem >= 0) {
					this.model = this.items[this.selectedItem];
				}
			}
		}
	}

	class StreetSuggestionComponent implements ng.IComponentOptions {
		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				placeholder:"@",
				requiredText:"@",
				model:"=",
				postalcode:"<",
				inputDisabled:"<"
			};
			this.controller = StreetSuggestionController;
			this.template = HtmlTemplates.streetsuggestion.html;
		}
	}

	angular.module(moduleId).component("streetSuggestion", new StreetSuggestionComponent());
}
