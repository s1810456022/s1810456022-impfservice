import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';
import { Vacevent } from './vacevent';

@Injectable()
export class VaceventService {

  private api = "https://impfservice.s1810456022.student.kwmhgb.at/api";

  constructor(private http:HttpClient) { 

  }

  getAll():Observable<Array<Vacevent>>{
    return this.http.get<Array<Vacevent>>(`${this.api}/vaccinationevents`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getByState(state:string):Observable<Array<Vacevent>>{
    return this.http.get<Array<Vacevent>>(`${this.api}/vaccinationevents/${state}`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id:number):Observable<Vacevent>{
    return this.http.get<Vacevent>(`${this.api}/vaccinationevent/${id}`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id:number):Observable<any>{
    return this.http.delete(`${this.api}/vaccinationevent/${id}`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(vacevent: Vacevent):Observable<any>{
    return this.http.post(`${this.api}/vaccinationevent`, vacevent).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(vacevent: Vacevent):Observable<any>{
    return this.http.put(`${this.api}/vaccinationevent/${vacevent.id}`, vacevent).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any){
    return throwError(error);
  }

}