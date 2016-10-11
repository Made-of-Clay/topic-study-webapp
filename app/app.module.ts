import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicListComponent } from './topics/topic-list.component';
import { TopicService } from './topics/topic.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        TopicsComponent
    ],
    providers: [
        TopicService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
