import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/internal/operators';
import { Vaclocation } from './vaclocation';

@Injectable()
export class VaclocationService {

  private api = "https://impfservice.s1810456022.student.kwmhgb.at/api";

  constructor(private http:HttpClient) { 

  }

  getLocationByState(state:string):Observable<Array<Vaclocation>>{
    return this.http.get<Array<Vaclocation>>(`${this.api}/vaccinationlocations/${state}`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getLocationById(id:number):Observable<Vaclocation>{
    return this.http.get<Vaclocation>(`${this.api}/vaccinationlocation/${id}`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any){
    return throwError(error);
  }

}