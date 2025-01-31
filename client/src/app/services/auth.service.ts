import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Makes this service available application-wide
})
export class AuthService {
  isAuthenticated(): boolean {
    // Replace with real authentication logic
    return !!localStorage.getItem('userToken');
  }
}
