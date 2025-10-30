import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  username = '';
  password = '';
  errorMessage = '';

  onLogin(): void {
    this.errorMessage = '';

    const success = this.authService.login(this.username, this.password);

    if(success) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigate([returnUrl]);
    } else {
      this.errorMessage = 'Invalid username or password.';
    }
  }

}
