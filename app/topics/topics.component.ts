/// <reference path="topic.d.ts" />

/*
    - getTopicList() returns data from service
    - this component should emit the data
    - topic-list.component will then receive it
    - display topic-list data from there...
 */

import { Component, OnInit } from '@angular/core';
import { TopicsService } from './topics.service';
import { TopicPostComponent } from '../topic-post/topic-post.component';

@Component({
    selector: 'moc-topics',
    providers: [ TopicsService ],
    templateUrl: 'app/topics/topics.component.html'
})

export class TopicsComponent implements OnInit {
    topics: Topic[];
    searchTerm: string;

    constructor(private topicService: TopicsService) {}

    ngOnInit(): void {
        this.getTopics();
    }

    getTopics(): void {
        if (this.topics === undefined) {
            this.topicService.getTopics().then(topics => this.topics = topics);
        }
    }

    getTopicList(slug: string) {
        this.topicService.getTopicList(slug)
            .then(data => {
                console.log('!! data', data);
            })
            .catch(error => {
                console.log('!! error', error);
            })
        ;
    }

    filterTopic(searched: string = '', slug: string, name: string): boolean {
        if (searched) {
            return !!(slug.match(searched) || slug.match(name));
        } else {
            return true;
        }
    }
}