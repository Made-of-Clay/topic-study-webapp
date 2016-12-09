"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var topic_service_1 = require('./topic.service');
var TopicListComponent = (function () {
    function TopicListComponent(topicService) {
        this.topicService = topicService;
    }
    TopicListComponent.prototype.ngOnInit = function () {
        // this.get
        // GET both verses and quotes using service in ex. page
        // http://www.metaltoad.com/blog/angular-2-http-observables
    };
    TopicListComponent = __decorate([
        core_1.Component({
            selector: 'moc-topic-list',
            providers: [topic_service_1.TopicService],
            templateUrl: 'app/topics/topic-list.component.html'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof topic_service_1.TopicService !== 'undefined' && topic_service_1.TopicService) === 'function' && _a) || Object])
    ], TopicListComponent);
    return TopicListComponent;
    var _a;
}());
exports.TopicListComponent = TopicListComponent;
//# sourceMappingURL=topic-list.component.js.map