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
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
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
        console.log('topicservice constructed');
    }
    Object.defineProperty(TopicService.prototype, "rawData", {
        get: function () {
            return this._rawData;
        },
        enumerable: true,
        configurable: true
    });
    TopicService.prototype.getTopics = function () {
        var _this = this;
        return this.http.get(this.topicUrl + '/tags')
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (topics) { return _this._rawData = topics; })
            .then(processApiData)
            .catch(this.handleError);
    };
    TopicService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    TopicService.prototype.getTopicList = function (slug) {
        // ajax quote - save
        // ajax verse - save
        // return once both data sets fetched
        // var url_quotes = this.buildUrl(slug, 'quotes');
        // var url_verses = this.buildUrl(slug, 'verses');
        // var remoteData = {
        //     verses: null,
        //     quotes: null
        // };
        // var promise = new Promise((resolve, reject) => {
        //     // run both ajax things
        //     this.getPostType('quotes', url_quotes)
        //         .then((response: Response) => checker('quotes', response.json()) )
        //         .then(checker)
        //     ;
        // });
        // this.http.get(url_verses)
        //     .toPromise()
        //     .then(response => {
        //         console.log('verse response', response);
        //         let data = response.json();
        //         if (data.ok) {
        //             remoteData.verses = data;
        //         }
        //     })
        //     .catch(this.handleError)
        // ;
        // var handlerCallback = fetchTopicListCallback(this);
        // this.http.get(url_quotes)
        //     .toPromise()
        //     .then(response => {
        //         console.log('quote response', response);
        //         let data = response.json();
        //         if (data.ok) {
        //             remoteData.quotes = data;
        //         }
        //     })
        //     .catch(handlerCallback)
        // ;
        // function setData(which: string, data) {
        //     remoteData[which] = data;
        // }
        // function checker() {
        //     for (let key in remoteData) {
        //         ;
        //     }
        // }
    };
    TopicService.prototype.getPostType = function (type, url) {
        return this.http.get(url)
            .toPromise()
            .then(something)
            .catch(something);
        function something(response) {
            var data = response.json();
            if (data.response) {
                return data;
            }
            else {
                throw 'Request Failed';
            }
        }
    };
    TopicService.prototype.handlePostResponse = function (response) {
        console.info('response', response);
        console.info('this', this);
    };
    TopicService.prototype.buildUrl = function (slug, which) {
        return this.topicUrl + "/" + which + "?filter[tag]=" + slug;
    };
    TopicService.prototype.getTopicList2 = function (slug) {
        console.log('get topic list (service)');
        var quote = this.topicUrl + '/quotes?filter[tag]=';
        var verse = this.topicUrl + '/verses?filter[tag]=';
        var o = Rx_1.Observable.forkJoin(this.http.get(quote + slug).map(function (res) { return res.json(); }), this.http.get(verse + slug).map(function (res) { return res.json(); }));
        return o;
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
function fetchTopicListCallback(service) {
    return function handleTopicListResponse(response) {
        var data = response.json();
        if (response.ok) {
            service.handlePost(data);
        }
        else {
            console.error('%cAjax Error', 'font-weight:bold', response.status + ": " + response.statusText);
        }
    };
}
//# sourceMappingURL=topic.service.js.map