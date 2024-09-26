import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSuccessfulDialogComponent } from './login-successful-dialog.component';

describe('LoginSuccessfulDialogComponent', () => {
  let component: LoginSuccessfulDialogComponent;
  let fixture: ComponentFixture<LoginSuccessfulDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSuccessfulDialogComponent]
    });
    fixture = TestBed.createComponent(LoginSuccessfulDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
