/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaobuComponent } from './baobu.component';

describe('BaobuComponent', () => {
  let component: BaobuComponent;
  let fixture: ComponentFixture<BaobuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaobuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaobuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
