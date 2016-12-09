import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicListComponent } from './topics/topic-list.component';
import { TopicsService } from './topics/topics.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        TopicsComponent
    ],
    providers: [
        TopicsService
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
