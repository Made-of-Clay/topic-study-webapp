/// <reference path="topic.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/toPromise'; // ????

const TOPICS = [{
    id: 1,
    name: 'test topic',
    slug: 'test-topic'
}];

@Injectable()

export class TopicsService {
    private topicUrl: string = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
    private _rawData;
    private topicListReceived: string[];
    private topicListPostTypes: string[] = [ 'verses', 'quotes' ];
    private topicListData;

    get rawData() {
        return this._rawData;
    }

    constructor(private http: Http) {
        console.log('topicsService constructed');
    }

    getTopics(): Promise<Topic[]> {
        return this.http.get(this.topicUrl+'/tags')
            .toPromise()
            .then(response => response.json() as Topic[])
            .then(topics => this._rawData = topics)
            .then(processApiData)
            .catch(this.handleError);
    }
    private handleError(error): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

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

    getTopicList(slug: string): Promise<any> {
        // let quotes = this.topicUrl + '/quotes?filter[tag]=' + slug;
        // let verses = this.topicUrl + '/verses?filter[tag]=' + slug;
        // let urlMap = {"quotes":quotes, "verses":verses};
        let self = this;

        self.topicListReceived = [];
        self.topicListData = [];

        return new Promise((resolve, reject) => {
            self.topicListPostTypes.forEach(postType => {
            // for (let postType in self.topicListPostTypes) { // [ 'verses', 'quotes' ]
                // make request using postType in uri
                // make common request in method call
                // method call returns individual promise
                let uri = `${this.topicUrl}/${postType}?filter[tag]=${slug}`;
                self._getTopicListData(uri)
                    .then(() => {
                        console.log('last then() before returning');
                        if (self._confirmDataReadiness()) {
                            console.log('data is ready', self.topicListData);
                            resolve(self.topicListData);
                        }
                    })
                ;
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
    }
    private _getTopicListData(uri) {
        const self = this;

        return this.http.get(uri).toPromise()
            .then(response => response.json())
            .then(json => {
                self.topicListData.push(json[0].type);
                return json;
            })
            .catch(error => {
                self.topicListData.push([]);
            })
        ;
    }
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
    private _confirmDataReadiness(): boolean {
        this.topicListPostTypes.forEach(postType => {
            if (!inArray(this.topicListReceived, postType)) {
                console.log('not ready!');
                return false;
            }
        });

        return true;
    }

    private _getRequest(uri: string) {
        return this.http.get(uri).toPromise();
    }
}
function processApiData(topics: Topic[]) {
    var procTopic: Topic[] = [];
    var props: string[] = ['id', 'count', 'name', 'slug'];
    topics.forEach(topic => {
        let tmpObj:Topic = { id:null, count:null, name:'', slug:'' };
        for (let prop in topic) { // check each prop for matches
            if (inArray(props, prop)) {
                tmpObj[prop] = topic[prop];
            }
        }
        procTopic.push(tmpObj);
    });
console.log('processed topics: ', procTopic);
    return topics;
}
function inArray(haystack:any[], needle: any): boolean {
    return haystack.indexOf(needle) > -1;
}
function noResultsReturned(data): boolean {
    return (data.quotes === [] && data.verses === []);
}
function dataIsReady(data): boolean {
    return data.quotes !== []   && data.verses !== [] &&
           data.quotes !== null && data.verses !== null;
}
function handlePromise(data, resolve, reject) {
    console.log('data', data);
    if (dataIsReady(data)) {
        console.log('resolve it!');
        resolve(data);
    } else if (noResultsReturned(data)) {
        console.log('reject it!');
        reject(data);
    } // else, do nothing else
}
