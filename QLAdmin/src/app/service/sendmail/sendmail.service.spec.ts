/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SendmailService } from './sendmail.service';

describe('Service: Sendmail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendmailService]
    });
  });

  it('should ...', inject([SendmailService], (service: SendmailService) => {
    expect(service).toBeTruthy();
  }));
});
