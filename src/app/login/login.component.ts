import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      emailAddress: [''],
      password: ['']
    })
  }

  login() {
    this.http.get<any>("http://localhost:3001/signupUsers")
    .subscribe(res => {
      const user = res.find((a: any) => {
        return a.emailAddress === this.loginForm.value.emailAddress && a.password === this.loginForm.value.password
      });

      if (user) {
        this.toast.success({detail: "Login Success!", summary: res.message, duration: 3000});
        this.loginForm.reset();
        this.router.navigate(['dashboard']);
      } else {
        this.toast.warning({detail: "User not found!", summary: res.message, duration: 3000});
      }
    },
    error => {
      this.toast.error({detail: "Error Message", summary: "Login Failed, try again later!", duration: 3000});
    })
  }
}
