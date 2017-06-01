/* tslint:disable:max-line-length */
module HtmlTemplates.account.history {
  export var html = '<section class="account-history">	<h1>{{::$ctrl.translations.MyNemlig.AccountHistory.Headline}}</h1>	<p>{{::$ctrl.translations.MyNemlig.AccountHistory.Subline}}</p>	<div class="account-history__balance-content">		<span class="account-history__balance-text">{{::$ctrl.translations.MyNemlig.AccountHistory.MyBalance}}</span> <span class="account-history__balance-amount">{{$ctrl.balance | price}}</span>	</div>	<div ng-if="$ctrl.allData.length != 0" class="data-table">		<div class="data-table__header data-table__line">			<div>{{::$ctrl.translations.MyNemlig.AccountHistory.Date}}</div>			<div>{{::$ctrl.translations.MyNemlig.AccountHistory.Type}}</div>			<div>{{::$ctrl.translations.MyNemlig.AccountHistory.Price}}</div>			<div>{{::$ctrl.translations.MyNemlig.AccountHistory.Status}}</div>		</div>		<div class="data-table__list">			<div ng-repeat="entry in $ctrl.activeData" class="data-table__line">				<div>{{entry.CreatedDate}}</div>				<div class="color_primary">{{::$ctrl.translations.MyNemlig.AccountHistoryTypes[entry.Type]}}</div>				<div ng-class="{\'color_green\': entry.Amount > 0}"><span ng-if="entry.Amount > 0">+</span>{{entry.Amount | price:true}}</div>				<div ng-class="{\'color_green\': entry.Amount > 0}">					<span class="query_above-xx-small" ng-if="entry.Amount < 0">{{::$ctrl.translations.MyNemlig.AccountHistory.StatusMoneyInText}}</span>					<span class="query_above-xx-small" ng-if="entry.Amount > 0">{{::$ctrl.translations.MyNemlig.AccountHistory.StatusMoneyOutText}}</span>					<span class="icon_arrow-right2 item-icon" ng-show="entry.Amount < 0"></span>					<span class="icon_arrow-left2 item-icon" ng-show="entry.Amount > 0"></span>				</div>			</div>			<div class="component-loader" ng-show="$ctrl.states.fetching">				<nemlig-loader class="nemlig-loader"></nemlig-loader>			</div>		</div>		<div ng-show="$ctrl.allData.length > $ctrl.activeData.length" ng-click="$ctrl.showAllData()" class="data-table__load-button">			{{::$ctrl.translations.MyNemlig.AccountHistory.LoadMore}} (+{{$ctrl.allData.length - $ctrl.initialDataLoad}})		</div>	</div>	<div class="no-data__message" ng-if="$ctrl.activeData.length == 0">{{::$ctrl.translations.MyNemlig.AccountHistory.NoDataText}}</div></section>';
}
