// Include a comment about why this seemingly unused module exists
var TemplateModule;
(function (TemplateModule) {
    angular.module('templates', []);
})(TemplateModule || (TemplateModule = {}));
var MindModule;
(function (MindModule) {
    var Need = (function () {
        function Need(Id, Title, Importance, Wants, Value) {
            if (Id === void 0) { Id = ''; }
            if (Title === void 0) { Title = ''; }
            if (Importance === void 0) { Importance = 0; }
            if (Wants === void 0) { Wants = []; }
            if (Value === void 0) { Value = 0; }
            this.Id = Id;
            this.Title = Title;
            this.Importance = Importance;
            this.Wants = Wants;
            this.Value = Value;
        }
        return Need;
    }());
    MindModule.Need = Need;
    var Feeling = (function () {
        function Feeling(Id, Title, ValueAddition, Affections, Convertions) {
            if (Id === void 0) { Id = ''; }
            if (Title === void 0) { Title = ''; }
            if (ValueAddition === void 0) { ValueAddition = 0; }
            if (Affections === void 0) { Affections = []; }
            if (Convertions === void 0) { Convertions = []; }
            this.Id = Id;
            this.Title = Title;
            this.ValueAddition = ValueAddition;
            this.Affections = Affections;
            this.Convertions = Convertions;
        }
        return Feeling;
    }());
    MindModule.Feeling = Feeling;
    var Want = (function () {
        function Want(Id, Title, Target) {
            if (Id === void 0) { Id = ''; }
            if (Title === void 0) { Title = ''; }
            if (Target === void 0) { Target = ''; }
            this.Id = Id;
            this.Title = Title;
            this.Target = Target;
        }
        return Want;
    }());
    MindModule.Want = Want;
    var Action = (function () {
        function Action(Id, Title) {
            if (Id === void 0) { Id = ''; }
            if (Title === void 0) { Title = ''; }
            this.Id = Id;
            this.Title = Title;
        }
        return Action;
    }());
    MindModule.Action = Action;
    MindModule.moduleId = "mindModule";
    angular.module(MindModule.moduleId, ['templates']);
})(MindModule || (MindModule = {}));
///<reference path="../mind.module.ts"/>
var MindModule;
(function (MindModule) {
    var MindService = (function () {
        function MindService($rootScope, $q, $interval, $window) {
            var _this = this;
            this.$rootScope = $rootScope;
            this.$q = $q;
            this.$interval = $interval;
            this.$window = $window;
            this.bFetchingFilters = false;
            this.currentTime = 0;
            this.playRate = 1;
            //private timeListeners: Array<ng.IDeferred<any>> = [];
            this.timeListeners = [];
            $interval(function () {
                _this.tick(1000 / 60);
            }, 1000 / 60);
            // Tick should be on requestAnimationFrame
        }
        MindService.prototype.progressTime = function (timeProgressed) {
            this.currentTime += timeProgressed;
            //OnTimeUpdated.Broadcast(Time, Amount);
            for (var _i = 0, _a = this.timeListeners; _i < _a.length; _i++) {
                var listener = _a[_i];
                listener(this.currentTime, timeProgressed);
            }
            this.$rootScope.$broadcast('timeUpdate', {
                currentTime: this.currentTime,
                timeProgressed: timeProgressed
            });
        };
        MindService.prototype.tick = function (deltaTime) {
            this.progressTime(deltaTime * this.playRate);
        };
        MindService.prototype.bindToTimeUpdate = function (caller, method) {
            this.timeListeners.push(method);
        };
        return MindService;
    }());
    MindModule.MindService = MindService;
    angular.module(MindModule.moduleId).service("mindService", MindService);
})(MindModule || (MindModule = {}));
///<reference path="../mind.module.ts"/>
///<reference path="../services/mind.service.ts"/>
var MindModule;
(function (MindModule) {
    var MindActorController = (function () {
        function MindActorController($rootScope, $scope, mindService) {
            var _this = this;
            this.mindService = mindService;
            this.needPreferences = [
                {
                    Id: "NEED_Food",
                    MinValue: 10
                },
                {
                    Id: "NEED_Sleep",
                    MinValue: 20
                }
            ];
            this.needs = [];
            this.wants = [];
            $scope.$on('timeUpdate', function (e, arg) {
                //this.onTimeUpdate(arg...);
                _this.onTimeUpdate(arg.currentTime, arg.timeProgressed);
            });
        }
        MindActorController.prototype.$onInit = function () {
            console.log('mind actor init');
            /*
            let need = {
                type: 'eat',
                level: 1,
                wants: [
                    {
                        targetTags: ['food']
                    }
                ]
            }
            */
            var need = new MindModule.Need('NEED_Food');
            this.needs.push(need);
            //this.mindService.bindToTimeUpdate(this, this.onTimeUpdate);
            // Strive for emotional balance.
        };
        MindActorController.prototype.onTimeUpdate = function (time, timeProgressed) {
            //console.log('onTimeUpdate', time, timeProgressed);
            this.time = time;
            this.progressNeeds(timeProgressed);
        };
        MindActorController.prototype.progressNeeds = function (timeProgressed) {
            for (var _i = 0, _a = this.needs; _i < _a.length; _i++) {
                var need = _a[_i];
                //need.Wants
                need.Value += timeProgressed;
            }
        };
        return MindActorController;
    }());
    var MindActorComponent = (function () {
        function MindActorComponent() {
            this.bindings = {
                data: '<'
                //onFacetChange: '&'
            };
            this.controller = MindActorController;
            this.templateUrl = 'modules/mind/templates/mind.actor.template.html';
            //this.template = '<div>fdgfdg</div>';
        }
        return MindActorComponent;
    }());
    angular.module(MindModule.moduleId).component("mindActor", new MindActorComponent());
})(MindModule || (MindModule = {}));
