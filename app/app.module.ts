import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        AppComponent,
        TopicsComponent
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
