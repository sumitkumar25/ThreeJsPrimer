import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationThreeComponent } from './visualization-three.component';

describe('VisualizationThreeComponent', () => {
  let component: VisualizationThreeComponent;
  let fixture: ComponentFixture<VisualizationThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
