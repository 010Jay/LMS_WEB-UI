import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpExceptionHandler } from 'src/app/service-config/http-exception-service.component';
import { User } from './user-object.component';
import { GenericURL } from 'src/app/service-config/generic-url-object';

@Injectable()
export class UserServiceComponent {

  constructor(
    private httpClient: HttpClient,
    private httpExc: HttpExceptionHandler
  ) {}

  endpoint: string = GenericURL.generic_URL;
  Base_URL: string = this.endpoint + '/user';

  get(id: number): Observable<any> {
    return this.httpClient.get(this.Base_URL + '/read/' + id)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  getMany(): Observable<any> {
    return this.httpClient.get(this.Base_URL + '/getAll')
    .pipe(
      catchError(this.httpExc.handleError)
    );
  } 

  post(user: User): Observable<any> {
    return this.httpClient.post(this.Base_URL + '/create', user,)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  put(user: User): Observable<any> {
    return this.httpClient.post(this.Base_URL + '/update', user,)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.Base_URL + '/delete/' + id)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }
}