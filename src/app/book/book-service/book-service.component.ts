import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpExceptionHandler } from "src/app/service-config/http-exception-service";
import { Book } from './book-object';

@Injectable()
export class BookServiceComponent {

  constructor(
    private httpClient: HttpClient, 
    private httpExc: HttpExceptionHandler
    ) {}
  
  BASE_URL: string = 'http://192.168.18.6:8080/book'; // Change accordingly to where the clent is running from 

  get(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/read/' + id)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  getMany(): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/getAll')
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  post(book: Book): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/create', book,)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  put(book: Book): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/update', book,)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + '/delete/' + id)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }
}
