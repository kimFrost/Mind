///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 19-04-2016.
 */

namespace NavigationModule {

	import IPageMetaData = PageModule.IPageMetaData;
	import SettingsService = PageModule.SettingsService;

	export class MenuService {
		public menu:any = [];
		public pageMetaData:IPageMetaData;
		public title:string = ""; // show title of leftmenu start item
		public breadcrumb:Array<any> = [];

		public leftmenu:any= {};
		public currentLevel:Array<any> = [];
		public parentLevels:Array<any> = [];
		public indexPath:Array<any> = [];

		public pageUpdated = (event, pagedata) => {
			this.pageMetaData = pagedata;
			this.title = this.pageMetaData.MenuContextId;// MST - Id
			this.updateMenuStates();
		};

		public updateMenuStates = () => {
			if(this.menu !== undefined && this.pageMetaData !== undefined) {
				this.indexPath.splice(0, this.indexPath.length);
				this.searchAndUpdateLevel(this.menu, []);
				this.updateLevel();
			}
		};

		public searchAndUpdateLevel(items,  path) {

			items.forEach( (item, index) => {

				item.InPath = false;
				item.Active = false;

				var newPath = path.slice(); // slice to copy array
				newPath.push(index);

				if(item.Id === this.pageMetaData.MenuContextId) { // MST - Id
					this.indexPath = newPath;
				}
				this.searchAndUpdateLevel(item.Children, newPath);

			});

		}

		public updateLevel() {
			var path = this.indexPath.slice();
			this.title = "";
			var parentItem = this.menu[path[0]];
			var currentItem = this.menu[path[0]];
			this.breadcrumb.splice(0,this.breadcrumb.length);
			var level = 0;
			var lastLevel = false;

			// update inpath and active properties
			while(path.length > 0) {
				currentItem.InPath = true;

				// Set active item
				if(path.length === 1) {
					currentItem.Active = true;
				}

				this.breadcrumb.push(currentItem);
				path.shift();

				if(path.length === 0) {
					this.currentLevel.splice(0, this.currentLevel.length);

					if(currentItem.Children.length > 0) {
						currentItem.Children.forEach((itemLevel) => {
							this.currentLevel.push(itemLevel);
						} );
					} else {
						lastLevel = true;
						parentItem.Children.forEach((itemLevel) => {


							if(itemLevel.Id === this.pageMetaData.MenuContextId) { 
								itemLevel.Active = true;
							}
							this.currentLevel.push(itemLevel);
						} );
					}
				}

				if(currentItem.Children.length>0) {
					parentItem = angular.copy(currentItem);
					currentItem = currentItem.Children[path[0]];

				}
				level++;
			}

			// Set leftmenu items
			this.menu.forEach((item) => {
				if(item.InPath) {
					this.title = item.Text;
				}
			});

			// parent levels - for use on mobile/tablet navigation
			this.parentLevels.splice(0, this.parentLevels.length);

			this.breadcrumb.forEach( (item, index) => {
				if(lastLevel === false || index < this.breadcrumb.length - 1) {
					this.parentLevels.push(item);
				}
			});

			if(this.indexPath.length === 0 || this.currentLevel.length === 0) {
				this.currentLevel.splice(0, this.currentLevel.length);
				this.menu.forEach((itemLevel) => {
					if(itemLevel.IsMegaMenuItem) {
						this.currentLevel.push(itemLevel);
					}
				} );
			}

			if(this.pageMetaData.Id !== this.pageMetaData.MenuContextId) {
				// Pushes product or recipe to breadcrumb
				var item = {
					Active:true,
					Children:[],
					Id:this.pageMetaData.Id,
					InPath:true,
					Text:this.pageMetaData.NavigationTitle,
					Url:this.pageMetaData.Url
				};
				this.breadcrumb.push(item);
				
			}
		}

		private pushLevels(levels:number, items:any, currentNode:any) {
			levels--;
			currentNode.Children.forEach( (node) => {
				var newNode = angular.copy(node);
				newNode.Children = [];
				items.push(newNode);
				if(levels >0 ) {
					this.pushLevels(levels, items[items.length-1].Children, node);
				}
			});
		}

		public getMenuLevels(parentId: string = "", levels: number = 16) {
 
			if(this.menu.length > 0) {

				var matchKey = (v,j) =>{
					var k = 'Id';  //key - // MST - Id
					v = v || '';    //value
					j = j || this.menu; //json

					for(let x in j) {
						if (j.hasOwnProperty(x)) {
							if (j[x][k] === v) {
								return j[x];
							}
							if (j[x].Children) {

								var result = matchKey(v, j[x].Children);

								if (result !== undefined) {
									return result;
								}
							}
						}
					}
				};

				var currentNode = matchKey(parentId, null);
				var items = [];
				this.pushLevels(levels, items, currentNode);

				return items;
			} else {
				return null;
			}
			
		}

		private getMenuData(levels:number): ng.IPromise<any> {
			var dfd = this.$q.defer();

			const siteSettings = this.settingsService.settings;
			const includeFavorites = siteSettings.UserId ? "1" : "0";
			const deliveryZoneId = siteSettings.DeliveryZoneId;
			const timeslotUtcParam = siteSettings.TimeslotUtc;
			const combinedProductsAndSitecoreTimestamp = siteSettings.CombinedProductsAndSitecoreTimestamp;
			this.$http({
				method: 'GET',
				url: `/webapi/${combinedProductsAndSitecoreTimestamp}/${timeslotUtcParam}/${deliveryZoneId}/${includeFavorites}/Menu/main?navigationDepth=${levels}`
			}).then((response) => {
				dfd.resolve(response.data);
				angular.merge(this.menu, response.data);
				this.$rootScope.$broadcast("MENU_SERVICE_READY");
				this.updateMenuStates();
			});

			return dfd.promise;
		}


		constructor(private $q: ng.IQService,
					private $http:ng.IHttpService,
					private $rootScope:ng.IRootScopeService,
					private settingsService:SettingsService,
					private $window) {


			this.getMenuData(15);

			this.$rootScope.$on('PAGE_CHANGED', this.pageUpdated);

		}

	}

	angular.module(moduleId).service("menuService", MenuService);

}
