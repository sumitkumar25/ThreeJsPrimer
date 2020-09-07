import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobePackageComponent } from './globe-package.component';

describe('GlobePackageComponent', () => {
  let component: GlobePackageComponent;
  let fixture: ComponentFixture<GlobePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
