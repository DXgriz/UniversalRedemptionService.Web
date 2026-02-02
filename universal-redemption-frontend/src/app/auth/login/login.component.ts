import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { LoginRequest } from '../../shared/models/auth.models';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../shared/layout/auth-layout.css']
})
export class LoginComponent {
  title = 'Welcome Back!';
  subtitle = 'Login to continue to your dashboard';
  buttonText = 'Login';
  switchText = "Don't have an account?";
  switchLinkText = 'Register';
  switchLink = '/register';

  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  submit(): void {
  if (this.form.invalid) return;
  
  const formValue = this.form.getRawValue();

  const payload: LoginRequest = {
    email: formValue.email, 
    password: formValue.password
  };

  this.loading = true;
  this.error = '';

  this.authService.login(payload).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['/dashboard']);
    },
    error: (err) => {
      this.error = err.error?.message || 'Login failed. Please try again.';
      this.loading = false;
    }
  });
}

}
