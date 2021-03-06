/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HocvienComponent } from './hocvien.component';

describe('HocvienComponent', () => {
  let component: HocvienComponent;
  let fixture: ComponentFixture<HocvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
