import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTabsComponent } from './all-tabs.component';

describe('AllTabsComponent', () => {
  let component: AllTabsComponent;
  let fixture: ComponentFixture<AllTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTabsComponent]
    });
    fixture = TestBed.createComponent(AllTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
