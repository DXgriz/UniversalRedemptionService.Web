import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RegisterRequest } from '../../shared/models/auth.models';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../shared/layout/auth-layout.css']
})
export class RegisterComponent {

  title = 'Create Account';
  subtitle = 'Sign up to access the dashboard';
  buttonText = 'Register';
  switchText = 'Already have an account?';
  switchLinkText = 'Login';
  switchLink = '/login';

  form: FormGroup<{
    fullName: FormControl<string>;
    phoneNumber: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
  fullName: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  phoneNumber: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
});

  }

  submit(): void {
  if (this.form.invalid) return;

  const formValue = this.form.getRawValue();

  if (formValue.password !== formValue.confirmPassword) {
    this.error = 'Passwords do not match!';
    return;
  }

  const payload: RegisterRequest = {
    fullName: formValue.fullName,
    email: formValue.email,
    phoneNumber: formValue.phoneNumber,
    password: formValue.password
  };

  this.loading = true;
  this.error = '';

  this.authService.register(payload).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      console.error('API Error:', err);
      this.error = err.error?.message || 'Registration failed. Please try again.';
      this.loading = false;
    }
  });
}


}
