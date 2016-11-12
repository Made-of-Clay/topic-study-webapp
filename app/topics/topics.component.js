/// <reference path="topic.d.ts" />
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
var TopicsComponent = (function () {
    function TopicsComponent(topicService) {
        this.topicService = topicService;
    }
    TopicsComponent.prototype.ngOnInit = function () {
        this.getTopics();
    };
    TopicsComponent.prototype.getTopics = function () {
        var _this = this;
        if (this.topics === undefined) {
            this.topicService.getTopics().then(function (topics) { return _this.topics = topics; });
        }
        // this.topics = this.topicService.getTopics();
    };
    // get all topics from TopicService
    // pass list of topics (tags) into view
    // loop list of topics creating multiple topiclists
    TopicsComponent.prototype.getTopicList = function (slug) {
        console.log('get topic list');
        this.topicService.getTopicList(slug) /*.subscribe(data => {
            console.log('data', data);
        })*/;
    };
    TopicsComponent = __decorate([
        core_1.Component({
            selector: 'moc-topics',
            // template: `topiclist should show here`,
            // template: `<moc-topiclist></moc-topiclist>`,
            providers: [topic_service_1.TopicService],
            templateUrl: 'app/topics/topics.component.html'
        }), 
        __metadata('design:paramtypes', [topic_service_1.TopicService])
    ], TopicsComponent);
    return TopicsComponent;
}());
exports.TopicsComponent = TopicsComponent;
//# sourceMappingURL=topics.component.js.map