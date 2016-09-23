/// <reference path="topic.d.ts" />

import { Injectable } from '@angular/core';

const TOPICS = [{
    id: 1,
    name: 'test topic',
    slug: 'test-topic'
}];

@Injectable()

export class TopicService {
    getTopics(): Promise<Topic[]> {
        // use ajax to get all topics (tags)
        // save raw data
        // populate Topic type with name, id, slug
        // return list of processed topics
        return Promise.resolve(TOPICS);
    }
}