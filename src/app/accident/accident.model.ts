export class Accident {
/*
{"accidentId":"R0106144401",
"datetimeAdd":"Fri Jan 06 19:44:22 UTC 2017",
"address":"9500.  MONROE RD ",
"latitude":"35.142310",
"longitude":"-80.740507",
"accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"}
*/
	accidentId: string;
	datetimeAdd: string;
	address: string;
	latitude: number;
	longitude: number;
	accidentDescription: string;
	
	constructor(
	  accidentId: string,
	  datetimeAdd: string,
	  address: string,
	  latitude: string,
	  longitude: string,
	  accidentDescription: string){
		this.accidentId = accidentId;
		this.datetimeAdd = datetimeAdd;
		this.address = address;
		this.latitude = +latitude;
		this.longitude = +longitude;
		this.accidentDescription = accidentDescription;
	}
}