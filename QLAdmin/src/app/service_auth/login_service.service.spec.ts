/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Login_serviceService } from './login_service.service';

describe('Service: Login_service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Login_serviceService]
    });
  });

  it('should ...', inject([Login_serviceService], (service: Login_serviceService) => {
    expect(service).toBeTruthy();
  }));
});
