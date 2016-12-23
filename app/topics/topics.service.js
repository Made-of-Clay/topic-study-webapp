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
        console.log('get topic list (service): slug passed was "%s"', slug);
        var quotes = this.topicUrl + '/quotes?filter[tag]=' + slug;
        var verses = this.topicUrl + '/verses?filter[tag]=' + slug;
        var self = this;
        // return Observable.forkJoin(
        //     this.http.get(quote + slug).map((res: Response) => res.json()),
        //     this.http.get(verse + slug).map((res: Response) => res.json())
        // );
        var topiclistPromise = new Promise(function (resolve, reject) {
            var data = { quotes: null, verses: null };
            if (dataIsReady(data)) {
                resolve(data);
            }
            var urlMap = { "quotes": quotes, "verses": verses };
            for (var key in urlMap) {
                self._sendTopicListRequest(data, key, urlMap[key], resolve, reject);
            }
        });
        return topiclistPromise;
    };
    TopicsService.prototype._sendTopicListRequest = function (data, key, uri, resolve, reject) {
        this.http.get(uri).toPromise()
            .then(function (response) { return response.json(); })
            .then(function (json) {
            console.log('%cinside then', 'font-weight:bold', 'key', key);
            data[key] = json;
            handlePromise(data, resolve, reject);
            return json;
        })
            .catch(function (error) {
            console.log('%cinside catch', 'font-weight:bold', 'key', key);
            data[key] = [];
            handlePromise(data, resolve, reject);
            console.warn("Caught error while requesting \"" + key + "\"");
        });
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
    console.log('processed topics: ', procTopic);
    return topics;
}
function inArray(haystack, needle) {
    return haystack.indexOf(needle) > -1;
}
function noResultsReturned(data) {
    return (data.quotes === [] && data.verses === []);
}
function dataIsReady(data) {
    return data.quotes !== [] && data.verses !== [] &&
        data.quotes !== null && data.verses !== null;
}
function handlePromise(data, resolve, reject) {
    console.log('data', data);
    if (dataIsReady(data)) {
        console.log('resolve it!');
        resolve(data);
    }
    else if (noResultsReturned(data)) {
        console.log('reject it!');
        reject(data);
    } // else, do nothing else
}
//# sourceMappingURL=topics.service.js.map