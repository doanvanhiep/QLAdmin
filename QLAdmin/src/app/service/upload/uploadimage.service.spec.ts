/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadimageService } from './uploadimage.service';

describe('Service: Uploadimage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadimageService]
    });
  });

  it('should ...', inject([UploadimageService], (service: UploadimageService) => {
    expect(service).toBeTruthy();
  }));
});
