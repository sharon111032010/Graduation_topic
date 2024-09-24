import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { zipAll } from 'rxjs';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent {
  forgot_group = new FormGroup({
    forgot_stuId: new FormControl(""),
    forgot_email: new FormControl("", [Validators.required, Validators.email])
  })
  sant_change_email() {
    
    const info={
      ...this.forgot_group.getRawValue()
    }

    alert(`學號: ${info.forgot_stuId}\n郵件: ${info.forgot_email}`)
    // alert("success");
  }
}
