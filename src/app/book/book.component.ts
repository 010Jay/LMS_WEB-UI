import { Component, OnInit } from '@angular/core';
import { BookServiceComponent } from './service/book-service.component';
import { Book } from './book-object';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

  title = 'Book List';
  bookList: Book[] = [];
  tableColumns = ['select', 'book_id', 'book_name', 'author', 'genre', 'price'];
  selection = new SelectionModel<Book>(false, []);

  constructor(private service: BookServiceComponent){}
  
  ngOnInit() {
    // Populate table when webpage loads
      this.service.getAllBooks().subscribe((response: Book[]) => {
        this.bookList = response;
      })
  }

// Get id of the object/row selected in the table
  onSelect(row: any): any{
    if(this.selection.isSelected(row)) {
    let bookID = row.bookID;
    return bookID;
    }

    return null;
  }

  // Uncheck a checkbox when diselecting the main checkbox
    clearSelection() { 
      if(this,this.selection.selected.length > 0)
        this.selection.clear();
    }
}
