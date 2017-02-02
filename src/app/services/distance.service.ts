import {Injectable} from '@angular/core';

const EARTH_RADIUS_METERS: number = 6371000; 
const MILES_PER_METER: number = 0.000621371;
const PI_OVER_180: number = Math.PI / 180.0;

@Injectable()
export class DistanceService{

	constructor() {	}
	
	/*
		Distance between 2 points is calculated using the Spherical Law of Cosines.
		https://en.wikipedia.org/wiki/Spherical_law_of_cosines
		
		Alternatively, the Pythagorean theorem could be used, but it is only
		optimal for short distances (feet,yards) and loses accuracy for longer 
		distances (miles, kilometers).
	*/
	getDistance(fromLatitude: number, fromLongitude:number, toLatitude:number, toLongitude:number) :number{

		//console.log("DistanceService::getDistance() fromLatitude:", fromLatitude); // uncomment to take a look
		//console.log("DistanceService::getDistance() fromLongitude:", fromLongitude); // uncomment to take a look
		//console.log("DistanceService::getDistance() toLatitude:", toLatitude); // uncomment to take a look
		//console.log("DistanceService::getDistance() toLongitude:", toLongitude); // uncomment to take a look
		
		let fromLatitudeRadians: number = fromLatitude * (PI_OVER_180); 
		
		let toLatitudeRadians: number = toLatitude * (PI_OVER_180); 
		
		let longitudeDiffRadians: number = (toLongitude - fromLongitude) * (PI_OVER_180); 

		let distanceMeters: number = 
			Math.acos( Math.sin(fromLatitudeRadians )
			* Math.sin(toLatitudeRadians) 
			+ Math.cos(fromLatitudeRadians)
			* Math.cos(toLatitudeRadians) 
			* Math.cos(longitudeDiffRadians) ) 
			* EARTH_RADIUS_METERS;

		let distanceMiles: number = distanceMeters * MILES_PER_METER;
		//console.log("DistanceService::getDistance() distanceMiles:", distanceMiles); // uncomment to take a look
		
		return distanceMiles;
	}

}