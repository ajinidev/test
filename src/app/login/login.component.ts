import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const value = this.login.value;
    this.http.post('https://reqres.in/api/login', value).subscribe(
      response => this.onSuccess(response)
    )
  }

  onSuccess(response: any) {
    sessionStorage.setItem('token', response.token);
    this.router.navigate(['/home'])
  }

}
