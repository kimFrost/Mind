/* tslint:disable:max-line-length */
module HtmlTemplates.sitemaplevel {
  export var html = '<ul class="sitemap__list" ng-repeat="item in $ctrl.itemdata track by item.Id">    <li class="sitemap__list-item">        <a ng-href="{{item.Url}}">{{::item.Text}}</a>        <sitemaplevel ng-if="item.Children.length" itemdata="item.Children"></sitemaplevel>    </li></ul>';
}
