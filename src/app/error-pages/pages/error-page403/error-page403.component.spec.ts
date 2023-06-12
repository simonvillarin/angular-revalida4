import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPage403Component } from './error-page403.component';

describe('ErrorPage403Component', () => {
  let component: ErrorPage403Component;
  let fixture: ComponentFixture<ErrorPage403Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPage403Component]
    });
    fixture = TestBed.createComponent(ErrorPage403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
