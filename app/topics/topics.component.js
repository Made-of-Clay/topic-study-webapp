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
/*
    - getTopicList() returns data from service
    - this component should emit the data
    - topic-list.component will then receive it
    - display topic-list data from there...
 */
var core_1 = require('@angular/core');
var topics_service_1 = require('./topics.service');
var TopicsComponent = (function () {
    function TopicsComponent(topicService) {
        this.topicService = topicService;
        this.topicLoaded = new core_1.EventEmitter();
    }
    TopicsComponent.prototype.ngOnInit = function () {
        this.getTopics();
    };
    TopicsComponent.prototype.getTopics = function () {
        var _this = this;
        if (this.topics === undefined) {
            this.topicService.getTopics().then(function (topics) { return _this.topics = topics; });
        }
    };
    TopicsComponent.prototype.getTopicList = function (id, name) {
        var _this = this;
        this.topicService.getTopicList(id)
            .then(function (data) {
            console.log('!! data', data);
            _this.topicLoaded.emit({ posts: data, tagName: name });
        })
            .catch(function (error) {
            console.log('!! error', error);
            // this.topicLoadError.emit('1');
        });
    };
    TopicsComponent.prototype.filterTopic = function (searched, slug, name) {
        if (searched === void 0) { searched = ''; }
        if (searched) {
            return !!(slug.match(searched) || slug.match(name));
        }
        else {
            return true;
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TopicsComponent.prototype, "topicLoaded", void 0);
    TopicsComponent = __decorate([
        core_1.Component({
            selector: 'moc-topics',
            providers: [topics_service_1.TopicsService],
            templateUrl: 'app/topics/topics.component.html'
        }), 
        __metadata('design:paramtypes', [topics_service_1.TopicsService])
    ], TopicsComponent);
    return TopicsComponent;
}());
exports.TopicsComponent = TopicsComponent;
//# sourceMappingURL=topics.component.js.map