import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicPostComponent } from './topic-post/topic-post.component';
import { TopicsService } from './topics/topics.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        TopicsComponent,
        TopicPostComponent
    ],
    providers: [
        TopicsService,
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
