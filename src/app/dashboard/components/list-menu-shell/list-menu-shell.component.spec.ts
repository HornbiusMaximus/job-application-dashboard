import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMenuShellComponent } from './list-menu-shell.component';

describe('ListMenuShellComponent', () => {
  let component: ListMenuShellComponent;
  let fixture: ComponentFixture<ListMenuShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMenuShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMenuShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
