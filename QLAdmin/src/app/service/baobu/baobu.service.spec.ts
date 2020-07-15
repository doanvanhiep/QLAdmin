/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaobuService } from './baobu.service';

describe('Service: Baobu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaobuService]
    });
  });

  it('should ...', inject([BaobuService], (service: BaobuService) => {
    expect(service).toBeTruthy();
  }));
});
