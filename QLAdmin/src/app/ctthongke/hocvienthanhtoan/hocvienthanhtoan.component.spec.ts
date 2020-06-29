import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HocvienthanhtoanComponent } from './hocvienthanhtoan.component';

describe('HocvienthanhtoanComponent', () => {
  let component: HocvienthanhtoanComponent;
  let fixture: ComponentFixture<HocvienthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocvienthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocvienthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
