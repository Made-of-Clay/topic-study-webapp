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
    // getTopicList2(slug: string): Promise<any> {
    //     var types = ['quotes', 'verses'];
    //     var reqs = types.map(type => {
    //         let uri = `${this.topicUrl}/${type}?filter[tag]=${slug}`;
    //         return this._getRequest(uri);
    //     });
    //     return Promise.all(reqs)
    //         .then(results => {
    //             let dataset = [];
    //             results.map(result => {
    //                 // let data = result.json();
    //                 // dataset.push(data);
    //             });
    //             return results;
    //         })
    //         .catch(error => console.error('-- '+error))
    //     ;
    // }
    TopicsService.prototype.getTopicList = function (slug) {
        var _this = this;
        // let quotes = this.topicUrl + '/quotes?filter[tag]=' + slug;
        // let verses = this.topicUrl + '/verses?filter[tag]=' + slug;
        // let urlMap = {"quotes":quotes, "verses":verses};
        var self = this;
        self.topicListReceived = [];
        self.topicListData = [];
        return new Promise(function (resolve, reject) {
            self.topicListPostTypes.forEach(function (postType) {
                // for (let postType in self.topicListPostTypes) { // [ 'verses', 'quotes' ]
                // make request using postType in uri
                // make common request in method call
                // method call returns individual promise
                var uri = _this.topicUrl + "/" + postType + "?filter[tag]=" + slug;
                self._getTopicListData(uri)
                    .then(function () {
                    console.log('last then() before returning');
                    if (self._confirmDataReadiness()) {
                        console.log('data is ready', self.topicListData);
                        resolve(self.topicListData);
                    }
                });
                // }
            });
        });
        // let topiclistPromise = new Promise((resolve, reject) => {
        // // let data = { quotes:null, verses:null };
        // let data = [];
        // if (dataIsReady(data)) {
        //     resolve(data);
        // }
        // for (var key in urlMap) {
        //     self._sendTopicListRequest(data, key, urlMap[key], resolve, reject);
        // }
        // });
        // return topiclistPromise;
    };
    TopicsService.prototype._getTopicListData = function (uri) {
        var self = this;
        return this.http.get(uri).toPromise()
            .then(function (response) { return response.json(); })
            .then(function (json) {
            self.topicListData.push(json[0].type);
            return json;
        })
            .catch(function (error) {
            self.topicListData.push([]);
        });
    };
    // private _sendTopicListRequest1(data, key, uri, resolve, reject) {
    // const self = this;
    // this.http.get(uri).toPromise()
    //     .then(response => response.json())
    //     .then(json => {
    //         console.log('%cinside then', 'font-weight:bold', 'key', key);
    //         self.topicListReceived.push(json[0].type);
    //         data.push(json);
    //         handlePromise(data, resolve, reject);
    //         return json;
    //     })
    //     .catch(error => {
    //         console.log('%cinside catch', 'font-weight:bold', 'key', key);
    //         data.push([]);
    //         handlePromise(data, resolve, reject);
    //         console.warn(`Caught error while requesting "${key}"`);
    //     })
    // ;
    // }
    TopicsService.prototype._confirmDataReadiness = function () {
        var _this = this;
        this.topicListPostTypes.forEach(function (postType) {
            if (!inArray(_this.topicListReceived, postType)) {
                console.log('not ready!');
                return false;
            }
        });
        return true;
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