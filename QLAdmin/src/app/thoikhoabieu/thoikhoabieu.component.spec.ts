/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ThoikhoabieuComponent } from './thoikhoabieu.component';

describe('ThoikhoabieuComponent', () => {
  let component: ThoikhoabieuComponent;
  let fixture: ComponentFixture<ThoikhoabieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoikhoabieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoikhoabieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
