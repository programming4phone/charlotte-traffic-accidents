import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { AccidentComponent } from './accident/accident.component';
import { AccidentListComponent } from './accident-list/accident-list.component';
import { GetAccidentsComponent } from './get-accidents/get-accidents.component';
import { AccidentMapperComponent } from './accident-mapper/accident-mapper.component';

@NgModule({
  declarations: [
    AppComponent,
    AccidentComponent,
    AccidentListComponent,
    GetAccidentsComponent,
    AccidentMapperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvcmGvinGgybxfb6CxlI-EfljbkiAUbew'
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
