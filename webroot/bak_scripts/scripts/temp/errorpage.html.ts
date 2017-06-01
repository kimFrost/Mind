/* tslint:disable:max-line-length */
module HtmlTemplates.errorpage {
  export var html = '<div class="errorpage">	<h1 class="errorpage__heading" ng-if="$ctrl.content.Heading">		{{$ctrl.content.Heading}}	</h1>	<h2 class="errorpage__teaser" ng-if="$ctrl.content.Teaser">		{{$ctrl.content.Teaser}}	</h2>	<div class="errorpage__body" ng-bind-html="$ctrl.content.Body" ng-if="$ctrl.content.Body"></div>	<a ng-href="{{$ctrl.content.ButtonLink}}" ng-if="$ctrl.content.ButtonLink" class="errorpage__btn btn">		{{$ctrl.content.ButtonText}}	</a>	<div class="errorpage__link" ng-bind-html="$ctrl.content.RedirectText" ng-if="$ctrl.content.RedirectText"></div>	<div ng-if="$ctrl.pagedata.MetaData.ResponseCode === 500">		<div class="errorpage__social">			<social></social>		</div>	</div></div>';
}
