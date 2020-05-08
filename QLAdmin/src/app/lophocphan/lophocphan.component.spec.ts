/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LophocphanComponent } from './lophocphan.component';

describe('LophocphanComponent', () => {
  let component: LophocphanComponent;
  let fixture: ComponentFixture<LophocphanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LophocphanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LophocphanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
