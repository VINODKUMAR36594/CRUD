import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {

  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    const result = this.authService.login(
      this.username,
      this.password
    );

    if (result) {

      this.router.navigate(['/home']);

    } else {

      alert('Invalid Username or Password');

    }
  }
}