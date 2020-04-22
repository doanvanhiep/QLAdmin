/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DasboardService } from './dasboard.service';

describe('Service: Dasboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DasboardService]
    });
  });

  it('should ...', inject([DasboardService], (service: DasboardService) => {
    expect(service).toBeTruthy();
  }));
});
