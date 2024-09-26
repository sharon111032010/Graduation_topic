import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotCheckFailedDialogComponent } from './fogot-check-failed-dialog.component';

describe('FogotCheckFailedDialogComponent', () => {
  let component: FogotCheckFailedDialogComponent;
  let fixture: ComponentFixture<FogotCheckFailedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FogotCheckFailedDialogComponent]
    });
    fixture = TestBed.createComponent(FogotCheckFailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
