import { Component, OnInit, EventEmitter } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';
import { Accident } from '../accident/accident.model';
import { CurrentBrowserLocation } from './get-accidents.model';

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

	constructor(private http: Http) { }

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
		
		this.search('https://floating-reef-16359.herokuapp.com/accidents').subscribe(
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

	private search(queryUrl: string): Observable<Accident[]> {
		return this.http.get(queryUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}
	
	private extractData(res: Response) {
		/*
			Be careful here. The JSON returned is an array of objects
		*/
		return (<any>res.json())
			.map(item => {
				console.log("raw item", item); // uncomment if you want to debug
				return new Accident(
					item.accidentId,
					item.datetimeAdd,
					item.address,
					item.latitude,
					item.longitude,
					item.accidentDescription
				);
			});
	}
	
	
	
	private handleError (error: Response | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.error || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} 
		else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}


}
