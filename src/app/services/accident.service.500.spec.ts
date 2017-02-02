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

	describe('getAccidents() internal server error', () => {
		it('retrieves accidents',
			inject([AccidentService, MockBackend], fakeAsync((svc, backend) => {
				let testURL: string = 'https://floating-reef-16359.herokuapp.com/accidents';
				let responseStatus: number = 500;
				let responseBody: string;
				let accidents: Accident[];
				expectURL(backend, testURL, responseStatus, responseBody);
				
				svc.getAccidents().subscribe(
						(results: Accident[]) => { // on sucesss
							tick();
							expect(results).toBeUndefined();
						},
						(err: any) => { // on error
							tick();
							expect(err).toBe(500);
						},
						() => { // on completion
						}
				);
			));
		);}
	});

});
