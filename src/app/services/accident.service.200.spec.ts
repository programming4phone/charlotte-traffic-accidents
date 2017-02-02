import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import {AccidentService} from './accident.service';
import { Accident } from '../accident/accident.model';

/*
* For some reason the ResponseOptions in the MockBackend contain
* incorrect values when all of the AccidentService unit tests
* are in the same file. All tests work when in separate files.
*
*/

describe('AirNowService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				BaseRequestOptions,
				MockBackend,
				AccidentService,
				{ provide: Http,
					useFactory: (backend: ConnectionBackend,
                       defaultOptions: BaseRequestOptions) => {
                         return new Http(backend, defaultOptions);
                       }, 
					   deps: [MockBackend, BaseRequestOptions] 
				},
			]
		});
	});

	// sets up an expectation that the correct URL will being requested
	function expectURL(backend: MockBackend, url: string, responseStatus: number, responseBody: string) {
		backend.connections.subscribe(c => {
			expect(c.request.url).toBe(url);
			let response = new ResponseOptions({status: responseStatus, body: responseBody});
			c.mockRespond(new Response(response));
		});
	}

	describe('getAccidents() success', () => {
		it('retrieves accidents',
			inject([AccidentService, MockBackend], fakeAsync((svc, backend) => {
				let testURL: string = 'https://floating-reef-16359.herokuapp.com/accidents';
				let responseStatus: number = 200;
				let responseBody: string = 
					`[{"accidentId":"R0202110200","datetimeAdd":"Thu Feb 02 16:02:14 UTC 2017","address":"601  JOHNSON RD ",
					"latitude":"35.261209","longitude":"-80.811842","accidentDescription":"HIT & RUN-IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202110102","datetimeAdd":"Thu Feb 02 16:01:14 UTC 2017","address":"5301  SOUTH BV ",
					"latitude":"35.164211","longitude":"-80.875594","accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202105802","datetimeAdd":"Thu Feb 02 15:58:37 UTC 2017","address":"3521  GOLDENEYE DR ",
					"latitude":"35.319252","longitude":"-80.904607","accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202102902","datetimeAdd":"Thu Feb 02 15:29:16 UTC 2017","address":"6320 N TRYON ST ",
					"latitude":"35.274096","longitude":"-80.766008","accidentDescription":"HIT & RUN-IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202095500","datetimeAdd":"Thu Feb 02 14:55:20 UTC 2017","address":"8031  OLD STATESVILLE RD ",
					"latitude":"35.331896","longitude":"-80.826247","accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202094500","datetimeAdd":"Thu Feb 02 14:45:20 UTC 2017","address":"1521  OAKDALE RD ",
					"latitude":"35.297205","longitude":"-80.894152","accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202091101","datetimeAdd":"Thu Feb 02 14:11:19 UTC 2017","address":"OLD STEELE CREEK RD & WEST BV",
					"latitude":"35.210190","longitude":"-80.908155","accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"},
					{"accidentId":"R0202083400","datetimeAdd":"Thu Feb 02 13:34:57 UTC 2017","address":"833 E JOHN BELK RA ",
					"latitude":"35.216955","longitude":"-80.843207","accidentDescription":"ACCIDENT IN ROADWAY-PROPERTY DAMAGE"}]`;
				let accidents: Accident[];
				expectURL(backend, testURL, responseStatus, responseBody);
				
				svc.getAccidents().subscribe(
						(results: Accident[]) => { // on sucesss
							tick();
							expect(results.length).toBe(8);
						},
						(err: any) => { // on error
							tick();
							//console.log(err);
							expect(err).toBeUndefined();
						},
						() => { // on completion
						}
				);
			));
		);}
	});

});
