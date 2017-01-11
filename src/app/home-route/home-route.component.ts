import { Component } from '@angular/core';
import { Accident } from '../accident/accident.model';
import { CurrentBrowserLocation } from '../get-accidents/get-accidents.model';

@Component({
  selector: 'app-home-route',
  templateUrl: './home-route.component.html',
  styleUrls: ['./home-route.component.css']
})
export class HomeRouteComponent {

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
