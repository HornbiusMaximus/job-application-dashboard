import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsCardComponent } from './application-details-card.component';

describe('ApplicationDetailsCardComponent', () => {
  let component: ApplicationDetailsCardComponent;
  let fixture: ComponentFixture<ApplicationDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
