import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFailedDialogComponent } from './login-failed-dialog.component';

describe('LoginFailedDialogComponent', () => {
  let component: LoginFailedDialogComponent;
  let fixture: ComponentFixture<LoginFailedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFailedDialogComponent]
    });
    fixture = TestBed.createComponent(LoginFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
