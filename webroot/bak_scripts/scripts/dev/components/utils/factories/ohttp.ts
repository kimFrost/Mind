

///<reference path="../../../../references/references.ts"/>

/**
 * oHttp
 * Taken from FBB's oHTTP module - https://gist.github.com/mikkelstaerk/88188ffeb4d7886b20481878fd3d46f8
 *
 * MST on 04/07/16.
 */

namespace UtilsModule {

	angular.module(moduleId).factory('$Ohttp', ($http, $q) => {
		var $Ohttp = (settings) => {
			var defer = $q.defer();
			return new Rx.Observable.create(observer => {
				$http(angular.extend(settings,{
					timeout:defer.promise
				})).then((response) => {
					observer.onNext(response);
					observer.onCompleted();
				}, (err) => {
					observer.onError(err);
				});
				return function unsubscribe() {
					defer.resolve();
				};
			});
		};
		return $Ohttp;
	});


}
