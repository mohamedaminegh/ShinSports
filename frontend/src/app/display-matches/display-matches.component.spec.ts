import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMatchesComponent } from './display-matches.component';

describe('DisplayMatchesComponent', () => {
  let component: DisplayMatchesComponent;
  let fixture: ComponentFixture<DisplayMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
