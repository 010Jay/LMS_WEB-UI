import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable, ObservedValueOf, catchError } from 'rxjs';
import { HttpExceptionHandler } from 'src/app/service-config/http-exception-service.component';
import { IssueComponent } from '../issue.component';
import { Issue } from './issue-object.component';

@Injectable()
export class IssueServiceComponent {
  constructor(
    private httpClient: HttpClient,
    private httpExc: HttpExceptionHandler
  ){}

  Base_URL: string = 'http://192.168.18.17:8080/issue';

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

  post(issue: Issue): Observable<any> {
    return this.httpClient.post(this.Base_URL + '/create', issue)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  put(issue: Issue): Observable<any> {
    return this.httpClient.put(this.Base_URL + '/update', issue)
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
