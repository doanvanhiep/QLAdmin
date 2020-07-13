/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BaonghiService } from './baonghi.service';

describe('Service: Baonghi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaonghiService]
    });
  });

  it('should ...', inject([BaonghiService], (service: BaonghiService) => {
    expect(service).toBeTruthy();
  }));
});
