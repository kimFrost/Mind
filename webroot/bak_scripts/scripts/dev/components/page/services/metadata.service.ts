///<reference path="../../../../references/references.ts"/>

/**
 * Created by MST on 11-08-2016.
 */

namespace PageModule {
	export class MetaDataService {
		public pageMetaData: IPageMetaData;
	}

	angular.module(moduleId).service("metadataService", MetaDataService);
}
