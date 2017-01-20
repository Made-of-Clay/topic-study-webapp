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
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise'); // ????
var TOPICS = [{
        id: 1,
        name: 'test topic',
        slug: 'test-topic'
    }];
var TopicsService = (function () {
    function TopicsService(http) {
        this.http = http;
        this.topicUrl = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
        this.topicListPostTypes = ['verses', 'quotes'];
        console.log('topicsService constructed');
    }
    Object.defineProperty(TopicsService.prototype, "rawData", {
        get: function () {
            return this._rawData;
        },
        enumerable: true,
        configurable: true
    });
    TopicsService.prototype.getTopics = function () {
        var _this = this;
        return this.http.get(this.topicUrl + '/tags')
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (topics) { return _this._rawData = topics; })
            .then(processApiData)
            .catch(this.handleError);
    };
    TopicsService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TopicsService.prototype.getTopicList = function (slug) {
        var _this = this;
        var types = ['quotes', 'verses'];
        var reqs = types.map(function (type) {
            var uri = _this.topicUrl + "/" + type + "?filter[tag]=" + slug;
            return _this._getRequest(uri);
        });
        return Promise.all(reqs)
            .then(function (results) {
            var dataset = [];
            results.map(function (result) {
                var data = result.json();
                // console.log('result', result);
                // let data = result;
                dataset.push(data);
            });
            return dataset;
        })
            .catch(function (error) { return console.error(error); });
    };
    TopicsService.prototype._getRequest = function (uri) {
        return this.http.get(uri).toPromise();
    };
    TopicsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TopicsService);
    return TopicsService;
}());
exports.TopicsService = TopicsService;
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
    return topics;
}
function inArray(haystack, needle) {
    return haystack.indexOf(needle) > -1;
}
//# sourceMappingURL=topics.service.js.map