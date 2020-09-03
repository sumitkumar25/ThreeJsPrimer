import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeSolarSystemComponent } from './three-solar-system.component';

describe('ThreeSolarSystemComponent', () => {
  let component: ThreeSolarSystemComponent;
  let fixture: ComponentFixture<ThreeSolarSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeSolarSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeSolarSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
