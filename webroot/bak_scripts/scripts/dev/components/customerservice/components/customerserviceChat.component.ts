///<reference path="../../../../references/references.ts"/>

namespace CustomerserviceModule {


    class CustomerserviceChatController {

		private statusMessageTranslations = {
			initiating: '',
			established: '',
			ended: ''
		};

		private textAreaEle = this.$element[0].getElementsByTagName("textarea")[0];

        public messages = [];

        public comment = '';

        public status = '';
		public statusMessage = '';
        public chasitorTyping = false;

        private containerElement: HTMLDivElement;

		public translations;

		constructor(
			private customerserviceChatService: CustomerserviceChatService,
            private $element,
            private translationsService: TranslationsModule.TranslationsService
        ) { 
            this.translations = translationsService.translations;

			this.statusMessageTranslations = {
				initiating: this.translations.Customerservice.Chat.ChatInitialisingMessage,
				established: this.translations.Customerservice.Chat.ChatConnectionEstablishedMessage,
				ended: this.translations.Customerservice.Chat.ChatEndedMessage
			};

        }


        send(comment) {
            this.customerserviceChatService.send(comment);
        }

        private subscription;

        $onInit() {
            this.subscription = this.customerserviceChatService.messages$.subscribe((allmessages) => {
                this.messages = allmessages;
                //make sure we scroll to the bottom of the page
                setTimeout(() => {
                    this.containerElement.scrollTop = this.containerElement.scrollHeight;
                }, 0);
            });

            this.customerserviceChatService.availabilityChange$.subscribe(status => {
				if (this.statusMessageTranslations[status] !== -1) {
					this.statusMessage = this.statusMessageTranslations[status];
				} else {
					this.statusMessage = status;
				}

				this.status = status;
            });

            this.customerserviceChatService.typingChange$.subscribe(status => {
                this.chasitorTyping = status;
            });

            this.containerElement = this.$element[0].querySelector('.messages') as HTMLDivElement;

			angular.element(this.textAreaEle).on('keyup', (event:any) => {
                if(!event.shiftKey) {
                    if(event.which === 13 || event.key === 'Enter') {
                        this.send(event.target.value);
                        event.target.value = '';
                        event.preventDefault();
                        return false;
                    }
				}
			});

			angular.element(this.textAreaEle).on('input', () => {
				const outerHeight = parseInt(window.getComputedStyle(this.textAreaEle).height, 10);
				const diff = outerHeight - this.textAreaEle.clientHeight;

				this.textAreaEle.style.height = 0;
				const height = Math.max(this.textAreaEle.scrollHeight, this.textAreaEle.scrollHeight + diff);
				this.textAreaEle.style.height = height + "px";

				if (height > 90) {
					this.textAreaEle.style.overflow = "auto";
				} else {
					this.textAreaEle.style.overflow = "hidden";
				}
			});
		}

        $onDestroy() {
            this.subscription.dispose();
        }

    }

    class CustomerserviceChatComponent implements ng.IComponentOptions {

        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {

            };
            this.controller = CustomerserviceChatController;
            this.template = HtmlTemplates.customerservicechat.html;
        }
    }

    angular.module(moduleId).component('customerserviceChat', new CustomerserviceChatComponent());

}
