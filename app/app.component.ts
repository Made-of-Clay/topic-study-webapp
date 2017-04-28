import { Component } from '@angular/core';

@Component({
    selector: 'topic-study-app',
    providers: [  ],
    templateUrl: 'app/app.component.html'
})

export class AppComponent {
    topicData = [];
    topicsListShowing = true;
    topicsLoading: boolean = false;

    ngOnInit(): void {
        this.checkTopicsListVisibility();
    }

    checkTopicsListVisibility(): void {
        this.topicsListShowing = !this.smallScreen();
    }

    smallScreen(): boolean {
        return window.innerWidth < 800;
    }

    /**
     * This method is just a setter for passing data along to topic-post-component
     * @param {object} data Data fetched from topics.service
     */
    passTopicData(data): void {
        console.log('data',data);
        this.topicData = data;
        this.checkTopicsListVisibility();
    }

    toggleTopicList() {
        this.topicsListShowing = !this.topicsListShowing;
    }

    setTopicLoading(isLoading: boolean) {
        this.topicsLoading = isLoading;
    }
}
