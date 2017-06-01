/* tslint:disable:max-line-length */
module HtmlTemplates.creditCardFees.template {
  export var html = '<div class="creditCardFee">	<form name="creditCardFeeForm" class="form form__creditCardFee" novalidate>		<div class="form__modern-select">			<select				name="selectCreditCardFee"				id="selectCreditCardFee"				ng-change="$ctrl.selectedCardFee($ctrl.selectedCreditCard.GroupId)"				ng-options="option as (option.GroupName + \'&nbsp;&nbsp;&nbsp;&nbsp;\' + option.GroupFeePercentageText) for option in $ctrl.creditCardGroups track by option.GroupId"				ng-model="$ctrl.selectedCreditCard">			</select>		</div>	</form></div>';
}
