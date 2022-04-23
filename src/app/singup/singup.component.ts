import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: [''],
      mobileNumber: ['', [Validators.maxLength(15)]],
      emailAddress: [''],
      password: ['']
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3001/signupUsers", this.signupForm.value)
    .subscribe(res => {
      this.toast.success({detail: "Sign Up Successfully!!!", summary: res.message, duration: 3000});
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    error => {
      this.toast.error({detail: "Something went wrong!!!", summary: "Login Failed, try again later!", duration: 3000});
    });
  }
}
