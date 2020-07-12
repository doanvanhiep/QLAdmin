/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BaonghiComponent } from './baonghi.component';

describe('BaonghiComponent', () => {
  let component: BaonghiComponent;
  let fixture: ComponentFixture<BaonghiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaonghiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaonghiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
