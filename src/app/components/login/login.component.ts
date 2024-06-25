import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // // check if email and password match
    // if (
    //   this.loginForm.value.email === 'mailto:sanjana03@gmail.com' &&
    //   this.loginForm.value.password === 'sanjana'
    // ) {
    //   // login successful
    //   alert('Login successful!');
    // } else {
    //   // invalid login
    //   alert('Invalid email or password');
    // }

    // Send login credentials to the backend
    this.http
      .post('http://127.0.0.1:3000/api/login', this.loginForm.value)
      .subscribe(
        (response) => {
          console.log('Login successful', response);
          alert('Login successful!');
        },
        (error) => {
          console.error('Error during login', error);
          alert('Invalid email or password');
        }
      );
  }
}
