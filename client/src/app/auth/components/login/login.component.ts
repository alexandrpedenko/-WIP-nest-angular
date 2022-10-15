import { Component } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login('newUser@email.com', 'mynewpassword').subscribe((data) => {});
  }
}
