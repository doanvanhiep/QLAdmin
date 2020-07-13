/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HocvienService } from './hocvien.service';

describe('Service: Hocvien', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HocvienService]
    });
  });

  it('should ...', inject([HocvienService], (service: HocvienService) => {
    expect(service).toBeTruthy();
  }));
});
