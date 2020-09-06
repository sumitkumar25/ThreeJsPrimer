import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationD3Component } from './visualization-d3.component';

describe('VisualizationD3Component', () => {
  let component: VisualizationD3Component;
  let fixture: ComponentFixture<VisualizationD3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationD3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationD3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
