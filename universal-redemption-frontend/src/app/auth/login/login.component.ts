import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FooterComponent } from "../../shared/components/footer/footer.component";

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

    this.loading = true;
    this.error = '';

    const formValue = this.form.getRawValue();

    this.authService.login(formValue).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: err => {
        this.error = err.error?.message ?? 'Login failed';
        this.loading = false;
      }
    });
  }
}
