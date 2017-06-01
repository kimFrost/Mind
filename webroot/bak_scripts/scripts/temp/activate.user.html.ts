/* tslint:disable:max-line-length */
module HtmlTemplates.activate.user {
  export var html = '<div class="create-user-page">	<div ng-if="!$ctrl.user.SetPassword && !$ctrl.fetching" class="create-user-page__inner">		<h1 class="h2">{{::$ctrl.translations.ActivateUser.ActivateUserIsActivated.Headline}}</h1>		<p>{{::$ctrl.translations.ActivateUser.ActivateUserIsActivated.Text}}</p>		<p>			<a ng-href="{{$ctrl.redirectUrl}}">{{::$ctrl.translations.ActivateUser.ActivateUserIsActivated.LinkText}}</a>		</p>	</div>	<div ng-if="$ctrl.user.SetPassword && !$ctrl.fetching" class="create-user-page__inner">		<create-user locked-mode="true" user="$ctrl.user"></create-user>	</div></div>';
}
