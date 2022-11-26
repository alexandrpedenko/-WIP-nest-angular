import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { passwordContainsNumber, passwordsMatch } from '@shared/utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, {
        validators: [Validators.required],
      }],
      email: [null, {
        validators: [
          Validators.required,
          Validators.email,
        ],
      }],
      password: [null, {
        validators: [
          Validators.required,
          Validators.minLength(6),
          passwordContainsNumber
        ],
      }],
      confirmPassword: [null, {
        validators: [Validators.required, passwordsMatch],
      }]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register({
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      userName: this.registerForm.value.username,
    }).subscribe();
  }

  get username() {
    return this.registerForm.get('username');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
