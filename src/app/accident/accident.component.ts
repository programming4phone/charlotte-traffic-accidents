import { Component, OnInit } from '@angular/core';
import { Accident } from './accident.model';
import { CurrentBrowserLocation } from '../get-accidents/get-accidents.model';

@Component({
  selector: 'app-accident',
  inputs: ['accident','whereami'],
  templateUrl: './accident.component.html',
  styleUrls: ['./accident.component.css']
})
export class AccidentComponent implements OnInit {

	accident : Accident;
	whereami :CurrentBrowserLocation;
	
	showMap :boolean;
	showMapText :string;
	
	accidentDate: Date;
	earthRadiusMeters :number; 
	milesPerMeter :number;
	piOver180 :number;
	browserLatitudeRadians :number;
	accidentLatitudeRadians :number;
	longitudeDiffRadians :number;
	distanceMeters :number;
	distanceMiles :number;
	
	constructor() { 
		this.earthRadiusMeters = 6371000; 
		this.milesPerMeter = 0.000621371;
		this.piOver180 = Math.PI / 180.0;
		this.showMap = false;
		this.showMapText = "Show Map";
	}

	ngOnInit() {

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
		console.log("distanceFromBrowser() whereami:", this.whereami); // uncomment to take a look
		this.browserLatitudeRadians = this.whereami.latitude * (this.piOver180); 
		this.accidentLatitudeRadians = this.accident.latitude * (this.piOver180); 
		this.longitudeDiffRadians = (this.accident.longitude - this.whereami.longitude) * (this.piOver180); 

		this.distanceMeters = 
			Math.acos( Math.sin(this.browserLatitudeRadians )
			* Math.sin(this.accidentLatitudeRadians) 
			+ Math.cos(this.browserLatitudeRadians)
			* Math.cos(this.accidentLatitudeRadians) 
			* Math.cos(this.longitudeDiffRadians) ) 
			* this.earthRadiusMeters;

		this.distanceMiles = this.distanceMeters * this.milesPerMeter;
 		return this.distanceMiles;
	}

}
