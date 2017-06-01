/* tslint:disable:max-line-length */
module HtmlTemplates.selectedfilters {
  export var html = '<div ng-show="$ctrl.selectedFacets.length > 0">    {{::$ctrl.translations.Filter.ChosenFilters.ChosenFilters}}    <a class="selected-filters__item" ng-repeat="facet in $ctrl.selectedFacets" ng-click="$ctrl.unselectFacet(facet)">        {{::facet.Text}}    </a>    <a ng-if="$ctrl.selectedFacets.length > 0" class="selected-filters__remove-all" ng-click="$ctrl.clearAllFacets()">{{::$ctrl.translations.Filter.ChosenFilters.RemoveAllFilters}}</a></div>';
}
