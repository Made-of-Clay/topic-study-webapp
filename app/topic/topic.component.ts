/// <reference path="verse.d.ts" />

import { Component } from '@angular/core';

@Component({
    selector: 'moc-topic',
    templateUrl: 'app/topic/topic.component.html'
})

export class TopicComponent {
    verses: Verse[]
}