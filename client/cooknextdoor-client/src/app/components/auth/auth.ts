import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/restaurants']);
        },
        error: (errorMessage: string) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    } else {
      const name = form.value.name;
      this.authService.signup(name, email, password).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/restaurants']);
        },
        error: (errorMessage: string) => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    }

    form.reset();
  }

}
