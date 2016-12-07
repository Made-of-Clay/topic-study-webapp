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

export class TopicService {
    private topicUrl: string = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';
    private _rawData;

    get rawData() {
        return this._rawData;
    }

    constructor(private http: Http) {
        console.log('topicservice constructed');
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

    getTopicList(slug: string) {
console.log('get topic list (service): slug passed was "%s"', slug);
        let quotes = this.topicUrl + '/quotes?filter[tag]=' + slug;
        let verses = this.topicUrl + '/verses?filter[tag]=' + slug;
        let self = this;
        // return Observable.forkJoin(
        //     this.http.get(quote + slug).map((res: Response) => res.json()),
        //     this.http.get(verse + slug).map((res: Response) => res.json())
        // );
        let topiclistPromise = new Promise((resolve, reject) => {
            // make request(s)
            // callbacks do data cache and check if all data is back
            // once data is all back, resolve
            // if neither return, send empty data through reject?
            let data = { quotes:null, verses:null };
            if (dataIsReady(data)) {
                resolve(data);
            }
            let map = {"quotes":quotes, "verses":verses};
            for (var key in map) {
                self._sendTopicListRequest(data, key, map[key], resolve, reject);
            }
        });
        return topiclistPromise;
        // return this.http.get(verse).toPromise()
        //     .then(response => response.json())
        // ;
    }
    private _sendTopicListRequest(data, key, uri, resolve, reject) {
        this.http.get(uri).toPromise()
            .then(response => response.json())
            .then(json => {
                console.log('%cinside then', 'font-weight:bold', 'key', key);
                data[key] = json;
                handlePromise(data, resolve, reject);
                return json;
            })
            .catch(error => {
                console.log('%cinside catch', 'font-weight:bold', 'key', key);
                data[key] = [];
                handlePromise(data, resolve, reject);
                console.warn(`Caught error while requesting ${key}`);
            })
        ;
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
