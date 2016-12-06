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
        let quote = this.topicUrl + '/quotes?filter[tag]=' + slug;
        let verse = this.topicUrl + '/verses?filter[tag]=' + slug;
        let self = this;
        // return Observable.forkJoin(
        //     this.http.get(quote + slug).map((res: Response) => res.json()),
        //     this.http.get(verse + slug).map((res: Response) => res.json())
        // );
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        // ::: HERE ADAM - resolve and reject are nothing right now
        //     figure out what should be inside and pass to Promise;
        //     currently. topiclistPromise is a function that needs
        //     run with two params (resolve and reject); maybe I need
        //     to reorder logic *inside* the Promise
        //////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////
        let topiclistPromise = new Promise((resolve, reject) => {
            // make request(s)
            // callbacks do data cache and check if all data is back
            // once data is all back, resolve
            // if neither return, send empty data through reject?
            let data = { quotes:null, verses:null };
            if (dataIsReady(data)) {
                resolve(data);
            }
            [quote, verse].forEach(uri => {
                self.http.get(uri).toPromise()
                    .then(response => response.json())
                    .then(json => {
                        data[uri] = json;
                        handlePromise(data, resolve, reject);
                        return json;
                    })
                    .catch(error => {
                        data[uri] = [];
                        handlePromise(data, resolve, reject);
                        console.warn(`Caught error while requesting ${uri}`);
                    })
                ;
            });
        });
        return topiclistPromise;
        // return this.http.get(verse).toPromise()
        //     .then(response => response.json())
        // ;
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
    if (dataIsReady(data)) {
        resolve(data);
    } else if (noResultsReturned(data)) {
        reject(data);
    } // else, do nothing else
}
