import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGlobeGlIntfrastructureComponent } from './ct-globe-gl-intfrastructure.component';

describe('CtGlobeGlIntfrastructureComponent', () => {
  let component: CtGlobeGlIntfrastructureComponent;
  let fixture: ComponentFixture<CtGlobeGlIntfrastructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtGlobeGlIntfrastructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtGlobeGlIntfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
