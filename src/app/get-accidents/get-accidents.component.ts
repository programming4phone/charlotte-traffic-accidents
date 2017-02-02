import { Component, OnInit, EventEmitter } from '@angular/core';
//import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';
import { Accident } from '../accident/accident.model';
import { CurrentBrowserLocation } from './get-accidents.model';
import { AccidentService } from '../services/accident.service';

@Component({
  selector: 'app-get-accidents',
  outputs: ['results','whereami'],
  templateUrl: './get-accidents.component.html',
  styleUrls: ['./get-accidents.component.css']
})
export class GetAccidentsComponent implements OnInit {
	accidents: Accident[];
	currentBrowserLocation: CurrentBrowserLocation = new CurrentBrowserLocation(35.2271, -80.8431); // default to Center City Charlotte;
	loading: EventEmitter<boolean> = new EventEmitter<boolean>();
	results: EventEmitter<Accident[]> = new EventEmitter<Accident[]>();
	whereami: EventEmitter<CurrentBrowserLocation> = new EventEmitter<CurrentBrowserLocation>();

	//constructor(private http: Http) { }
	constructor(private accidentService: AccidentService) { }

	ngOnInit() { 
		this.setCurrentLocation();
		
		/*
			Update the current location every minute.
			If the browser is moving through traffic,
			the distances will be more accurate each 
			time makeRequest() is invoked.
		*/
		let timer = Observable.timer(60000,60000);
		timer.subscribe(t=> {
			this.setCurrentLocation();
		});

	}
	
	private setCurrentLocation(): void{
			/*
			The callback function for getCurrentPosition() has a delayed return.
			The end user may have to answer "yes" to a prompt by the browser to allow location
			data to be extracted by this app. If this code is moved to the makeRequest() method,
			the default CurrentBrowserLocation of Center City Charlotte may be used.
		*/
		if(window.navigator && window.navigator.geolocation){
			window.navigator.geolocation.getCurrentPosition(
				(position) =>{
					this.currentBrowserLocation = new CurrentBrowserLocation(position.coords.latitude, position.coords.longitude);
					console.log("setCurrentLocation() currentBrowserLocation: ", this.currentBrowserLocation);
				},
				(error) =>{
					console.log(`Error determining current browser location: ${error.code}`);
					console.log(this.currentBrowserLocation);
				});
		}
		else{
			console.log("setCurrentLocation() navigator geolocation not available: ",this.currentBrowserLocation);
		}
	
	}

	makeRequest(getButton: HTMLElement) :void {
		getButton.className = "ui loading button";
		
		this.accidentService.getAccidents().subscribe(
				(results: Accident[]) => { // on sucesss
					this.results.emit(results);
				},
				(err: any) => { // on error
					console.log(err);
				},
				() => { // on completion
					this.whereami.emit(this.currentBrowserLocation);
					getButton.className = "ui teal button";
				}
		);
	}
}
