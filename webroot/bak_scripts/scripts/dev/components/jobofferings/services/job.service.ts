///<reference path="../../../../references/references.ts"/>

/**
 * Created by mikkel on 19/09/16.
 */

namespace JobOfferingsModule {

	export class JobService {

		private apiUrl:string = "https://api.hr-manager.net/JobPortal.svc/";
		private accountName:string = "nemlig";
		private listPart:string = "/positionlist/json/";

		public loginUrl:string = "https://candidate.hr-manager.net/Login.aspx?customer=" + this.accountName;
		public createUserUrl:string = "https://candidate.hr-manager.net/Agent/Subscription.aspx?cid=1202";

		constructor(private $q:ng.IQService,
					private $http:ng.IHttpService) {


		}

		public getJobOfferings(): ng.IPromise<any> {
			let defer = this.$q.defer();

			let url = this.apiUrl + this.accountName + this.listPart;

			this.$http({
				method: 'GET',
				url: url
			}).then( (resp) => {
				var jobs:any = resp.data;
				defer.resolve(jobs.Items);
			});

			return defer.promise;
		}

	}


	angular.module(moduleId).service("jobService", JobService);
}
