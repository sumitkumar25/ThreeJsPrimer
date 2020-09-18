import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeOptimizedComponent } from './three-optimized.component';

describe('ThreeOptimizedComponent', () => {
  let component: ThreeOptimizedComponent;
  let fixture: ComponentFixture<ThreeOptimizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeOptimizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeOptimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
