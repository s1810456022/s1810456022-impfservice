import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';
import { User } from './user';

@Injectable()
export class UserService {

  private api = "https://impfservice.s1810456022.student.kwmhgb.at/api";

  constructor(private http:HttpClient) { 

  }
  getUser(userId:number):Observable<any>{
    return this.http.get<any>(`${this.api}/vaccinationevents/registration/${userId}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(user:User):Observable<any>{
    console.log(user.id);
    return this.http.put(`${this.api}/vaccinationevents/registration/${user.id}`, user).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any){
    return throwError(error);
  }

}