import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpExceptionHandler } from 'src/app/service-config/http-exception-service';

@Injectable()
export class UserServiceComponent {

  constructor(
    private httpClient: HttpClient,
    private httpExc: HttpExceptionHandler
  ) {}

  Base_URL: string = 'http://192.168.18.6:8080/user';

  getMany(): Observable<any> {
    return this.httpClient.get(this.Base_URL + '/getAll')
    .pipe(
      catchError(this.httpExc.handleError)
    );
  } 

  
}