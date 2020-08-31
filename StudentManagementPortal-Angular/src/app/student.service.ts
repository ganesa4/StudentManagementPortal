import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from './student';

@Injectable()
export class Studentservice {
  rootUrl: string;
  baseUrl:string;
  constructor(private http: HttpClient) {
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  private handleError(error: any) {
    if (error.status == 400) {
      let errMsg = 'Please try again'
      return Observable.throw(errMsg);
    }
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }  
  getAllStudentInfo() {
    this.baseUrl = 'assets/allstudentdetails.json';
    return this.http.get<any>(this.baseUrl).pipe(map(this.extractData));
  }
  getAdvisorInfo() {
    this.baseUrl = 'assets/advisors.json';
    return this.http.get<any>(this.baseUrl).pipe(map(this.extractData));
  }
}