/* tslint:disable:max-line-length */
module HtmlTemplates.subscription {
  export var html = '<div class="subscription__intro" ng-if="!$ctrl.isModalFlow">	{{ $ctrl.currentTranslation.Description }}</div><div class="subscription__intro" ng-if="$ctrl.isModalFlow && !$ctrl.isUpdated">	{{ $ctrl.currentTranslation.Description }}</div><form ng-show="!$ctrl.isUpdated" name="subscribeForm" ng-submit="subscribeForm.$valid && $ctrl.update()">	<div class="form">		<input type="text"			   class="form__input subscription__email"			   ng-model="$ctrl.UpdateSubscription.Email"			   ng-minlength="2"			   ng-maxlength="254"			   ng-pattern="/^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/"			   placeholder="E-mail"			   ng-if="!$ctrl.hideEmailField"			   required />	</div>	<strong class="subscription__choice-label">{{ $ctrl.currentTranslation.ChoiceLabel }}</strong>	<div class="form__checkbox subscription__form-item">		<input type="checkbox"			name="HasNewsletterSubscribtion"			id="HasNewsletterSubscribtion"			ng-model="$ctrl.UpdateSubscription.HasNewsletterSubscribtion" />		<label for="HasNewsletterSubscribtion">{{ ::$ctrl.translations.Checkout.Signup.SignupToNewsletterText }}			<a class="color_primary"			   ng-click="$ctrl.showModal($ctrl.translations.CreateUser.CreateUserHasNewsletterSubscribtion.ModalHeader, $ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.ModalBody)">				{{ ::$ctrl.translations.Checkout.Signup.SignupToNewsletterNotificationText }}			</a>		</label>		<div class="form__ui">			<span class="icon_check"></span>		</div>	</div>	<div class="form__checkbox subscription__form-item form__checkbox_child"		 ng-show="$ctrl.UpdateSubscription.HasNewsletterSubscribtion">		<input type="checkbox"			name="DiscountSubscription"			id="DiscountSubscription"			ng-model="$ctrl.UpdateSubscription.HasOffersSubscribtion" />		<label for="DiscountSubscription">{{ ::$ctrl.translations.Checkout.Signup.SignupToDiscountsText }}</label>		<div class="form__ui">			<span class="icon_check"></span>		</div>	</div>	<div class="form__checkbox subscription__form-item form__checkbox_child"		 ng-show="$ctrl.UpdateSubscription.HasNewsletterSubscribtion">		<input type="checkbox"			name="RecipeSubscription"			id="RecipeSubscription"			ng-model="$ctrl.UpdateSubscription.HasMealPlanSubscribtion" />		<label for="RecipeSubscription">			{{ ::$ctrl.translations.Checkout.Signup.SignupToRecipesText }}</label>		<div class="form__ui">			<span class="icon_check"></span>		</div>	</div>	<div class="form__checkbox subscription__form-item" ng-if="$ctrl.withSettings">		<input type="checkbox"			name="HasNewsBySMSSubscription"			id="HasNewsBySMSSubscription"			ng-model="$ctrl.UpdateSubscription.HasNewsBySMSSubscription" />		<label for="HasNewsBySMSSubscription">{{::$ctrl.translations.Checkout.Signup.SignupToDiscountSMSText}} 			<a class="color_primary" ng-click="$ctrl.showModal($ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.ModalHeader, $ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.ModalBody)">				{{ ::$ctrl.translations.Checkout.Signup.SignupToDiscountSMSNotificationText }}			</a>		</label>		<div class="form__ui">			<span class="icon_check"></span>		</div>	</div>	<div ng-show="$ctrl.hasError" class="subscription__error">		<div ng-if="$ctrl.errorOverrideMsg" ng-bind-html="$ctrl.errorOverrideMsg"></div>		<div ng-if="!$ctrl.errorOverrideMsg">			{{ $ctrl.currentTranslation.StatusError }}		</div>	</div>	<div class="subscription__buttons">		<input class="btn btn_grey" type="button" ng-if="$ctrl.showCancel"			   value="{{ ::$ctrl.translations.Newsletter.SubscriptionDialog.CancelLabel }}" ng-click="$ctrl.cancel()"/>		<input class="btn subscription__button-primary" type="submit" value="{{ $ctrl.currentTranslation.SubmitButton }}"/>	</div></form><div ng-show="$ctrl.isUpdated">	<b>		{{ $ctrl.currentTranslation.StatusSuccess }}	</b></div><div class="loader" ng-show="$ctrl.fetching">	<nemlig-loader class="nemlig-loader nemlig-loader_large nemlig-loader_overlay" inverted="false"></nemlig-loader></div>';
}
