
import { Component, OnInit, Input } from '@angular/core';
import { TopicsService } from '../topics/topics.service';

@Component({
    selector: 'moc-topic-post',
    providers: [ TopicsService ],
    templateUrl: 'app/topic-post/topic-post.component.html'
})

export class TopicPostComponent implements OnInit {
    @Input() data;

    constructor(private topicService: TopicsService) {}

    ngOnInit(): void {}
}