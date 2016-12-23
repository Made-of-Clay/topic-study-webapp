import { Component } from '@angular/core';

@Component({
    selector: 'topic-study-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    topicData = [];

    passTopicData(data): void {
        this.topicData = data;
    }
}