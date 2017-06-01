///<reference path="../../../../references/references.ts"/>

namespace DialogModule {
	export interface IDialogSettings {
		header?: string;
		content: any;
		close: boolean;
		hideCloseIcon?: boolean;
		size: string;
		appendClass?: string;
		fullscreenMobile?: boolean;
		buttons?: {
			button1?: {
				text: string,
				confirm: boolean,
				callback: boolean,
			},
			button2?: {
				text: string,
				confirm: boolean,
				callback: boolean,
			},
			button3?: {
				text: string,
				confirm: boolean,
				callback: boolean,
			}
		};
	}

	export class DialogService {
		public dialogObj: IDialogSettings;

		constructor(private $rootScope: ng.IRootScopeService,
			private statesService: UtilsModule.StatesService,
			private $q: ng.IQService) {
			
		}

		public openYoutubeDialog(youtubeId: string, thumbSrc: string, aspectRatioSquare: boolean = false) {
			let youtubeSettings: IDialogSettings = {
				content: `
						<div class="dialog__youtube-container ${aspectRatioSquare ? 'dialog__youtube-container_square' : ''}">
							<div class="dialog__youtube-aspect">
								<youtube videoid="'${youtubeId}'" thumb-src="'${thumbSrc}'" autoplay="true" width="'100%'" height="'100%'"></youtube>
							</div>
						</div>`,
				close: true,
				hideCloseIcon: true,
				size: 'medium', 
				appendClass: 'dialog__youtube'
			};

			this.openDialog(youtubeSettings);
		}

		public openDialog(settingObj: IDialogSettings): ng.IPromise<any> {
			var defer = this.$q.defer();

			this.dialogObj = settingObj;
			this.$rootScope.$broadcast("DIALOG_OPEN");

			try {
				if(this.dialogObj.content.toLowerCase().indexOf('iframe') >= 0) {
					window.scrollTo(0,0);
				}
			} catch(e) { }

			let off;
			off = this.$rootScope.$on("DIALOG_CALLBACK", (event, args) => {
				off();
				defer.resolve(args);
			});

			return defer.promise;
		}

		public closeDialog() {
			this.$rootScope.$broadcast("DIALOG_CLOSE");
		}
	}

	angular.module(moduleId).service("dialogService", DialogService);
}
