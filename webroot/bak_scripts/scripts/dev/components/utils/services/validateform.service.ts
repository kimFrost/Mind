/// <reference path="../../../../references/references.ts" />

namespace UtilsModule {

	export class ValidateFormService {

		constructor(private scrollService: ScrollService) { }

		//

		/**
		 * @author KFN / MKI
		 * @description Validates form for all required fields and "Dirty´fi" the inputs if not valid
		 * @param form
		 * @param scrollToError
		 * @returns {boolean}
		 */
		public validateForm = (form: ng.IFormController, scrollToError: boolean = true): boolean => {
			if (form && form.$valid) {
				return true;
			}
			else {
				// Make it dirty
				if (form.$error.required !== undefined) {
					for (var i = 0; i < form.$error.required.length; i++) {
						var required = form.$error.required[i];
						required.$setViewValue(required.$viewValue);
						required.$setTouched();
						required.$setDirty();
					}
				}
				
				if (scrollToError) {
					this.scrollService.scrollToFirstInputValidationErrorInForm(form);
				}


				return false;
			}
		};

	}

	angular.module(moduleId).service("validateFormService", ValidateFormService);
}
