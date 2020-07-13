/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuantrivienComponent } from './quantrivien.component';

describe('QuantrivienComponent', () => {
  let component: QuantrivienComponent;
  let fixture: ComponentFixture<QuantrivienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantrivienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantrivienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
