// Include a comment about why this seemingly unused module exists
var TemplateModule;
(function (TemplateModule) {
    angular.module('templates', []);
})(TemplateModule || (TemplateModule = {}));
var MindModule;
(function (MindModule) {
    var FilterFacet = (function () {
        function FilterFacet(Key, Selected, Count, TotalCount) {
            if (Key === void 0) { Key = ''; }
            if (Selected === void 0) { Selected = false; }
            if (Count === void 0) { Count = 0; }
            if (TotalCount === void 0) { TotalCount = 0; }
            this.Key = Key;
            this.Selected = Selected;
            this.Count = Count;
            this.TotalCount = TotalCount;
        }
        return FilterFacet;
    }());
    MindModule.FilterFacet = FilterFacet;
    MindModule.moduleId = "mindModule";
    angular.module(MindModule.moduleId, ['templates']);
})(MindModule || (MindModule = {}));
var MindModule;
(function (MindModule) {
    //type MindActorService = MindModule.MindActorService;
    var MindActorController = (function () {
        function MindActorController($rootScope) {
            this.needs = [];
        }
        MindActorController.prototype.$onInit = function () {
            console.log('mind actor init');
            var need = {
                type: 'eat',
                level: 1,
                wants: [
                    {
                        targetTags: ['food']
                    }
                ]
            };
            //let need = new Need();
            //this.needs.push(need);
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
