import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BookComponent } from '../book.component';
import { HttpExceptionHandler } from "src/app/service-config/HttpExceptionHandler";
import { Book } from './book-object';

@Injectable()
export class BookServiceComponent {

  results: BookComponent[];

  constructor(private httpClient: HttpClient, private httpExc: HttpExceptionHandler) { 
    this.results = [];
  }
  
  BASE_URL: string = "http://192.168.18.8:8080/book"; // Change accordingly to where the clent is running from

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

  addbook(book: Book): Observable<any> {
    return this.httpClient.post(this.BASE_URL + '/create', book,)
    .pipe(
      catchError(this.httpExc.handleError)
    );
  }
}
