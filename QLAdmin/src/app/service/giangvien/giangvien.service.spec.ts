/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GiangvienService } from './giangvien.service';

describe('Service: Giangvien', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiangvienService]
    });
  });

  it('should ...', inject([GiangvienService], (service: GiangvienService) => {
    expect(service).toBeTruthy();
  }));
});
