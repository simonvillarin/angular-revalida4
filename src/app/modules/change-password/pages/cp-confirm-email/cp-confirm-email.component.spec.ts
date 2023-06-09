import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpConfirmEmailComponent } from './cp-confirm-email.component';

describe('CpConfirmEmailComponent', () => {
  let component: CpConfirmEmailComponent;
  let fixture: ComponentFixture<CpConfirmEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CpConfirmEmailComponent]
    });
    fixture = TestBed.createComponent(CpConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
