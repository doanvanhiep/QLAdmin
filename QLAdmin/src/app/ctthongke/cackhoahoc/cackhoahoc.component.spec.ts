import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CackhoahocComponent } from './cackhoahoc.component';

describe('CackhoahocComponent', () => {
  let component: CackhoahocComponent;
  let fixture: ComponentFixture<CackhoahocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CackhoahocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CackhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
