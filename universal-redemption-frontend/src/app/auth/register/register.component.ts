import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FooterComponent } from "../../shared/components/footer/footer.component";

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
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const { email, password, confirmPassword } = this.form.value;

    if (password !== confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register({ email, password }).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.error = err.error?.message ?? 'Registration failed';
        this.loading = false;
      }
    });
  }
}
