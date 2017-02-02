import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Accident } from '../accident/accident.model';

const accidentCollectorUrl: string = "https://floating-reef-16359.herokuapp.com/accidents";

@Injectable()
export class AccidentService{

	constructor(private http: Http) {}
	
	getAccidents(): Observable<Accident[]> {
		return this.http.get(accidentCollectorUrl)
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

	/*
	* Handle error extracting data from the response body
	*/
	private handleError (error: Response | any) {
		let errStatus: number;
		if (error instanceof Response) {
			errStatus = error.status;
		} 
		else {
			errStatus = 500; // assumes server error
		}
		return Observable.throw(errStatus);
	}
}