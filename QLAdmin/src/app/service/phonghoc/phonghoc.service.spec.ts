/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhonghocService } from './phonghoc.service';

describe('Service: Phonghoc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhonghocService]
    });
  });

  it('should ...', inject([PhonghocService], (service: PhonghocService) => {
    expect(service).toBeTruthy();
  }));
});
