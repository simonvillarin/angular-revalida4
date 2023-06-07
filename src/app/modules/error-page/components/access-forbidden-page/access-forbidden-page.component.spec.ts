import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessForbiddenPageComponent } from './access-forbidden-page.component';

describe('AccessForbiddenPageComponent', () => {
  let component: AccessForbiddenPageComponent;
  let fixture: ComponentFixture<AccessForbiddenPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessForbiddenPageComponent]
    });
    fixture = TestBed.createComponent(AccessForbiddenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
