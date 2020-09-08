import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtVisualizationComponent } from './ct-visualization.component';

describe('CtVisualizationComponent', () => {
  let component: CtVisualizationComponent;
  let fixture: ComponentFixture<CtVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
