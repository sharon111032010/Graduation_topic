import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSuccessfulDialogComponent } from './register-successful-dialog.component';

describe('RegisterSuccessfulDialogComponent', () => {
  let component: RegisterSuccessfulDialogComponent;
  let fixture: ComponentFixture<RegisterSuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(RegisterSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
