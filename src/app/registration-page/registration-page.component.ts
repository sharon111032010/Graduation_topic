import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginSystemService } from '../@service/login-system.service';
import { IRegisterReq } from '../@InterfaceAPI/ILoginSystem';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {


  currentStep = 1;
  totalSteps = 3;
  registrationForm: FormGroup;
  passwordStrength = { label: '請輸入密碼', class: '' };
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private RegisterService: LoginSystemService
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      studentId: ['', [Validators.required, this.studentIdValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      department: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      account: ['',[Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // 監聽密碼變化
    this.registrationForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordStrength();
    });

    this.registrationForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.registrationForm.get('confirmPassword')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  // 自定義驗證器：學號格式
  studentIdValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;

    const studentIdRegex = /^[0-9]{6,10}$/;
    return studentIdRegex.test(value) ? null : { invalidStudentId: true };
  }


  // 自定義驗證器：密碼確認
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // 檢查密碼強度
  checkPasswordStrength() {
    const password = this.registrationForm.get('password')?.value || '';
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length === 0) {
      this.passwordStrength = { label: '請輸入密碼', class: '' };
    } else if (strength <= 2) {
      this.passwordStrength = { label: '弱', class: 'strength-weak' };
    } else if (strength <= 3) {
      this.passwordStrength = { label: '中等', class: 'strength-medium' };
    } else {
      this.passwordStrength = { label: '強', class: 'strength-strong' };
    }
  }

  // 驗證當前步驟
  validateCurrentStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.registrationForm.get('email')?.valid &&
          !!this.registrationForm.get('firstName')?.valid &&
          !!this.registrationForm.get('studentId')?.valid;
      case 2:
        return !!this.registrationForm.get('password')?.valid &&
          !!this.registrationForm.get('confirmPassword')?.valid &&
          !this.registrationForm.hasError('passwordMismatch');
      case 3:
        return !!this.registrationForm.get('department')?.valid &&
          !!this.registrationForm.get('grade')?.valid;
      default:
        return false;
    }
  }

  // 下一步
  nextStep() {
    if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      } else {
        this.completeRegistration();
      }
    } else {
      this.markCurrentStepFieldsAsTouched();
    }
  }

  // 上一步
  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // 標記當前步驟的字段為已觸摸，以顯示驗證錯誤
  markCurrentStepFieldsAsTouched() {
    switch (this.currentStep) {
      case 1:
        ['email', 'firstName',  'studentId'].forEach(field => {
          this.registrationForm.get(field)?.markAsTouched();
        });
        break;
      case 2:
        ['password', 'confirmPassword'].forEach(field => {
          this.registrationForm.get(field)?.markAsTouched();
        });
        break;
      case 3:
        ['department', 'grade'].forEach(field => {
          this.registrationForm.get(field)?.markAsTouched();
        });
        break;
    }
  }

  // 完成註冊
  completeRegistration() {
    
    if (this.registrationForm.valid) {
      // 模擬註冊過程
      console.log('註冊資料：', this.registrationForm.value);

      // 這裡可以調用實際的註冊 API

      const registerData :IRegisterReq= {
        email: this.registrationForm.get('email')?.value,
        name: this.registrationForm.get('firstName')?.value,
        stuId: this.registrationForm.get('studentId')?.value,
        password: this.registrationForm.get('password')?.value,
        // department: this.registrationForm.get('department')?.value,
        // grade: this.registrationForm.get('grade')?.value,
        account: this.registrationForm.get('account')?.value
      };

      this.RegisterService.RegisterAPI(registerData).subscribe({
        next: (res) => {
          if (!res.isSuccess) {
            console.error('註冊失敗', res.message);
            this.currentStep = 5; // 失敗頁面
            return;
          }
          console.log('註冊成功', res);
          this.currentStep = 4; // 成功頁面
        },
        error: (error) => {
          console.error('註冊失敗', error);
          this.errorMessage="註冊失敗，帳號或郵件重複錯誤，請重新輸入";
          this.currentStep = 5;
        }
      });
    } else {
      this.markCurrentStepFieldsAsTouched();
    }
  }

  // 獲取進度百分比
  get progressPercent(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  // 獲取進度文字
  get progressText(): string {
    if (this.currentStep === 5) {
      return '註冊失敗，請重新嘗試';
    }
    else if(this.currentStep > this.totalSteps) {
      return '註冊完成！';
    }
    return `第 ${this.currentStep} 步，共 ${this.totalSteps} 步`;
  }

  // 檢查字段是否有錯誤且已被觸摸
  hasError(fieldName: string, errorType?: string): boolean {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.touched) return false;

    if (errorType) {
      return field.hasError(errorType);
    }
    return field.invalid;
  }

  // 獲取字段錯誤訊息
  getErrorMessage(fieldName: string): string {
    const field = this.registrationForm.get(fieldName);
    if (!field || !field.touched || !field.errors) return '';

    const errors = field.errors;

    if (errors['required']) return '此欄位為必填';
    if (errors['email']) return '請輸入有效的電子郵件格式';
    if (errors['invalidStudentId']) return '請輸入有效的學號格式（6-10位數字）';
    if (errors['minlength']) return '密碼至少需要8個字符';

    return '';
  }

  // 獲取密碼確認錯誤訊息
  getPasswordConfirmError(): string {
    const confirmField = this.registrationForm.get('confirmPassword');
    if (!confirmField || !confirmField.touched) return '';

    if (this.registrationForm.hasError('passwordMismatch')) {
      return '密碼不一致';
    }
    return '';
  }

  // 導向登入頁面
  goToLogin() {
    console.log('導向登入頁面');
    // 這裡可以使用 Router 導航到登入頁面
    this.router.navigate(['/loginPage']);
  }

  // 系所選項
  departments = [
    { value: 'computer-science', label: '資訊工程系' },
    { value: 'electrical', label: '電機工程系' },
    { value: 'mechanical', label: '機械工程系' },
    { value: 'business', label: '企業管理系' },
    { value: 'psychology', label: '心理學系' },
    { value: 'other', label: '其他' }
  ];

  // 年級選項
  grades = [
    { value: '1', label: '大一' },
    { value: '2', label: '大二' },
    { value: '3', label: '大三' },
    { value: '4', label: '大四' },
    { value: 'graduate', label: '研究生' },
    { value: 'phd', label: '博士生' }
  ];
}