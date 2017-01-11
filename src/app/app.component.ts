import { Component, OnInit} from '@angular/core';

import './rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

	maxDistance: number;
	
	ngOnInit() { 
		this.maxDistance = Number(window.localStorage.getItem("maxDistance"));
		if(!this.maxDistance){
			window.localStorage.setItem("maxDistance","100");
		}
	}
}
