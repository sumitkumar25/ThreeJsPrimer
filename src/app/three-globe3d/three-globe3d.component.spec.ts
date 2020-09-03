import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeGlobe3dComponent } from './three-globe3d.component';

describe('ThreeGlobe3dComponent', () => {
  let component: ThreeGlobe3dComponent;
  let fixture: ComponentFixture<ThreeGlobe3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeGlobe3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeGlobe3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
