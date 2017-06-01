/** Custom typings for jquery.mmenu.min.umd.js
 * @author: MAC
 * @link: 
 * http://mmenu.frebsite.nl/documentation/options/, 
 * http://mmenu.frebsite.nl/documentation/options/configuration.html, 
 * http://mmenu.frebsite.nl/documentation/api.html, 
 * http://mmenu.frebsite.nl/documentation/addons/off-canvas.html
 */
interface IJqueryMmenuOptions {
	extensions?: string[];
	navbar?: {
		add?: string;
		title?: string;
		titleLink?: string; //Possible values: "parent", "anchor" or "none".
	};
	onClick?: {
		close?: boolean;
		preventDefault?: boolean;
		setSelected?: boolean;
	},
	slidingSubmenus?: boolean;
	//From the offcanvas extension
	offCanvas?: boolean | {
		blockUI?: boolean;
		moveBackground?: boolean;
		position?: string;
		zposition?: string; //Requires positioning plugin - Possible values: "back", "front" or "next".
	}
}

interface IJqueryMmenuConfiguration {
	classNames?: {
		divider?: string;
		inset?: string;
		panel?: string;
		selected?: string;
		vertical?: string;
		//From the "fixed-elements" addon
		fixedElements?: {
			fixed: string;
		}
	};
	clone?: boolean;
	openingInterval?: number;
	panelNodetype?: string;
	transitionDuration?: number;
	//From the offcanvas extension
	offCanvas?: {
		menuInjectMethod?: string; //Possible values: "prepend" or "append".
		menuWrapperSelector?: string;
		pageNodetype?: string;
		pageSelector?: string;
		wrapPageIfNeeded?: string;
	}
}

interface IJqueryMmenuApi {
	closeAllPanels: () => IJqueryMmenuApi;
	closePanel: ($panel: JQuery) => IJqueryMmenuApi; //Only available if the "slidingSubmenus" option is set to false
	getInstance: () => IJqueryMmenuInstance;
	init: ($panel: JQuery) => IJqueryMmenuApi;
	openPanel: ($panel: JQuery) => IJqueryMmenuApi;
	setSelected: ($li: JQuery, selected: boolean) => IJqueryMmenuApi;
	update: () => IJqueryMmenuApi;
	//Possible values for method: "closeAllPanels", "closePanel", closingPanel, closedPanel, "init", "openPanel", openingPanel, openedPanel, "setSelected", "update"
	//From offcanvas api: "close", "closed", "closing", "open", "opened", "opening", "setPage".
	bind: (method: string, fn: Function) => IJqueryMmenuApi;
	//From the offcanvas api
	open: () => IJqueryMmenuApi;
	close: () => IJqueryMmenuApi;
	setPage: ($page: JQuery) => IJqueryMmenuApi;
}

interface IJqueryMmenuInstance {
	$menu: JQuery;
	_api: string[];
	cbck: Object | any;
	conf: Object | any;
	opts: Object | any;
	vars: Object | any;
}

interface IJqueryMmenuAugmented extends ng.IAugmentedJQuery {
	mmenu: (options?: IJqueryMmenuOptions, configuration?: IJqueryMmenuConfiguration) => IJqueryMmenuAugmented;
}

declare module "mmenu" {
	const jQueryWithMmenu: IJqueryMmenuAugmented;
	export = jQueryWithMmenu;
}