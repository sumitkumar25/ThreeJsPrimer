import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtGlobeInfrastructureComponent } from './ct-globe-infrastructure.component';

describe('CtGlobeInfrastructureComponent', () => {
  let component: CtGlobeInfrastructureComponent;
  let fixture: ComponentFixture<CtGlobeInfrastructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtGlobeInfrastructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtGlobeInfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
