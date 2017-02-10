import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common'; 

import { DistanceService } from './services/distance.service';
import { AccidentService } from './services/accident.service';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { AccidentComponent } from './accident/accident.component';
import { AccidentListComponent } from './accident-list/accident-list.component';
import { GetAccidentsComponent } from './get-accidents/get-accidents.component';
import { AccidentMapperComponent } from './accident-mapper/accident-mapper.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeRouteComponent },
	{ path: 'about', component: AboutComponent },
];

@NgModule({
	declarations: [
		AppComponent,
		AccidentComponent,
		AccidentListComponent,
		GetAccidentsComponent,
		AccidentMapperComponent,
		HomeRouteComponent,
		AboutComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		RouterModule.forRoot(routes),
		AgmCoreModule.forRoot({apiKey: 'your-google-maps-api-key-here'})

	],
	providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		{ provide: APP_BASE_HREF, useValue: './' },
		{ provide: DistanceService, useClass: DistanceService },
		{ provide: AccidentService, useClass: AccidentService }
	],
  bootstrap: [AppComponent]
})
export class AppModule { }

	platformBrowserDynamic().bootstrapModule(AppModule)
		.catch((err: any) => console.error(err));