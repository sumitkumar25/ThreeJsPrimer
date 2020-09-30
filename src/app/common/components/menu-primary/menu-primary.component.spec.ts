import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPrimaryComponent } from './menu-primary.component';

describe('MenuPrimaryComponent', () => {
  let component: MenuPrimaryComponent;
  let fixture: ComponentFixture<MenuPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
