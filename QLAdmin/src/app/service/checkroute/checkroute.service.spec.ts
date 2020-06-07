/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CheckrouteService } from './checkroute.service';

describe('Service: Checkroute', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckrouteService]
    });
  });

  it('should ...', inject([CheckrouteService], (service: CheckrouteService) => {
    expect(service).toBeTruthy();
  }));
});
