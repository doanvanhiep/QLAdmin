/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LophocService } from './lophoc.service';

describe('Service: Lophoc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LophocService]
    });
  });

  it('should ...', inject([LophocService], (service: LophocService) => {
    expect(service).toBeTruthy();
  }));
});
