import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhthudangkyComponent } from './doanhthudangky.component';

describe('DoanhthudangkyComponent', () => {
  let component: DoanhthudangkyComponent;
  let fixture: ComponentFixture<DoanhthudangkyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoanhthudangkyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoanhthudangkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
