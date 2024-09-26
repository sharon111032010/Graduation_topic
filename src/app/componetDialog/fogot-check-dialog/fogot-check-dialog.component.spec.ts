import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogotCheckDialogComponent } from './fogot-check-dialog.component';

describe('FogotCheckDialogComponent', () => {
  let component: FogotCheckDialogComponent;
  let fixture: ComponentFixture<FogotCheckDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FogotCheckDialogComponent]
    });
    fixture = TestBed.createComponent(FogotCheckDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
