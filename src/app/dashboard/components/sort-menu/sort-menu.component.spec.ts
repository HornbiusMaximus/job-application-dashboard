import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortMenuComponent } from './sort-menu.component';

describe('SortMenuComponent', () => {
  let component: SortMenuComponent;
  let fixture: ComponentFixture<SortMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
