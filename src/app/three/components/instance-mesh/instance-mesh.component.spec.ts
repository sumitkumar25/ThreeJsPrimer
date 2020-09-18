import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceMeshComponent } from './instance-mesh.component';

describe('InstanceMeshComponent', () => {
  let component: InstanceMeshComponent;
  let fixture: ComponentFixture<InstanceMeshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceMeshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceMeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
