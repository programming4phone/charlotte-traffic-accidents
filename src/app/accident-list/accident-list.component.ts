import { Component, OnInit } from '@angular/core';
import { Accident } from '../accident/accident.model';
import { CurrentBrowserLocation } from '../get-accidents/get-accidents.model';

@Component({
  selector: 'app-accident-list',
  inputs: ['accidents', 'whereami'],
  templateUrl: './accident-list.component.html',
  styleUrls: ['./accident-list.component.css']
})
export class AccidentListComponent implements OnInit {
	accidents: Accident[];
	whereami: CurrentBrowserLocation;
	
	constructor() { }

	ngOnInit() { }

}
