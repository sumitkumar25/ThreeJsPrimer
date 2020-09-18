import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoptimizedCubesComponent } from './unoptimized-cubes.component';

describe('UnoptimizedCubesComponent', () => {
  let component: UnoptimizedCubesComponent;
  let fixture: ComponentFixture<UnoptimizedCubesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnoptimizedCubesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnoptimizedCubesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
