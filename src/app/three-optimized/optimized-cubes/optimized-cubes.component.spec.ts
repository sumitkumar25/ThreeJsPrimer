import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizedCubesComponent } from './optimized-cubes.component';

describe('OptimizedCubesComponent', () => {
  let component: OptimizedCubesComponent;
  let fixture: ComponentFixture<OptimizedCubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptimizedCubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptimizedCubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
