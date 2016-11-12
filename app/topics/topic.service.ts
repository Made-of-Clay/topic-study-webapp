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
    }

    getPostType(type: string, url: string) {
        return this.http.get(url)
            .toPromise()
            .then(something)
            .catch(something)
        ;
        function something(response: Response) {
                let data = response.json();
                if (data.response) {
                    return data;
                } else {
                    throw 'Request Failed';
                }
        }
    }

    handlePostResponse(response: Response) {
        console.info('response', response);
        console.info('this', this);
    }

    buildUrl(slug: string, which: string): string {
        return `${this.topicUrl}/${which}?filter[tag]=${slug}`;
    }

    getTopicList2(slug: string) {
        console.log('get topic list (service)');
        let quote = this.topicUrl+'/quotes?filter[tag]=';
        let verse = this.topicUrl+'/verses?filter[tag]=';
        let o =  Observable.forkJoin(
            this.http.get(quote + slug).map((res: Response) => res.json()),
            this.http.get(verse + slug).map((res: Response) => res.json())
        );
        return o;
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
    console.log(procTopic);
    return topics;
}
function inArray(haystack:any[], needle: any): boolean {
    return haystack.indexOf(needle) > -1;
}
function fetchTopicListCallback(service) {
    return function handleTopicListResponse(response: Response) {
        let data = response.json();
        if (response.ok) {
            service.handlePost(data);
        } else {
            console.error('%cAjax Error', 'font-weight:bold', `${response.status}: ${response.statusText}`);
        }
    }
}