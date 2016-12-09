
import { Component, OnInit } from '@angular/core';
import { TopicService } from './topic.service';

@Component({
    selector: 'moc-topic-list',
    providers: [ TopicService ],
    templateUrl: 'app/topics/topic-list.component.html'
})

export class TopicListComponent implements OnInit {
    constructor(private topicService: TopicService) {}

    ngOnInit(): void {
        // this.get
        // GET both verses and quotes using service in ex. page
        // http://www.metaltoad.com/blog/angular-2-http-observables
    }
}