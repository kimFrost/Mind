///<reference path="../../../../references/references.ts"/>

/**
 * Author: TTH
 */

namespace TimeslotModule {

	type TranslationsService = TranslationsModule.TranslationsService;
	type DeliveryAddressArgs = SCommerce.Website.Code.WebAPI.Models.Delivery.DeliveryAddressregistrationViewModel;

	class TimeslotAnimationblockController {

		public translations: SCommerce.Core.Dictionary.Translations = <SCommerce.Core.Dictionary.Translations>{};

		public formattedDeliveryTime: string;

		// UI variables
		private overlay; // DOM element reference for the overlay
		private timeslotAnimationBlock; // DOM element reference for the block that animates out after timeslot selection on devices
		public isActive: boolean; // Show timeslot selector

		// Animation
		private animationSpeeds: any = {
			fast: 250,
			medium: 500,
			slow: 800
		};

		// Easing functions for js animations
		private easings = UtilsModule.Animation.easings;

		constructor(private $element,
					private $timeout: ng.ITimeoutService,
					private $scope:ng.IScope,
					private timeslotStateService:TimeslotStateService,
					private timeslotService: TimeslotService,
					private responsiveService: UtilsModule.ResponsiveService,
					translationsService: TranslationsService) {

			// Translations
			this.translations = translationsService.translations;

			// Initial timeslot selector state
			this.timeslotStateService.setSelectorState(SelectorStates.Inactive);
		}


		$onInit() {
			// STATES
			// ==================================

			// Watch for service init boolean changes
			this.$scope.$watch(() => {
				return this.timeslotService.activeTimeslot.id;
			}, () => {
				if (this.timeslotService.basketData) {
					this.formattedDeliveryTime = this.timeslotService.basketData.FormattedDeliveryTime;

					// Animate block
					//this.animationTimeslotBlock();
				}
			});

			// Show animation block when timeslot is updated
			this.$scope.$on('timeslotUpdate_SUCCESS', () => {
				
				// Only show the animation block if not desktop
				if (window.innerWidth < UtilsModule.Breakpoints.Large) {
					this.isActive = true;
					this.animationTimeslotBlock();
				}
			});
		}


		// METHODS
		// ==================================

		public animationTimeslotBlock(delay: number = 4000) {
			// If on device size, we animate the fooker
			if (window.innerWidth < UtilsModule.Breakpoints.Large) {

				this.$timeout(() => {

					// DOM element
					this.overlay = this.$element[0].getElementsByClassName('timeslot-animation-block__overlay')[0];
					this.timeslotAnimationBlock = this.$element[0].getElementsByClassName('timeslot-animation-block')[0];

					let elementPos = {
						left: this.timeslotAnimationBlock.offsetLeft,
						top: this.timeslotAnimationBlock.offsetTop
					};

					this.formattedDeliveryTime = this.timeslotService.basketData.FormattedDeliveryTime;

					// Animation
					snabbt(this.timeslotAnimationBlock,
					{
						fromPosition: [0,0,0],
						position: [elementPos.left + 100, -(elementPos.top + 50), 0],
						fromScale: [1,1],
						scale: [0.5, 0.4],
						fromOpacity: 1,
						opacity: 0,
						delay: delay,
						duration: this.animationSpeeds.medium,
						easing: this.easings.easeOutCubic,
						complete: () => {
							this.$timeout(() => {
								this.isActive = false;
							});
						}
					});
				});
			}
		}
	}


	class TimeslotAnimationblockComponent implements ng.IComponentOptions {

		public bindings: any;
		public controller: any;
		public template: string;

		constructor() {
			this.bindings = {
				
			};
			this.controller = TimeslotAnimationblockController;
			this.template = HtmlTemplates.timeslot.animationblock.html;
		}
	}

	angular.module(moduleId).component("timeslotAnimationblock", new TimeslotAnimationblockComponent());


}
