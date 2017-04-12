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
var topics_service_1 = require('../topics/topics.service');
var TopicPostComponent = (function () {
    function TopicPostComponent(topicService) {
        this.topicService = topicService;
        this.posts = [];
        this.tagName = '';
    }
    TopicPostComponent.prototype.ngOnInit = function () { };
    TopicPostComponent.prototype.ngOnChanges = function () {
        if (this.topicPostData.posts) {
            this.posts = this.topicPostData.posts.length ? this.topicPostData.posts : [];
            this.tagName = this.topicPostData.tagName;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TopicPostComponent.prototype, "topicPostData", void 0);
    TopicPostComponent = __decorate([
        core_1.Component({
            selector: 'moc-topic-post',
            providers: [topics_service_1.TopicsService],
            templateUrl: 'app/topic-post/topic-post.component.html'
        }), 
        __metadata('design:paramtypes', [topics_service_1.TopicsService])
    ], TopicPostComponent);
    return TopicPostComponent;
}());
exports.TopicPostComponent = TopicPostComponent;
//# sourceMappingURL=topic-post.component.js.map