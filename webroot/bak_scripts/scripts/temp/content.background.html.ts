/* tslint:disable:max-line-length */
module HtmlTemplates.content.background {
  export var html = '<div class="content-background" 	 ng-class="{\'content-background_has-btn\' : true}" 	 ng-style="$ctrl.data.BackgroundImageForJson.Url && {\'background-image\': \'url(&quot;\' + $ctrl.data.BackgroundImageForJson.Url + \'&w=1600&h=140&mode=crop&quot;)\'}">	<div class="content-background__text">		{{::$ctrl.data.Header}}	</div>		<div class="content-background__btn btn btn_white btn_outline" ng-if="$ctrl.data.LinkText != \'\'">		{{::$ctrl.data.LinkText}}	</div></div>';
}
