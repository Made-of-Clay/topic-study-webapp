
import { Component, OnInit, Input } from '@angular/core';
import { TopicsService } from '../topics/topics.service';

@Component({
    selector: 'moc-topic-post',
    providers: [ TopicsService ],
    templateUrl: 'app/topic-post/topic-post.component.html'
})

export class TopicPostComponent implements OnInit {
    @Input() topicPostData;

    posts = [];
    tagName = '';

    constructor(private topicService: TopicsService) {}

    ngOnInit(): void {}
    ngOnChanges(): void {
        if (this.topicPostData.posts) {
            this.posts = this.topicPostData.posts.length ? this.topicPostData.posts : [];
            this.tagName = this.topicPostData.tagName;
        }
    }
}