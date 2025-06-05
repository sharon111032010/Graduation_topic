import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [ CommonModule, FormsModule,],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {

  
  currentStep = 1;
  totalSteps = 3;
  registrationData = {
    email: '',
    firstName: '',
    lastName: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    department: '',
    grade: '',
    phone: ''
  };

  passwordStrengthLabel = '請輸入密碼';
  passwordStrengthClass = '';

  get progressPercent(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  goToStep(step: number) {
    if (step >= 1 && step <= this.totalSteps + 1) {
      this.currentStep = step;
    }
  }

  nextStep() {
    if (this.validateStep(this.currentStep)) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateStep(step: number): boolean {
    switch (step) {
      case 1:
        return (
          this.validateEmail(this.registrationData.email) &&
          this.registrationData.firstName.trim() !== '' &&
          this.registrationData.lastName.trim() !== '' &&
          this.validateStudentId(this.registrationData.studentId)
        );
      case 2:
        return (
          this.registrationData.password.trim() !== '' &&
          this.registrationData.confirmPassword.trim() !== '' &&
          this.registrationData.password === this.registrationData.confirmPassword &&
          this.checkPasswordStrength(this.registrationData.password)
        );
      case 3:
        return (
          this.registrationData.department.trim() !== '' &&
          this.registrationData.grade.trim() !== ''
        );
      default:
        return false;
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateStudentId(id: string): boolean {
    const studentIdRegex = /^[0-9]{6,10}$/;
    return studentIdRegex.test(id);
  }

  checkPasswordStrength(password: string): boolean {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (password.length === 0) {
      this.passwordStrengthLabel = '請輸入密碼';
      this.passwordStrengthClass = '';
      return false;
    }

    if (strength <= 2) {
      this.passwordStrengthLabel = '弱';
      this.passwordStrengthClass = 'weak';
    } else if (strength <= 3) {
      this.passwordStrengthLabel = '中等';
      this.passwordStrengthClass = 'medium';
    } else {
      this.passwordStrengthLabel = '強';
      this.passwordStrengthClass = 'strong';
    }

    return strength >= 3;
  }

  onSubmit() {
    if (this.validateStep(3)) {
      console.log('註冊成功！表單資料如下：');
      console.log(this.registrationData);
      this.currentStep = 4; // 顯示成功畫面
    }
  }

  toLogin() {
    alert('導向登入頁面');
  }
}
