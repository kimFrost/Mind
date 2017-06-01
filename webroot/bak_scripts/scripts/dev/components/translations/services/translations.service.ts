///<reference path="../../../../references/references.ts"/>


namespace TranslationsModule {
    export class TranslationsService {
        public translations:SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

        constructor($window) {
			this.translations = $window.translations;
        }
    }

    angular.module(moduleId).service("translationsService", TranslationsService);
}