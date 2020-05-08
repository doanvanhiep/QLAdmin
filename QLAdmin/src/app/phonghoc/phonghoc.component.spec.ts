/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhonghocComponent } from './phonghoc.component';

describe('PhonghocComponent', () => {
  let component: PhonghocComponent;
  let fixture: ComponentFixture<PhonghocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonghocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonghocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
