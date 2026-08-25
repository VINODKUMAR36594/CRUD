import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(username: string, password: string): boolean {

    if (username === 'admin' && password === '1234') {

      sessionStorage.setItem('isLoggedIn', 'true');

      return true;
    }

    return false;
  }

  isLoggedIn(): boolean {

    return sessionStorage.getItem('isLoggedIn') === 'true';

  }

  logout(): void {

    sessionStorage.removeItem('isLoggedIn');

  }
}