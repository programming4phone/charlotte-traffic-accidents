import { Component } from '@angular/core';
import { Accident } from './accident/accident.model';
import { CurrentBrowserLocation } from './get-accidents/get-accidents.model';
import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	results: Accident[];
	whereami: CurrentBrowserLocation;
  
	/*
		Process output from app-get-accidents component.
		Store the array of Accident(s) for use by the app-accident-list component.
	*/
	updateResults(results: Accident[]): void {
		this.results = results;
		console.log("results:", this.results);
	}
	
	/*
		Process output from app-get-accidents component.
		Store the CurrentBrowserLocation for use by the app-accident-list component.
	*/
	updateCurrentBrowserLocation(whereami: CurrentBrowserLocation): void {
		this.whereami = whereami;
		console.log("updateCurrentBrowserLocation() whereami:", this.whereami); // uncomment to take a look
	}
}
