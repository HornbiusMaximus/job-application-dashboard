import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsFieldComponent } from './application-details-field.component';

describe('ApplicationDetailsFieldComponent', () => {
  let component: ApplicationDetailsFieldComponent;
  let fixture: ComponentFixture<ApplicationDetailsFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDetailsFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailsFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
