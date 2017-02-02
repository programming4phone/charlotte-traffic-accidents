import {
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';

import {DistanceService} from './distance.service';

describe('DistanceService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				DistanceService
			]
		});
	});

	describe('getDistance', () => {
		it('calculate distance1',
			inject([DistanceService], fakeAsync((svc) => {
				tick();
				let d:number = svc.getDistance(35.1808093, -80.7803191, 35.331896, -80.826247);
				expect(d).toBe(10.755880249693627);
			})));
			
		it('calculate distance2',
			inject([DistanceService], fakeAsync((svc) => {
				tick();
				let d:number = svc.getDistance(35.1808093, -80.7803191, 35.297205, -80.894152);
				expect(d).toBe(10.292810864542751);
			})));
			
		it('calculate distance3',
			inject([DistanceService], fakeAsync((svc) => {
				tick();
				let d:number = svc.getDistance(35.1808093, -80.7803191, 35.065287, -80.845624);
				expect(d).toBe(8.793724479045215);
			})));
			
		it('calculate distance3',
			inject([DistanceService], fakeAsync((svc) => {
				tick();
				let d:number = svc.getDistance(35.1808093, -80.7803191, 35.243606, -80.821808);
				expect(d).toBe(4.930597686206781);
			})));
			
			
			
	});

});
