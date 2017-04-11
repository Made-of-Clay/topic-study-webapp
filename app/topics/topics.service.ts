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

    getTopicList(slug: string): Promise<any> {
        return this._getRequest(`${this.topicUrl}/topic?filter[tag]=${slug}`)
            .then(response => response.json())
            // .catch(error => console.error(error))
            .catch(this._requestError)
        ;
        // var types = ['quotes', 'verses'];

        // var reqs = types.map(type => {
        //     let uri = `${this.topicUrl}/${type}?filter[tag]=${slug}`;
        //     return this._getRequest(uri);
        // });

        // return Promise.all(reqs)
        //     .then(results => {
        //         let dataset = [];
        //         results.map(result => {
        //             console.log('result', result);
        //             let data = result.json();
        //             // let data = JSON.parse(result._body); // typescript is giving error that _body isn't property... but it works.... weird
        //             // let data = result;
        //             dataset.push(data);
        //         });
        //         return dataset;
        //     })
        //     .catch(error => console.error(error))
        // ;
    }

    private _getRequest(uri: string) {
        return this.http.get(uri).toPromise();
    }

    private _requestError() {
        return error => { console.error('Topic Service:', error) };
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

    return topics;
}
function inArray(haystack:any[], needle: any): boolean {
    return haystack.indexOf(needle) > -1;
}
