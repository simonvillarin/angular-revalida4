import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPage404Component } from './error-page404.component';

describe('ErrorPage404Component', () => {
  let component: ErrorPage404Component;
  let fixture: ComponentFixture<ErrorPage404Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPage404Component]
    });
    fixture = TestBed.createComponent(ErrorPage404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
