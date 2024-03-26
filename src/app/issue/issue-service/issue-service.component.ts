import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, catchError } from 'rxjs';
import { HttpExceptionHandler } from 'src/app/service-config/http-exception-service.component';
import { Issue } from './issue-object.component';
import { GenericURL } from 'src/app/service-config/generic-url-object';

@Injectable()
export class IssueServiceComponent {
  constructor(
    private httpClient: HttpClient,
    private httpExc: HttpExceptionHandler
  ){}

  endpoint: string = GenericURL.generic_URL;
  Base_URL: string = this.endpoint + '/issue';

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

  put(issue: Issue, calculateFine: boolean): Observable<any> {
    let params = new HttpParams().set('calculateFine', calculateFine);
    
    return this.httpClient.post(this.Base_URL + '/update', issue, { params: params })
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
