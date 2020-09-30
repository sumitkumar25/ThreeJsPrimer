import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancedSpheresComponent } from './instanced-spheres.component';

describe('InstancedSpheresComponent', () => {
  let component: InstancedSpheresComponent;
  let fixture: ComponentFixture<InstancedSpheresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstancedSpheresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstancedSpheresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
