///<reference path="../../../../references/references.ts"/>



namespace CustomerserviceModule {

	const sessionIdStorageKey = 'sessionId';
	const sessionKeyStorageKey = 'sessionKey';
	const affinityStorageKey = 'affinityToken';
	const sequenceStorageKey = 'sequence';
	const messagesStorageKey = 'messages';

	export class CustomerserviceChatService {

		public chatIsInitialised: boolean = false;

		// Settings coming from sitecore. Defaults to sandbox
		private chatID = window['siteSettings'].SalesforceSettings.ButtonID || '';
		private orgID = window['siteSettings'].SalesforceSettings.OrganizationID || '';
		private deploymentID = window['siteSettings'].SalesforceSettings.DeploymentID || '';
		
		private chatInstance = {
			affinityToken: '', 
			id: '',
			key: '',
			sequence: 0,
			ack: -1
		};

		private _messages = [];

		private doHttp(obj) {
			return this.$http({
				method: 'POST',
				url: '/webapi/chat/SFLiveAgentEntry?31546d213',
				data: angular.merge({
						method: 'GET',
						url: '',
						headers: { 'X-LIVEAGENT-API-VERSION' : '29' },
						body: { }
					}, obj)
				}).then(response => {
					return this.handleResponse(response.data); 
				});
		}

		private typingChange = new Rx.BehaviorSubject();
		public typingChange$ = this.typingChange.asObservable();

		private availabilitySubject = new Rx.BehaviorSubject();
		public availabilityChange$ = this.availabilitySubject.asObservable();

		public messages$ = new Rx.Observable.create(observer => {
			this.messagesChanges = observer;

			this.initiateChat();

			return () => {
				this.endChat();
			};
		});
		private messagesChanges;


		private checkIfOnline() {
			this.doHttp({
				method: 'GET',
				url: '/Visitor/Availability',
				body:{ org_id: this.orgID, deployment_id: this.deploymentID, 'ReplaceAvailabilityIds': this.chatID }
			}).then(online => {
				if(online) { return; }
				setTimeout(() => {
					this.checkIfOnline();
				}, 30000);
			});
		}

		private listenForEvents() {
			this.doHttp({
				method: 'GET',
				url: '/System/Messages',
				headers: {
					'X-LIVEAGENT-AFFINITY': this.chatInstance.affinityToken, 
					'X-LIVEAGENT-SESSION-KEY': this.chatInstance.key,
					'X-LIVEAGENT-SEQUENCE': this.chatInstance.sequence			
				},
				body:{
					ack: this.chatInstance.ack
				} 
			}).finally(() => {
				//using finally so both resolve and reject starts listening again...
				if(this.chatInstance.affinityToken) {
					this.listenForEvents();
				}
			});
		}

		private getCookies() {
			return {
				sessionId: this.storageService.get(sessionIdStorageKey),
				sessionKey: this.storageService.get(sessionKeyStorageKey),
				affinityToken: this.storageService.get(affinityStorageKey),
				sequence: this.storageService.get(sequenceStorageKey)
			};
		}

		private clearCookies() {
			this.storageService.remove(sessionIdStorageKey);
			this.storageService.remove(sessionKeyStorageKey);
			this.storageService.remove(affinityStorageKey);
			this.storageService.remove(sequenceStorageKey);
			this.storageService.remove(messagesStorageKey);
		}

		public tryReconnect(): ng.IPromise<boolean> {
			let defer = this.$q.defer();
			let cookies = this.getCookies();
			if (cookies.sessionId && cookies.sessionKey && cookies.affinityToken && cookies.sequence) {
				this.chatInstance.sequence = cookies.sequence;
				this.resyncSession(cookies.sessionId, cookies.sessionKey, cookies.affinityToken).then((valid) => {
					defer.resolve(valid);	
					this.$timeout(() => {
						this._messages = this.storageService.get(messagesStorageKey);
						this.messagesChanges.onNext(this._messages);
					});
				});
			}
			else {
				defer.resolve(false);
			}
			return defer.promise;
		}

		private resyncSession(sessionId, sessionKey, affinityToken): ng.IPromise<boolean>  {
			let defer = this.$q.defer();
			this.doHttp({
				method: 'GET',
				url: '/System/ResyncSession',
				headers: {
					'X-LIVEAGENT-AFFINITY': affinityToken, 
					'X-LIVEAGENT-SESSION-KEY': sessionKey,
				},
				body:{
					SessionId: sessionId
				} 
			}).then((res) => {
				if (res.isValid) {
					this.chatInstance.affinityToken = res.affinityToken;
					this.chatInstance.key = sessionKey;
					this.storageService.set(sessionKeyStorageKey, this.chatInstance.key);
					this.storageService.set(affinityStorageKey, this.chatInstance.affinityToken);
					this.availabilitySubject.onNext('initiating');
					this.listenForEvents();
					this.ChasitorResyncState().then(() => {
						this.chatIsInitialised = true;
						this.availabilitySubject.onNext('established');
						defer.resolve(res.isValid);
					});
				}
				else {
					this.clearCookies();
					defer.resolve(res.isValid);
				}
				
			});
			return defer.promise;
		}

		private ChasitorResyncState():ng.IPromise<any> {
			return this.doHttp({
				method: 'POST',
				url: '/Chasitor/ChasitorResyncState',
				headers: {
					'X-LIVEAGENT-AFFINITY': this.chatInstance.affinityToken,
					'X-LIVEAGENT-SESSION-KEY': this.chatInstance.key,
					'X-LIVEAGENT-SEQUENCE': this.chatInstance.sequence
				},
				body:{
					organizationId: this.orgID
				} 
			}).then((res) => {
				if (res === 'OK') {
					this.chatIsInitialised = true;
				}
			});
		}

		private initiateChat() {

			if (this.chatIsInitialised) {
				return;
			}

			this.chatIsInitialised = true;
			this.availabilitySubject.onNext('initiating');

			//create session ID
			this.doHttp({
				url: '/System/SessionId',
				method: 'GET',
				headers: { 'X-LIVEAGENT-AFFINITY': 'null' },
				body: { }
			}).then(res => {
				this.chatInstance.affinityToken = res.affinityToken;
				this.chatInstance.id = res.id;
				this.chatInstance.key = res.key;
				this.chatInstance.sequence = 1;

				//Initate chat
				return this.doHttp({
					method: 'POST',
					url: '/Chasitor/ChasitorInit', 
					headers: {
						'X-LIVEAGENT-AFFINITY': this.chatInstance.affinityToken,
						'X-LIVEAGENT-SESSION-KEY': this.chatInstance.key,
						'X-LIVEAGENT-SEQUENCE': this.chatInstance.sequence
					},
					body: {
						'organizationId': this.orgID,
						'deploymentId': this.deploymentID,
						'buttonId': this.chatID,
						'doFallback': true,
						'sessionId': this.chatInstance.id,
						'userAgent': navigator.userAgent,
						'language': navigator.language || 'n/a',
						'screenResolution': screen.width + 'x' + screen.height,
						'visitorName': 'Visitor',
						'prechatDetails': [
							{
								'label': 'First Name',
								'value': '',
								'displayToAgent': true,
								'entityMaps': [],
								'transcriptFields': []
							},
							{
								'label': 'Last Name',
								'value': '',
								'displayToAgent': true,
								'entityMaps': [],
								'transcriptFields': []
							},
							{
								'label': 'Email',
								'value': '',
								'displayToAgent': true,
								'entityMaps': [],
								'transcriptFields': []
							},
							{
								'label': 'Case Subject',
								'value': 'Chat Request',
								'displayToAgent': true,
								'entityMaps': [],
								'transcriptFields': []
							},
							{
								'label': 'Case Status',
								'value': 'New',
								'displayToAgent': true,
								'entityMaps': [],
								'transcriptFields': []
							}
						],
						'prechatEntities': [
							{
								'entityName': 'Case',
								'saveToTranscript': 'CaseID',
								'showOnCreate': true,
								'linkToEntityName': '',
								'linkToEntityField': '',
								'entityFieldsMaps': [
									{
										'fieldName': 'Subject',
										'label': 'Case Subject',
										'doFind': false,
										'isExactMatch': false,
										'doCreate': true
									},
									{
										'fieldName': 'Status',
										'label': 'Case Status',
										'doFind': false,
										'isExactMatch': false,
										'doCreate': true
									}
								]
							},
							{
								'entityName': 'Contact',
								'saveToTranscript': 'ContactID',
								'showOnCreate': false,
								'linkToEntityName': 'Case',
								'linkToEntityField': 'ContactId',
								'entityFieldsMaps': [
									{
										'fieldName': 'FirstName',
										'label': 'First Name',
										'doFind': false,
										'isExactMatch': false,
										'doCreate': false
									},
									{
										'fieldName': 'LastName',
										'label': 'Last Name',
										'doFind': false,
										'isExactMatch': false,
										'doCreate': false
									},
									{
										'fieldName': 'Email',
										'label': 'Email',
										'doFind': true,
										'isExactMatch': true,
										'doCreate': false
									}
								]
							}
						],
						'buttonOverrides': [],
						'receiveQueueUpdates': true,
						'isPost': true
					}
				});
			}).then(res => {
				// Chat is now being initiated. Chat will be activated when the event chatstart is received
				this.chatInstance.sequence++;
				this.listenForEvents();
				this.storageService.set(sessionIdStorageKey, this.chatInstance.id);
				this.storageService.set(sessionKeyStorageKey, this.chatInstance.key);
				this.storageService.set(affinityStorageKey, this.chatInstance.affinityToken);
				this.storageService.set(sequenceStorageKey, this.chatInstance.sequence);
			});
		}

		private endChat() {

			if (!this.chatIsInitialised) {
				return;
			}

			// Send request to end chat
			this.doHttp({
				method: 'POST',
				url: '/Chasitor/ChatEnd',
				headers: {
					'X-LIVEAGENT-AFFINITY': this.chatInstance.affinityToken,
					'X-LIVEAGENT-SESSION-KEY': this.chatInstance.key,
					'X-LIVEAGENT-SEQUENCE': this.chatInstance.sequence
				}, 
				body: {
					ack: this.chatInstance.ack
				}
			});

			// Reset data
			this._messages = [];
			this.chatInstance = {
				affinityToken: '', 
				id: '',
				key: '',
				sequence: 0,
				ack: -1
			};
			this.chatIsInitialised = false;

			this.clearCookies();
		}

		private handleAvailability(results:any[]) {
			let availability = !!results.filter(res=>res.id===this.chatID)[0].isAvailable;
			this.availabilitySubject.onNext(availability ? 'online' : 'offline');
			return availability;
		}

		private addMessage(msg) {
			this._messages = [...this._messages, msg ];
			this.messagesChanges.onNext(this._messages);
			this.storageService.set(messagesStorageKey, this._messages);
		}

		private handleResponse(data) {
			if(data.hasOwnProperty('sequence')) {
				this.chatInstance.ack = data.sequence;
			}
			if(data.messages) {
				let message = data.messages[0];
				if (message.type === 'Availability') {
					return this.handleAvailability(message.message.results);
				}
				if (message.type === 'ChatMessage') {
					return this.addMessage(message.message);
				}
				if(message.type === 'ChatEstablished') {
					this.availabilitySubject.onNext('established');
				}
				if(message.type === 'ChatEnded') {
					this.availabilitySubject.onNext('ended');
					this.chatInstance.affinityToken = '';
					this.chatInstance.id = '';
					this.chatInstance.key = '';
					this.chatInstance.sequence = 0;
					this.chatInstance.ack = -1;
					this._messages = [];
				}
				if (message.type === 'AgentTyping') {
					this.typingChange.onNext(true);
				}
				if (message.type === 'AgentNotTyping') {
					this.typingChange.onNext(false);
				}
			}

			return data;
		} 

		public send(text) {
			if(!text) {
				return;
			}
			return this.doHttp({
				method: 'POST',
				url: '/Chasitor/ChatMessage',
				headers: {
					'X-LIVEAGENT-AFFINITY': this.chatInstance.affinityToken,
					'X-LIVEAGENT-SESSION-KEY': this.chatInstance.key,
					'X-LIVEAGENT-SEQUENCE': this.chatInstance.sequence
				},
				timeout: 40000,
				body: { 
					text,
					ack: this.chatInstance.ack
				}
			}).then(_=> {
				this.chatInstance.sequence++;
				this.storageService.set(sequenceStorageKey, this.chatInstance.sequence);
				this._messages = [...this._messages,{
					text
				}];
				this.messagesChanges.onNext(this._messages);	
				this.storageService.set(messagesStorageKey, this._messages);
			});
		}

		constructor(
			private $http: ng.IHttpService,
			private $q: ng.IQService,
			private $timeout: ng.ITimeoutService,
			private settingsService: PageModule.SettingsService,
			private storageService: UtilsModule.StorageService,
		) {
			
			this.checkIfOnline();
			
		}
	}

	angular.module(moduleId).service('customerserviceChatService', CustomerserviceChatService);
}
