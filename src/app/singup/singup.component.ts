import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
      alert("Sign Up Successfully!!!");
      this.signupForm.reset();
      this.router.navigate(['login']);
    },
    error => {
      alert("Something went wrong!!!");
    });
  }
}
