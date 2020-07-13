/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuantrivienService } from './quantrivien.service';

describe('Service: Quantrivien', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuantrivienService]
    });
  });

  it('should ...', inject([QuantrivienService], (service: QuantrivienService) => {
    expect(service).toBeTruthy();
  }));
});
