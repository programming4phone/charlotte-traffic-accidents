import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accident-mapper',
  inputs: ['lat', 'lng'],
  templateUrl: './accident-mapper.component.html',
  styleUrls: ['./accident-mapper.component.css']
})
export class AccidentMapperComponent implements OnInit {

	lat: number;
	lng: number;
  
  constructor() { }

  ngOnInit() {
  }

}
