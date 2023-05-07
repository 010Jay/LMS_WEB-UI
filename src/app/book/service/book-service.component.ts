import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { BookComponent } from '../book.component';
import { Book } from '../book-object';
import { HttpExceptionHandler } from "src/app/service-config/HttpExceptionHandler";

@Injectable()
export class BookServiceComponent {

  results: BookComponent[];

  constructor(private httpClient: HttpClient, private httpExc: HttpExceptionHandler) { 
    this.results = [];
  }
  
  BASE_URL: string = "http://localhost:8080/book";

  httpOptions = {
    httpHeaders: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  getBook(id: number) {
    return this.httpClient.get(this.BASE_URL + `/read/{id}`)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

  getAllBooks(): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/getAll')
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }

}
