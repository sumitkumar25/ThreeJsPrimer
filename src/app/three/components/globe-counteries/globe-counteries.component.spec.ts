import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobeCounteriesComponent } from './globe-counteries.component';

describe('GlobeCounteriesComponent', () => {
  let component: GlobeCounteriesComponent;
  let fixture: ComponentFixture<GlobeCounteriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobeCounteriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobeCounteriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
