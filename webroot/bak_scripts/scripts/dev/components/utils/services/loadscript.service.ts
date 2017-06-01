///<reference path="../../../../references/references.ts"/>


namespace UtilsModule {

	export class LoadScriptService {

        constructor()
        {

        }


		public loadScript(url: string, isAsync: boolean = true): void {
			const scriptElement: HTMLScriptElement = document.createElement("script");

			scriptElement.async = isAsync;
			scriptElement.src = url;
			document.getElementsByTagName("head")[0].appendChild(scriptElement);

		}



	}

	angular.module(moduleId).service("loadscriptService", LoadScriptService);

}
