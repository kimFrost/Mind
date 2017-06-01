/* tslint:disable:max-line-length */
module HtmlTemplates.create.user {
  export var html = '<nemlig-loader ng-show="$ctrl.states.creatingUser" inverted="false"			   class="nemlig-loader nemlig-loader_overlay"></nemlig-loader><h1 class="h2" ng-if="!$ctrl.editMode && !$ctrl.lockedMode">{{::$ctrl.translations.CreateUser.CreateUserGeneral.MainHeadline}}</h1><h1 class="h2" ng-if="$ctrl.lockedMode">{{::$ctrl.translations.ActivateUser.ActivateUserGeneral.MainHeadline}}</h1><h1 class="testPageHeaderOnProfilePage" ng-if="$ctrl.editMode">{{::$ctrl.translations.EditUser.EditUserGeneral.InvoiceHeadline}}</h1><div ng-if="!$ctrl.editMode && !$ctrl.lockedMode && !$ctrl.states.validCheckedZipcode" class="create-user-page__delivery-check">	<p ng-bind-html="$ctrl.translations.CreateUser.CreateUserGeneral.HeaderHtml"></p>	<form class="form check-postalcode-form" ng-submit="$ctrl.checkPostalCode()">		<label>{{::$ctrl.translations.CreateUser.CreateUserGeneral.PostalCheckLabel}}*</label>		<div>			<div class="input-wrapper zipcode">				<div class="form__attach">					<input type="tel"					       ng-disabled="$ctrl.showPartialFlow"					       ng-model="$ctrl.checkDeliveryAddressFormData.PostalCode"					       placeholder="{{::$ctrl.translations.CreateUser.CreateUserGeneral.PostalCheckPlaceholder}}"						   min-value="100"						   max-value="9990"						   ng-minlength="3"						   ng-maxlength="4"						   maxlength="4"						   pattern="[0-9]*"					       class="form__input checkaddress-zipcode-input testReg1PostalCodeField"/>					<span ng-show="$ctrl.showPartialFlow" class="icon_check"></span>				</div>			</div>			<div class="input-wrapper zipcode-submit">				<span class="icon_pencil edit-zipcode" ng-show="$ctrl.showPartialFlow" ng-click="$ctrl.editPostalCodeField()"></span>				<div class="form__attach" ng-show="!showPartialFlow">					<input type="submit"					       value="{{::$ctrl.translations.CreateUser.CreateUserGeneral.PostalCheckButton}}"					       ng-hide="$ctrl.showPartialFlow"					       ng-disabled="$ctrl.showPartialFlow || !$ctrl.checkDeliveryAddressFormData.PostalCode || $ctrl.checkDeliveryAddressFormData.PostalCode.length < 3 || $ctrl.checkDeliveryAddressFormData.PostalCode.length > 4"					       class="btn form-submit testReg1PostalCodeButton"/>				</div>			</div>		</div>	</form>	<form class="check-streetaddress-form" ng-show="$ctrl.showPartialFlow" ng-submit="$ctrl.checkStreetAddress()">		<div class="form-block__text">			{{::$ctrl.translations.Timeslot.CheckAddressDialog.FullAddressText}}		</div>		<div>			<div class="input-wrapper street-name">				<label>{{::$ctrl.translations.Timeslot.CheckAddressDialog.StreetnameLabel}}*</label>				<div class="form__attach">					<street-suggestion class="street-suggestion"					                   model="$ctrl.checkDeliveryAddressFormData.StreetName"					                   postalcode="$ctrl.checkDeliveryAddressFormData.PostalCode"					                   placeholder="{{::$ctrl.translations.Timeslot.CheckAddressDialog.StreetnamePlaceholder}}">					</street-suggestion>				</div>			</div>			<div class="input-wrapper street-number">				<label>{{::$ctrl.translations.Timeslot.CheckAddressDialog.HousenumberLabel}}*</label>				<input type="tel"					   placeholder="{{::$ctrl.translations.Timeslot.CheckAddressDialog.HousenumberPlaceholder}}"					   ng-model="$ctrl.checkDeliveryAddressFormData.HouseNumber"					   min-value="1"					   ng-disabled="!$ctrl.checkDeliveryAddressFormData.StreetName"					   class="form__input checkaddress-streetname-input" />			</div>		</div>		<div ng-show="$ctrl.showStreetAddressError" class="form-error-message">			{{::$ctrl.translations.CreateUser.CreateUserGeneral.InvalidStreetnameMessage}}		</div>		<button class="btn form-submit" type="submit" ng-disabled="!$ctrl.checkDeliveryAddressFormData.StreetName || !$ctrl.checkDeliveryAddressFormData.HouseNumber">{{::$ctrl.translations.Timeslot.CheckAddressDialog.SubmitButtonText}}</button>	</form>	<nemlig-loader ng-show="$ctrl.states.checkingZipcode" inverted="false" class="nemlig-loader nemlig-loader_overlay"></nemlig-loader></div><div ng-if="$ctrl.editMode">	<p ng-bind-html="$ctrl.translations.EditUser.EditUserGeneral.HeaderHtml"></p></div><div ng-if="$ctrl.lockedMode">	<p ng-bind-html="$ctrl.translations.ActivateUser.ActivateUserGeneral.HeaderHtml"></p></div><!-- Change pass modal --><div ng-if="$ctrl.editMode">	<div>		{{::$ctrl.translations.EditUser.EditUserChangePassword.Label}}		<a href="#" ng-click="$ctrl.showModal(\'\', \'<change-password></change-password\')" class="color_primary testChangePasswordButtonOnProfilePage">			{{::$ctrl.translations.EditUser.EditUserChangePassword.LabelLink}}		</a>	</div>	<br /></div><!-- Create user form --><div ng-if="$ctrl.states.validCheckedZipcode || $ctrl.editMode || $ctrl.lockedMode">	<h2 class="h4" ng-if="!$ctrl.editMode && !$ctrl.lockedMode">{{::$ctrl.translations.CreateUser.CreateUserGeneral.InvoiceHeadline}}</h2>	<h2 class="h4" ng-if="$ctrl.lockedMode">{{::$ctrl.translations.ActivateUser.ActivateUserGeneral.InvoiceHeadline}}</h2>	<h2 class="h4" ng-if="$ctrl.editMode">{{::$ctrl.translations.EditUser.EditUserGeneral.CustomerInfo}}</h2>	<form name="createUserForm" ng-submit="$ctrl.validateForm(createUserForm) && $ctrl.createUser($ctrl.formData, createUserForm)"		  class="form" novalidate>		<!-- Type -->		<label ng-show="!$ctrl.editMode">{{::$ctrl.translations.CreateUser.CreateUserMemberType.Label}}*</label>		<div class="row" ng-show="!$ctrl.editMode">			<div class="row__col-auto">				<div class="form__radio">					<input type="radio" id="TypePrivate" class="testReg2PrivateRadioBtn" value="0" name="MemberType"						   ng-model="$ctrl.formData.MemberType" ng-disabled="$ctrl.states.lockFields" required/>					<label for="TypePrivate">{{::$ctrl.translations.CreateUser.CreateUserMemberType.PrivateLabel}}</label>					<div class="form__ui"></div>				</div>			</div>			<div class="row__col-auto">				<div class="form__radio">					<input type="radio" id="TypeCompany" class="testReg2CompanyRadioBtn" value="1" name="MemberType"						   ng-model="$ctrl.formData.MemberType" ng-disabled="$ctrl.states.lockFields" required/>					<label for="TypeCompany">{{::$ctrl.translations.CreateUser.CreateUserMemberType.CompanyLabel}}</label>					<div class="form__ui"></div>				</div>			</div>			<div class="row__col-auto">				<div class="form__radio">					<input type="radio" id="TypePublic" class="testReg2PublicRadioBtn" value="5" name="MemberType"						   ng-model="$ctrl.formData.MemberType" ng-disabled="$ctrl.states.lockFields" required/>					<label for="TypePublic">{{::$ctrl.translations.CreateUser.CreateUserMemberType.PublicLabel}}</label>					<div class="form__ui"></div>				</div>			</div>		</div>		<!-- Email -->		<div class="row">			<div class="row__col-12">				<label for="Email">{{::$ctrl.translations.CreateUser.CreateUserEmail.Label}}*</label>				<input name="Email" id="Email" class="form__input testReg2EmailField testEmailFieldOnProfilePage" type="email" ng-model="$ctrl.formData.Email"					   ng-pattern="$ctrl.emailRegexPattern"					   ng-minlength="6"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserEmail.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields || $ctrl.editMode" 					   autocomplete="username"					   required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.Email.$error" ng-show="createUserForm.Email.$touched" role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserEmail.ErrorRequired}}</ng-message>						<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserEmail.ErrorShort}}</ng-message>						<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserEmail.ErrorLong}}</ng-message>						<ng-message when="pattern">{{::$ctrl.translations.CreateUser.CreateUserEmail.ErrorPattern}}</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- CompanyName -->		<div class="row" ng-if="$ctrl.formData.MemberType == 1 || $ctrl.formData.MemberType == 5">			<div class="row__col-12">				<label for="CompanyName">{{::$ctrl.translations.CreateUser.CreateUserCompanyName.Label}}*</label>				<input name="CompanyName" id="CompanyName" class="form__input testReg2CompanyNameField testCompanyNameOnProfilePage" type="text" ng-model="$ctrl.formData.InvoiceAddress.CompanyName"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserCompanyName.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.CompanyName.$error" ng-show="createUserForm.CompanyName.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserCompanyName.ErrorRequired}}						</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- FirstName & LastName -->		<div class="row">			<div class="row__col-4 row__col-6_below-small">				<label for="FirstName">{{::$ctrl.translations.CreateUser.CreateUserFirstName.Label}}*</label>				<input name="FirstName" id="FirstName" class="form__input testReg2FirstNameField testFirstNameFieldOnProfilePage" type="text" ng-model="$ctrl.formData.InvoiceAddress.FirstName"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserFirstName.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.FirstName.$error" ng-show="createUserForm.FirstName.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserFirstName.ErrorRequired}}</ng-message>					</ng-messages>				</div>			</div>			<div class="row__col-4 row__col-6_below-small">				<label for="MiddleName">{{::$ctrl.translations.CreateUser.CreateUserMiddleName.Label}}</label>				<input name="MiddleName" id="MiddleName" class="form__input testReg2MiddleNameField testMiddleNameFieldOnProfilePage" type="text" ng-model="$ctrl.formData.InvoiceAddress.MiddleName"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserMiddleName.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields"/>			</div>			<div class="row__col-4 row__col-12_below-small">				<label for="LastName">{{::$ctrl.translations.CreateUser.CreateUserLastName.Label}}*</label>				<input name="LastName" id="LastName" class="form__input testReg2LastNameField testLastNameFieldOnProfilePage" type="text" ng-model="$ctrl.formData.InvoiceAddress.LastName"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserLastName.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.LastName.$error" ng-show="createUserForm.LastName.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserLastName.ErrorRequired}}</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- ZipCode & City -->		<div class="row">			<div class="row__col-4">				<label for="PostalCode">{{::$ctrl.translations.CreateUser.CreateUserPostalCode.Label}}*</label>				<div class="form__insert">					<input name="PostalCode" id="PostalCode" class="form__input testReg2PostalCodeField testPostalCodeFieldOnProfilePage" type="text" ng-model="$ctrl.formData.InvoiceAddress.PostalCode"						   ng-change="$ctrl.updatePostalCode($ctrl.formData.InvoiceAddress.PostalCode, false)"						   ng-minlength="3"						   ng-maxlength="4" pattern="[0-9]*"						   maxlength="4"						   min-value="100"						   max-value="9990"						   placeholder="{{::$ctrl.translations.CreateUser.CreateUserPostalCode.Placeholder}}"						   ng-disabled="$ctrl.states.lockFields || $ctrl.formData.AddressesAreEqual" required/>					<div class="form__error-msg">						<ng-messages for="createUserForm.PostalCode.$error" ng-show="createUserForm.PostalCode.$touched"									 role="alert">							<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserPostalCode.ErrorRequired}}							</ng-message>						</ng-messages>					</div>					<nemlig-loader inverted="false" ng-show="$ctrl.states.fetchingStreetNames && $ctrl.formData.AddressesAreEqual"								   class="nemlig-loader nemlig-loader_small nemlig-loader_static"></nemlig-loader>				</div>			</div>			<div class="row__col-8">				<label for="City">{{::$ctrl.translations.CreateUser.CreateUserCity.Label}}*</label>				<div class="form__insert">					<input name="City" id="City" class="form__input testReg2DistrictNameField testCityFieldOnProfilePage" type="text" ng-model="$ctrl.formData.InvoiceAddress.PostalDistrict"					       placeholder="{{::$ctrl.translations.CreateUser.CreateUserCity.Placeholder}}"					       ng-disabled="$ctrl.formData.AddressesAreEqual || $ctrl.states.lockFields" 						   required/>					<span class="form__edit-icon icon_pencil testChangePostalCodeButtonOnProfilePage" ng-click="$ctrl.changeDeliveryZone()" ng-show="$ctrl.formData.AddressesAreEqual && !$ctrl.states.lockFields"></span>				</div>			</div>		</div>		<!-- StreetName & StreetNumber -->		<div class="row">			<div class="row__col-9">				<label>{{::$ctrl.translations.CreateUser.CreateUserStreetName.Label}}*</label>				<street-suggestion					class="street-suggestion"					model="$ctrl.formData.InvoiceAddress.StreetName"					postalcode="$ctrl.formData.InvoiceAddress.PostalCode"					placeholder="{{::$ctrl.translations.CreateUser.CreateUserStreetName.Placeholder}}"					required-text="{{::$ctrl.translations.CreateUser.CreateUserStreetName.ErrorRequired}}"					input-disabled="$ctrl.states.lockFields">				</street-suggestion>			</div>			<div class="row__col-3">				<label for="HouseNumber">{{::$ctrl.translations.CreateUser.CreateUserHouseNumber.Label}}*</label>				<input name="HouseNumber" id="HouseNumber" class="form__input testReg2HouseNumberField testHouseNumberFieldOnProfilePage" type="tel"					   ng-model="$ctrl.formData.InvoiceAddress.HouseNumber"					   min-value="1"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserHouseNumber.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.HouseNumber.$error" ng-show="createUserForm.HouseNumber.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserHouseNumber.ErrorRequired}}						</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- Floor & Side & Letter & Door -->		<div class="row">			<div class="row__col-3">				<label for="HouseNumberLetter">{{::$ctrl.translations.CreateUser.CreateUserLetter.Label}}</label>				<div class="form__modern-select form__modern-select_fill">					<select name="HouseNumberLetter" id="HouseNumberLetter" class="testReg2HouseLetterField testHouseNumberDropDownLetterOnProfilePage"							ng-model="$ctrl.formData.InvoiceAddress.HouseNumberLetter"							ng-options="letter for letter in $ctrl.options.Letters"							ng-disabled="$ctrl.states.lockFields"></select>				</div>			</div>			<div class="row__col-3">				<label for="Floor">{{::$ctrl.translations.CreateUser.CreateUserFloor.Label}}</label>				<div class="form__modern-select form__modern-select_fill">					<select name="Floor" id="Floor" class="testReg2StageField testFloorDropDownOnProfilePage" ng-model="$ctrl.formData.InvoiceAddress.Floor"							ng-options="floor for floor in $ctrl.options.Floors"							ng-disabled="$ctrl.states.lockFields">					</select>				</div>			</div>			<div class="row__col-3">				<label for="Side">{{::$ctrl.translations.CreateUser.CreateUserSide.Label}}</label>				<div class="form__modern-select form__modern-select_fill">					<select name="Side" id="Side" class="testReg2SideField testSideDropDownOnProfilePage" ng-model="$ctrl.formData.InvoiceAddress.Side"							ng-options="side for side in $ctrl.options.Sides"							ng-disabled="$ctrl.states.lockFields">					</select>				</div>			</div>						<div class="row__col-3">				<label for="Door">{{::$ctrl.translations.CreateUser.CreateUserDoor.Label}}</label>				<input name="Door" id="Door" class="form__input testReg2DoorField testDoorFieldOnProfilePage" type="text"					   ng-model="$ctrl.formData.InvoiceAddress.Door"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserDoor.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields"/>			</div>		</div>		<!-- Phone & SecondaryPhone -->		<div class="row">			<div class="row__col-6">				<label for="MobileNumber">{{::$ctrl.translations.CreateUser.CreateUserMobile.Label}}*</label>				<input name="MobileNumber" id="MobileNumber" class="form__input testReg2PhoneField testMobileNumberFieldOnProfilePage" type="tel"					   ng-model="$ctrl.formData.InvoiceAddress.MobileNumber"					   ng-pattern="$ctrl.phoneRegexPattern"					   ng-minlength="8"					   ng-maxlength="8"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserMobile.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.MobileNumber.$error" ng-show="createUserForm.MobileNumber.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorRequired}}</ng-message>						<ng-message when="pattern">	{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorPattern}}</ng-message>						<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorShort}}</ng-message>						<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorLong}}</ng-message>					</ng-messages>				</div>			</div>			<div class="row__col-6">				<label for="PhoneNumber">{{::$ctrl.translations.CreateUser.CreateUserPhone.Label}}</label>				<div class="form__input-guard color_primary"					 ng-click="$ctrl.disableGuard(\'#PhoneNumber\', createUserForm.PhoneNumber)"					 ng-show="!createUserForm.PhoneNumber.$touched && !$ctrl.formData.InvoiceAddress.PhoneNumber">					<div>{{::$ctrl.translations.CreateUser.CreateUserPhone.Placeholder}}</div>				</div>				<input name="PhoneNumber" id="PhoneNumber" class="form__input testReg2Phone2Field testPhoneNumberFieldOnProfilePage" type="tel" ng-model="$ctrl.formData.InvoiceAddress.PhoneNumber"					   ng-pattern="$ctrl.phoneRegexPattern"					   ng-minlength="8"					   ng-maxlength="8"					   ng-disabled="!createUserForm.PhoneNumber.$touched && !$ctrl.formData.InvoiceAddress.PhoneNumber || $ctrl.states.lockFields "					   ng-click="createUserForm.PhoneNumber.$touched = true"/>				<div class="form__error-msg">					<ng-messages for="createUserForm.PhoneNumber.$error" ng-show="createUserForm.PhoneNumber.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorRequired}}</ng-message>						<ng-message when="pattern">	{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorPattern}}</ng-message>						<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorShort}}</ng-message>						<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorLong}}</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- CVR & RequisitionNumber -->		<div class="row" ng-if="$ctrl.formData.MemberType == 1 || $ctrl.formData.MemberType == 5">			<div class="row__col-6" ng-if="$ctrl.formData.MemberType == 5">				<label for="EAN">{{::$ctrl.translations.CreateUser.CreateUserEAN.Label}}*</label>				<input name="EAN" id="EAN" class="form__input testReg2EANField testEanFieldOnProfilePage" type="text"					   ng-model="$ctrl.formData.EAN"					   ng-minlength="12"					   ng-maxlength="17"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserEAN.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.EAN.$error" ng-show="createUserForm.EAN.$touched" role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserEAN.ErrorRequired}}</ng-message>						<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserEAN.ErrorShort}}</ng-message>						<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserEAN.ErrorLong}}</ng-message>					</ng-messages>				</div>			</div>			<div class="row__col-6">				<label for="CVR">{{::$ctrl.translations.CreateUser.CreateUserCVR.Label}}*</label>				<input name="CVR" id="CVR" class="form__input testReg2CVRField testCvrFieldOnProfilePage" type="text"					   ng-model="$ctrl.formData.CVR"						ng-minlength="8"						ng-maxlength="8"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserCVR.Placeholder}}"					   ng-disabled="$ctrl.states.lockFields" required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.CVR.$error" ng-show="createUserForm.CVR.$touched" role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserCVR.ErrorRequired}}</ng-message>						<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserCVR.ErrorShort}}</ng-message>						<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserCVR.ErrorLong}}</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- Password & PasswordRepeat -->		<div class="row" ng-if="!$ctrl.editMode">			<div class="row__col-6">				<!-- Hidden input to make remember login work -->				<input type="text" class="form__input-hidden" ng-model="$ctrl.formData.Email" tabindex="-1" /> 				<label for="Password">{{::$ctrl.translations.CreateUser.CreateUserPassword.Label}}*</label>				<tooltip tooltip-alt="true"						tooltip-show="(createUserForm.Password.$dirty && createUserForm.Password.$invalid && createUserForm.Password.$touched)"						tooltip-msg="$ctrl.translations.CreateUser.CreateUserPassword.Tooltip"></tooltip>				<input name="Password" id="Password" class="form__input testReg2PasswordField" type="password" ng-model="$ctrl.formData.Password"					   ng-minlength="8"					   ng-pattern="/^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9\W]).*$/"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserPassword.Placeholder}}"					   required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.Password.$error" ng-show="createUserForm.Password.$touched"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserPassword.ErrorRequired}}</ng-message>						<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserPassword.ErrorShort}}						</ng-message>						<ng-message when="pattern">							{{::$ctrl.translations.CreateUser.CreateUserPassword.ErrorPattern}}						</ng-message>					</ng-messages>				</div>			</div>			<div class="row__col-6">				<label for="ConfirmedPassword">{{::$ctrl.translations.CreateUser.CreateUserPasswordConfirm.Label}}*</label>				<input name="ConfirmedPassword" id="ConfirmedPassword" class="form__input testReg2RePasswordField" type="password"					   ng-model="$ctrl.formData.ConfirmedPassword"					   compare-to="$ctrl.formData.Password"					   placeholder="{{::$ctrl.translations.CreateUser.CreateUserPasswordConfirm.Placeholder}}"					   required/>				<div class="form__error-msg">					<ng-messages for="createUserForm.ConfirmedPassword.$error"								 ng-show="createUserForm.ConfirmedPassword.$touched && createUserForm.Password.$valid"								 role="alert">						<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserPasswordConfirm.ErrorRequired}}						</ng-message>						<ng-message when="compareTo">							{{::$ctrl.translations.CreateUser.CreateUserPasswordConfirm.ErrorMatch}}						</ng-message>					</ng-messages>				</div>			</div>		</div>		<!-- HasNewsLetterSubscription & HasNewsBySMSSubscription -->		<div class="newsletter-and-subscriptions" ng-if="!$ctrl.editMode">			<div class="form__checkbox">				<input type="checkbox" name="HasNewsLetterSubscription" id="HasNewsLetterSubscription" class="testReg2NewsChkBox"					ng-model="$ctrl.formData.HasNewsLetterSubscription" ng-disabled="$ctrl.states.lockFields" ng-change="$ctrl.hasNewsLetterSubscriptionChange($ctrl.formData.HasNewsLetterSubscription)"/>				<label for="HasNewsLetterSubscription">{{::$ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.Label}} <a class="color_primary" ng-click="$ctrl.showModal($ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.ModalHeader, $ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.ModalBody)">{{::$ctrl.translations.CreateUser.CreateUserHasNewsLetterSubscription.LabelLink}}</a></label>				<div class="form__ui"><span class="icon_check"></span></div>			</div>			<div class="form__indent" ng-if="$ctrl.formData.HasNewsLetterSubscription">				<div class="form__checkbox">					<input type="checkbox" name="HasNewsLetterWithOffersSubscription" id="HasNewsLetterWithOffersSubscription"						ng-model="$ctrl.formData.HasNewsLetterWithOffersSubscription" ng-disabled="$ctrl.states.lockFields"/>					<label for="HasNewsLetterWithOffersSubscription">						{{::$ctrl.translations.CreateUser.CreateUserHasNewsLetterWithOffersSubscription.Label}}					</label>					<div class="form__ui"><span class="icon_check"></span></div>				</div>				<div class="form__checkbox">					<input type="checkbox" name="HasNewsLetterWithMealplansSubscription" id="HasNewsLetterWithMealplansSubscription"						ng-model="$ctrl.formData.HasNewsLetterWithMealplansSubscription" ng-disabled="$ctrl.states.lockFields"/>					<label for="HasNewsLetterWithMealplansSubscription">						{{::$ctrl.translations.CreateUser.CreateUserHasNewsLetterWithMealplansSubscription.Label}}					</label>					<div class="form__ui"><span class="icon_check"></span></div>				</div>			</div>			<div class="form__checkbox">				<input type="checkbox" name="HasNewsBySMSSubscription" id="HasNewsBySMSSubscription" class="testReg2SMSChkBox"					ng-model="$ctrl.formData.HasNewsBySMSSubscription" ng-disabled="$ctrl.states.lockFields"/>				<label for="HasNewsBySMSSubscription">{{::$ctrl.translations.CreateUser.CreateUserHasNewsBySMSSubscription.Label}} <a class="color_primary" ng-click="$ctrl.showModal($ctrl.translations.CreateUser.CreateUserHasNewsBySMSSubscription.ModalHeader, $ctrl.translations.CreateUser.CreateUserHasNewsBySMSSubscription.ModalBody)">{{::$ctrl.translations.CreateUser.CreateUserHasNewsBySMSSubscription.LabelLink}}</a></label>				<div class="form__ui"><span class="icon_check"></span></div>			</div>			<div class="divider divider_light divider_push"></div>		</div>		<!-- Alt delivery -->		<h2 class="h4" ng-if="!$ctrl.editMode">{{::$ctrl.translations.CreateUser.CreateUserGeneral.DeliveryHeadline}}</h2>		<h2 class="h4" ng-if="$ctrl.editMode">{{::$ctrl.translations.EditUser.EditUserGeneral.DeliveryHeadline}}</h2>		<div class="form__checkbox">			<input type="checkbox" id="AddressesAreEqual" class="testReg2AddressChkBox testTheSameAddressForDeliveryCheckBoxOnProfilePage" name="AddressesAreEqual"				   ng-model="$ctrl.formData.AddressesAreEqual" ng-disabled="$ctrl.states.lockFields"/>			<label for="AddressesAreEqual">{{::$ctrl.translations.CreateUser.CreateUserAddressesAreEqual.Label}}</label>			<div class="form__ui"><span class="icon_check"></span></div>		</div>		<div ng-if="!$ctrl.formData.AddressesAreEqual">			<!-- Name -->			<div class="row">				<div class="row__col-12">					<label for="AltCompanyName">{{::$ctrl.translations.CreateUser.CreateUserAltCompanyName.Label}}*</label>					<input name="AltCompanyName" id="AltCompanyName" class="form__input testAltCompanyNameFieldOnProfilePage" type="text"						   ng-model="$ctrl.formData.DeliveryAddress.CompanyName"						   placeholder="{{::$ctrl.translations.CreateUser.CreateUserAltCompanyName.Placeholder}}"						   ng-disabled="$ctrl.states.lockFields" required/>					<div class="form__error-msg">						<ng-messages for="createUserForm.AltCompanyName.$error"									 ng-show="createUserForm.AltCompanyName.$touched"									 role="alert">							<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserAltCompanyName.ErrorRequired}}							</ng-message>						</ng-messages>					</div>				</div>			</div>			<!-- ContactPerson -->			<div class="row">				<div class="row__col-12">					<label for="ContactPerson">{{::$ctrl.translations.CreateUser.CreateUserContactPerson.Label}}</label>					<input name="ContactPerson" id="ContactPerson" class="form__input testAltContactPersonFieldOnProfilePage" type="text"						   ng-model="$ctrl.formData.DeliveryAddress.ContactPerson"						   placeholder="{{::$ctrl.translations.CreateUser.CreateUserContactPerson.Placeholder}}"						   ng-disabled="$ctrl.states.lockFields"/>				</div>			</div>			<!-- ZipCode & City -->			<div class="row">				<div class="row__col-4">					<label for="AltPostalCode">{{::$ctrl.translations.CreateUser.CreateUserPostalCode.Label}}*</label>					<div class="form__insert">						<input name="AltPostalCode" id="AltPostalCode" class="form__input testAltPostalCodeOnProfilePage" type="text"							   ng-model="$ctrl.formData.DeliveryAddress.PostalCode"							   ng-change="$ctrl.updatePostalCode($ctrl.formData.DeliveryAddress.PostalCode, true)"							   ng-minlength="3"							   ng-maxlength="4" pattern="[0-9]*"							   maxlength="4"							   min-value="100"						   	   max-value="9990"							   placeholder="{{::$ctrl.translations.CreateUser.CreateUserPostalCode.Placeholder}}"							   ng-disabled="$ctrl.states.lockFields || true" required/>						<div class="form__error-msg">							<ng-messages for="createUserForm.PostalCode.$error"										 ng-show="createUserForm.AltPostalCode.$touched" role="alert">								<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserPostalCode.ErrorRequired}}								</ng-message>							</ng-messages>						</div>						<nemlig-loader inverted="false" ng-show="$ctrl.states.fetchingStreetNames && !$ctrl.formData.AddressesAreEqual"									   class="nemlig-loader nemlig-loader_small nemlig-loader_static"></nemlig-loader>					</div>				</div>				<div class="row__col-8">					<label for="City">{{::$ctrl.translations.CreateUser.CreateUserCity.Label}}*</label>					<div class="form__insert">						<input name="AltCity" id="AltCity" class="form__input testAltCityOnProfilePage" type="text" ng-model="$ctrl.formData.DeliveryAddress.PostalDistrict"						       placeholder="{{::$ctrl.translations.CreateUser.CreateUserCity.Placeholder}}"						       ng-disabled="true" required/>						<span class="form__edit-icon icon_pencil testAltChangePostalCodeButtonOnProfilePage" ng-click="$ctrl.changeDeliveryZone()" ng-show="!$ctrl.formData.AddressesAreEqual && !$ctrl.states.lockFields"></span>					</div>				</div>			</div>			<!-- StreetName & StreetNumber -->			<div class="row">				<div class="row__col-9">					<label>{{::$ctrl.translations.CreateUser.CreateUserStreetName.Label}}*</label>					<street-suggestion						class="street-suggestion"						model="$ctrl.formData.DeliveryAddress.StreetName"						postalcode="$ctrl.formData.DeliveryAddress.PostalCode"						placeholder="{{::$ctrl.translations.CreateUser.CreateUserStreetName.Placeholder}}"						required-text="{{::$ctrl.translations.CreateUser.CreateUserStreetName.ErrorRequired}}"						input-disabled="$ctrl.states.lockFields">					</street-suggestion>				</div>				<div class="row__col-3">					<label for="AltHouseNumber">{{::$ctrl.translations.CreateUser.CreateUserHouseNumber.Label}}*</label>					<input name="AltHouseNumber" id="AltHouseNumber" class="form__input testAltHouseNumberFieldOnProfilePage" type="tel"						   ng-model="$ctrl.formData.DeliveryAddress.HouseNumber"					 		min-value="1"						   placeholder="{{::$ctrl.translations.CreateUser.CreateUserHouseNumber.Placeholder}}"						   ng-disabled="$ctrl.states.lockFields" required/>					<div class="form__error-msg">						<ng-messages for="createUserForm.AltHouseNumber.$error"									 ng-show="createUserForm.AltHouseNumber.$touched" role="alert">							<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserHouseNumber.ErrorRequired}}							</ng-message>						</ng-messages>					</div>				</div>			</div>			<!-- Floor & Side & Letter & Door -->			<div class="row">				<div class="row__col-3">					<label for="AltHouseNumberLetter">{{::$ctrl.translations.CreateUser.CreateUserLetter.Label}}</label>					<div class="form__modern-select form__modern-select_fill">						<select name="AltHouseNumberLetter" id="AltHouseNumberLetter" class="testAltHouseNumberDropDownOnProfilePage"								ng-model="$ctrl.formData.DeliveryAddress.HouseNumberLetter"								ng-options="letter for letter in $ctrl.options.Letters"								ng-disabled="$ctrl.states.lockFields"></select>					</div>				</div>				<div class="row__col-3">					<label for="AltFloor">{{::$ctrl.translations.CreateUser.CreateUserFloor.Label}}</label>					<div class="form__modern-select form__modern-select_fill">						<select name="AltFloor" id="AltFloor" class="testAltFloorDropDownOnProfilePage" ng-model="$ctrl.formData.DeliveryAddress.Floor"						        ng-options="floor for floor in $ctrl.options.Floors"						        ng-disabled="$ctrl.states.lockFields">						</select>					</div>				</div>				<div class="row__col-3">					<label for="AltSide">{{::$ctrl.translations.CreateUser.CreateUserSide.Label}}</label>					<div class="form__modern-select form__modern-select_fill">						<select name="AltSide" id="AltSide" class="testAltSideDropDownOnProfilePage" ng-model="$ctrl.formData.DeliveryAddress.Side"						        ng-options="side for side in $ctrl.options.Sides"						        ng-disabled="$ctrl.states.lockFields">						</select>					</div>				</div>				<div class="row__col-3">					<label for="AltDoor">{{::$ctrl.translations.CreateUser.CreateUserDoor.Label}}</label>					<input name="AltDoor" id="AltDoor" class="form__input testAltDoorFieldOnProfilePage" type="text"					       ng-model="$ctrl.formData.DeliveryAddress.Door"					       placeholder="{{::$ctrl.translations.CreateUser.CreateUserDoor.Placeholder}}"					       ng-disabled="$ctrl.states.lockFields"/>				</div>			</div>			<!-- Phone & SecondaryPhone -->			<div class="row">				<div class="row__col-6">					<label for="AltMobileNumber">{{::$ctrl.translations.CreateUser.CreateUserMobile.Label}}*</label>					<input name="AltMobileNumber" id="AltMobileNumber" class="form__input testAltMobileNumberFieldOnProfilePage" type="tel"						   ng-model="$ctrl.formData.DeliveryAddress.MobileNumber"						   ng-pattern="$ctrl.phoneRegexPattern"						   ng-minlength="8"						   ng-maxlength="8"						   placeholder="{{::$ctrl.translations.CreateUser.CreateUserMobile.Placeholder}}"						   ng-disabled="$ctrl.states.lockFields" required/>					<div class="form__error-msg">						<ng-messages for="createUserForm.AltMobileNumber.$error"									 ng-show="createUserForm.AltMobileNumber.$touched" role="alert">							<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorRequired}}</ng-message>							<ng-message when="pattern">	{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorPattern}}</ng-message>							<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorShort}}</ng-message>							<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserMobile.ErrorLong}}</ng-message>						</ng-messages>					</div>				</div>				<div class="row__col-6">					<label for="AltPhoneNumber">{{::$ctrl.translations.CreateUser.CreateUserPhone.Label}}</label>					<div class="form__input-guard color_primary"						 ng-click="$ctrl.disableGuard(\'#AltPhoneNumber\', createUserForm.AltPhoneNumber)"						 ng-show="!createUserForm.AltPhoneNumber.$touched && !$ctrl.formData.DeliveryAddress.PhoneNumber">						<div>{{::$ctrl.translations.CreateUser.CreateUserPhone.Placeholder}}</div>					</div>					<input name="AltPhoneNumber" id="AltPhoneNumber" class="form__input testAltPhoneNumberOnProfilePage" type="tel"						   ng-model="$ctrl.formData.DeliveryAddress.PhoneNumber"						   ng-pattern="$ctrl.phoneRegexPattern"						   ng-minlength="8"						   ng-maxlength="8"						   ng-disabled="!createUserForm.AltPhoneNumber.$touched && !$ctrl.formData.DeliveryAddress.PhoneNumber || $ctrl.states.lockFields"						   ng-click="createUserForm.AltPhoneNumber.$touched = true"/>					<div class="form__error-msg">						<ng-messages for="createUserForm.AltPhoneNumber.$error"									 ng-show="createUserForm.AltPhoneNumber.$touched" role="alert">							<ng-message when="required">{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorRequired}}</ng-message>							<ng-message when="pattern">	{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorPattern}}</ng-message>							<ng-message when="minlength">{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorShort}}</ng-message>							<ng-message when="maxlength">{{::$ctrl.translations.CreateUser.CreateUserPhone.ErrorLong}}</ng-message>						</ng-messages>					</div>				</div>			</div>		</div>		<div class="divider divider_light divider_push"></div>		<!-- Notes -->		<div class="row">			<div class="row__col-12">				<label for="Notes">{{::$ctrl.translations.CreateUser.CreateUserNotes.Label}}</label>				<textarea name="Notes" id="Notes" class="form__textarea testReg2NotesField testNotesFieldOnProfilePage" type="text" ng-model="$ctrl.formData.Notes"						  ng-attr-placeholder="{{::$ctrl.translations.CreateUser.CreateUserNotes.Placeholder}}"						  ng-disabled="$ctrl.states.lockFields"></textarea>			</div>		</div>		<div class="divider divider_light divider_push"></div>		<button type="submit" class="btn btn_fill testReg2RegisterBtn testSaveDataButtonOnProfilePage">			{{$ctrl.editMode ? $ctrl.translations.EditUser.EditUserSubmit.Valid : $ctrl.translations.CreateUser.CreateUserSubmit.Valid}}		</button>	</form>	<nemlig-loader inverted="false" ng-show="$ctrl.states.updatingForm" class="nemlig-loader nemlig-loader_overlay"></nemlig-loader></div>';
}
