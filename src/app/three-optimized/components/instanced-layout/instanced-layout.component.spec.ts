import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancedLayoutComponent } from './instanced-layout.component';

describe('InstancedLayoutComponent', () => {
  let component: InstancedLayoutComponent;
  let fixture: ComponentFixture<InstancedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
