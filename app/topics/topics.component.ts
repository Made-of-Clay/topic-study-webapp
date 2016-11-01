/// <reference path="topic.d.ts" />

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TopicService } from './topic.service';
import { TopicListComponent } from './topic-list.component';

@Component({
    selector: 'moc-topics',
    // template: `topiclist should show here`,
    // template: `<moc-topiclist></moc-topiclist>`,
    providers: [ TopicService ],
    templateUrl: 'app/topics/topics.component.html'
})

export class TopicsComponent implements OnInit {
    topics: Topic[];
    searchTerm: string;

    constructor(private topicService: TopicService) {}

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
        console.log('get topic list');
        this.topicService.getTopicList(slug).map(x => {
            console.log('x', x);
        });
    }
}