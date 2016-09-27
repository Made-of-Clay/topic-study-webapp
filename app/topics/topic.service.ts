/// <reference path="topic.d.ts" />

import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'; // ????

const TOPICS = [{
    id: 1,
    name: 'test topic',
    slug: 'test-topic'
}];

@Injectable()

export class TopicService {
    private topicUrl = 'http://adamleis.com/topic-study/api/wp-json/wp/v2';

    constructor(private http: Http) {}

    getTopics(): Promise<Topic[]> {
        // use ajax to get all topics (tags)
        // save raw data
        // populate Topic type with name, id, slug
        // return list of processed topics

        // return Promise.resolve(TOPICS);
        return this.http.get(this.topicUrl+'/tags')
            .toPromise()
            .then(response => response.json() as Topic[])
            .then(processApiData)
            .catch(this.handleError);
    }
    private handleError(error): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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