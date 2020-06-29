import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocviendangkyComponent } from './hocviendangky.component';

describe('HocviendangkyComponent', () => {
  let component: HocviendangkyComponent;
  let fixture: ComponentFixture<HocviendangkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocviendangkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocviendangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
