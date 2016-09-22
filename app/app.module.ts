import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicComponent } from './topic/topic.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        AppComponent,
        TopicComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
