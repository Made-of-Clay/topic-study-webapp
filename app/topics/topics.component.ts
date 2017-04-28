/// <reference path="topic.d.ts" />

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TopicsService } from './topics.service';
import { TopicPostComponent } from '../topic-post/topic-post.component';

@Component({
    selector: 'moc-topics',
    providers: [ TopicsService ],
    templateUrl: 'app/topics/topics.component.html'
})

export class TopicsComponent implements OnInit {
    @Output() topicLoaded = new EventEmitter();
    @Output() topicLoading = new EventEmitter();

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

    getTopicList(id: string, name: string): void {
        this.topicLoading.emit(true);

        this.topicService.getTopicList(id)
            .then(data => {
                this.topicLoading.emit(false);
                this.topicLoaded.emit({posts: data, tagName: name});
            })
            .catch(error => {
                console.log('!! error', error);
                // this.topicLoadError.emit('1');
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