import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCategoryMatchesComponent } from './display-category-matches.component';

describe('DisplayCategoryMatchesComponent', () => {
  let component: DisplayCategoryMatchesComponent;
  let fixture: ComponentFixture<DisplayCategoryMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayCategoryMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCategoryMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
