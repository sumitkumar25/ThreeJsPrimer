import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationPixiComponent } from './visualization-pixi.component';

describe('VisualizationPixiComponent', () => {
  let component: VisualizationPixiComponent;
  let fixture: ComponentFixture<VisualizationPixiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationPixiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationPixiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
