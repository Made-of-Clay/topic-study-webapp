/// <reference path="topic.d.ts" />

import { Component, OnInit } from '@angular/core';
import { TopicsService } from './topics.service';
import { TopicListComponent } from '../topic-list/topic-list.component';

@Component({
    selector: 'moc-topics',
    // template: `topiclist should show here`,
    // template: `<moc-topiclist></moc-topiclist>`,
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
        // this.topics = this.topicService.getTopics();
    }
    // get all topics from TopicService
    // pass list of topics (tags) into view
    // loop list of topics creating multiple topiclists
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