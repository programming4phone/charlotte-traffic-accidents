import { Component } from '@angular/core';
import { Accident } from './accident.model';
import { CurrentBrowserLocation } from '../get-accidents/get-accidents.model';
import { DistanceService } from '../services/distance.service';

@Component({
  selector: 'app-accident',
  inputs: ['accident','whereami'],
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent {

	accident : Accident;
	whereami :CurrentBrowserLocation;
	
	showMap :boolean;
	showMapText :string;
	
	accidentDate: Date;
	
	constructor(private distanceService: DistanceService) { 
		this.showMap = false;
		this.showMapText = "Show Map";
	}

	toggleMap(): void{
		this.showMap = !this.showMap;
		this.showMap ? this.showMapText = "Hide Map" : this.showMapText = "Show Map";
	}
	
	/*
	* Prepares the accident.datetimeAdd for formatting
	*/
	formatDate() :Date {
		this.accidentDate = new Date(this.accident.datetimeAdd);
		return this.accidentDate;
	}
	
	distanceFromBrowser() :number{
		return this.distanceService.getDistance(this.whereami.latitude, this.whereami.longitude, this.accident.latitude, this.accident.longitude);
	}

}
