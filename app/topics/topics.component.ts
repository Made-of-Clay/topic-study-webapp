/// <reference path="topic.d.ts" />

import { Component, OnInit } from '@angular/core';
import { TopicService } from './topic.service';

@Component({
    selector: 'moc-topics',
    // template: `topiclist should show here`,
    // template: `<moc-topiclist></moc-topiclist>`,
    providers: [ TopicService ],
    templateUrl: 'app/topics/topics.component.html'
})

export class TopicsComponent implements OnInit {
    topics: Topic[];

    constructor(private topicService: TopicService) {}

    ngOnInit(): void {
        this.getTopics();
    }

    getTopics(): void {
        // this.topics = this.topicService.getTopics();
        this.topicService.getTopics().then(topics => this.topics = topics);
    }
    // get all topics from TopicService
    // pass list of topics (tags) into view
    // loop list of topics creating multiple topiclists
}