import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpExceptionHandler } from "src/app/service-config/http-exception-service.component";
import { Book } from './book-object.component';
import { GenericURL } from 'src/app/service-config/generic-url-object';

@Injectable()
export class BookServiceComponent {

  constructor(
    private httpClient: HttpClient, 
    private httpExc: HttpExceptionHandler
    ) {}
  
    endpoint: string = GenericURL.generic_URL;
    Base_URL: string = this.endpoint + '/book'; 

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

  post(book: Book): Observable<any> {
    return this.httpClient.post(this.Base_URL + '/create', book,)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  put(book: Book): Observable<any> {
    return this.httpClient.post(this.Base_URL + '/update', book,)
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
