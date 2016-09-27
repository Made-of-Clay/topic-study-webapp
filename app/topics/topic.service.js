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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise'); // ????
var TOPICS = [{
        id: 1,
        name: 'test topic',
        slug: 'test-topic'
    }];
var TopicService = (function () {
    function TopicService(http) {
        this.http = http;
        this.topicUrl = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
    }
    TopicService.prototype.getTopics = function () {
        // use ajax to get all topics (tags)
        // save raw data
        // populate Topic type with name, id, slug
        // return list of processed topics
        // return Promise.resolve(TOPICS);
        return this.http.get(this.topicUrl + '/tags')
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(processApiData)
            .catch(this.handleError);
    };
    TopicService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TopicService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TopicService);
    return TopicService;
}());
exports.TopicService = TopicService;
function processApiData(topics) {
    var procTopic = [];
    var props = ['id', 'count', 'name', 'slug'];
    topics.forEach(function (topic) {
        var tmpObj = { id: null, count: null, name: '', slug: '' };
        for (var prop in topic) {
            if (inArray(props, prop)) {
                tmpObj[prop] = topic[prop];
            }
        }
        procTopic.push(tmpObj);
    });
    console.log(procTopic);
    return topics;
}
function inArray(haystack, needle) {
    return haystack.indexOf(needle) > -1;
}
//# sourceMappingURL=topic.service.js.map