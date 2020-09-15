import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectGroupComponent } from './object-group.component';

describe('ObjectGroupComponent', () => {
  let component: ObjectGroupComponent;
  let fixture: ComponentFixture<ObjectGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
