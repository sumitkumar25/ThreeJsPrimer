import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedNodesComponent } from './connected-nodes.component';

describe('ConnectedNodesComponent', () => {
  let component: ConnectedNodesComponent;
  let fixture: ComponentFixture<ConnectedNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedNodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
