import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFailedDialogComponent } from './register-failed-dialog.component';

describe('RegisterFailedDialogComponent', () => {
  let component: RegisterFailedDialogComponent;
  let fixture: ComponentFixture<RegisterFailedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterFailedDialogComponent]
    });
    fixture = TestBed.createComponent(RegisterFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
