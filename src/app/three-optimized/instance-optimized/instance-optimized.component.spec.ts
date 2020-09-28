import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceOptimizedComponent } from './instance-optimized.component';

describe('InstanceOptimizedComponent', () => {
  let component: InstanceOptimizedComponent;
  let fixture: ComponentFixture<InstanceOptimizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceOptimizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceOptimizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
