import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookServiceComponent } from './service/book-service.component';
import { Book } from './service/book-object';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

  title = 'Book List';
  bookList: Book[] = [];
  tableColumns = ['select', 'book_id', 'book_name', 'author', 'genre', 'price'];
  selection = new SelectionModel<Book>(false, []);
  toggleEditButton!: boolean; 
  // Data to be by add-edit component
    bookID: number = -1;
    // addEditPageTitle = new Subject<string>();
    // subscriber$ = this.addEditPageTitle.asObservable();

  constructor(
    private service: BookServiceComponent, 
    private router: Router,
    ) {}
  
  ngOnInit() {
    // Populate table when webpage loads
      this.toggleEditButton = false;
      this.service.getAllBooks().subscribe((response: Book[]) => {
        this.bookList = response;
      })
  }

// Get id of the object/row selected in the table
  onSelect(row: any): void{
    if(this.selection.isSelected(row)) {
      this.bookID = row.bookID;
      this.toggleEditButton = true;
    } else {
        this.toggleEditButton = false;
        this.bookID = -1;
    }  
  }

  // Uncheck a checkbox when diselecting the main checkbox
    clearSelection() { 
      if(this,this.selection.selected.length > 0)
        this.selection.clear();
    }

  //Display add template
    navigateToAddPage =  () => {
      this.router.navigateByUrl('book/add');
      //this.addEditPageTitle.next("Add Book");
    }

  //Display edit template
    navigateToEditPage =  () => {
      this.router.navigate(['/book/edit'], { queryParams: { id: this.bookID } });
      //this.addEditPageTitle.next("Edit Book");
    }  
}


