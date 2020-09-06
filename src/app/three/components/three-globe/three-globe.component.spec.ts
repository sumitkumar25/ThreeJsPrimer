import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGlobeComponent } from './three-globe.component';

describe('ThreeGlobeComponent', () => {
  let component: ThreeGlobeComponent;
  let fixture: ComponentFixture<ThreeGlobeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeGlobeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
