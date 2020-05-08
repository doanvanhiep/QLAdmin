/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KhoahocService } from './khoahoc.service';

describe('Service: Khoahoc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KhoahocService]
    });
  });

  it('should ...', inject([KhoahocService], (service: KhoahocService) => {
    expect(service).toBeTruthy();
  }));
});
