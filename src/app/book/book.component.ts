import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BookServiceComponent } from './service/book-service.component';
import { Book } from './book-object';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

  title = 'Book Manager';
  bookList: Book[] = [];
  tableColumns = ['book_id', 'book_name', 'author', 'genre', 'price'];

  constructor(private service: BookServiceComponent){}
  
  ngOnInit() {
    // Populate table when webpage loads
      this.service.getAllBooks().subscribe((response: Book[]) => {
        this.bookList = response;
      })
  }




}
