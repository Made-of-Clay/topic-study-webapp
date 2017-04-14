import { Component } from '@angular/core';

@Component({
    selector: 'topic-study-app',
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    topicData = [];
    topicsListShowing = true;

    /**
     * This method is just a setter for passing data along to topic-post-component
     * @param {object} data Data fetched from topics.service
     */
    passTopicData(data): void {
        console.log('data',data);
        this.topicData = data;
    }

    toggleTopicList() {
        this.topicsListShowing = !this.topicsListShowing;
    }
}