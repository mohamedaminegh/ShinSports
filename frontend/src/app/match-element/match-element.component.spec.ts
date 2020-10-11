import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchElementComponent } from './match-element.component';

describe('MatchElementComponent', () => {
  let component: MatchElementComponent;
  let fixture: ComponentFixture<MatchElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
