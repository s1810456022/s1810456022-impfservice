import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

interface Response {
  access_token: string
}

@Component({
  selector: 'vac-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

 loginForm: FormGroup;
 admin:boolean = false;

  constructor(private fb:FormBuilder, private router:Router, private authService:AuthenticationService, private route:ActivatedRoute) { }

  ngOnInit() {
    if(localStorage.getItem("admin")=="1"){
      this.admin = true;
    }

    this.loginForm = this.fb.group({
      username: ["", Validators.required, Validators.email],
      password: ["", Validators.required]
    });
  }

  login(){
    const val = this.loginForm.value;
    if(val.username && val.password){
      this.authService.login(val.username, val.password).subscribe(
        (res)=>{
          this.authService.setLocalStorage((res as Response).access_token);
          this.router.navigate(["../home"],{relativeTo:this.route});
        }
      );
    }
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

}