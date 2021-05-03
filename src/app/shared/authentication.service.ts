import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

interface Token {
  exp: number;
  user: {
    id:string,
    admin: string,
    firstName: string,
    lastName: string,
    vacevent_id: string
  }
}

@Injectable()
export class AuthenticationService {

  private api: string = "https://impfservice.s1810456022.student.kwmhgb.at/api/auth";

  constructor(private http: HttpClient) { }

  login(email:string, password:string){
    return this.http.post(`${this.api}/login`, {
      email:email,
      password:password
    });
  }

  public setLocalStorage(token:string){
    localStorage.setItem("token",token);
    const decodedToken = jwt_decode(token) as Token;
    localStorage.setItem("userId", decodedToken.user.id);
    localStorage.setItem("admin", decodedToken.user.admin);
    localStorage.setItem("firstName", decodedToken.user.firstName);
    localStorage.setItem("lastName", decodedToken.user.lastName);
    localStorage.setItem("vacevent_id", decodedToken.user.vacevent_id);
  }

  public logout(){
    this.http.post(`${this.api}/logout`, {});
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("admin");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("vacevent_id");
  }

  public isLoggedIn(){
    if(localStorage.getItem("token")){
      let token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()){
        localStorage.removeItem("token");
        localStorage.removeItem("token");
        return false;
      }
      return true;
    }
    return false;
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }


}