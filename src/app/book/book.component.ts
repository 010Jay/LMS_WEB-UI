import { Component, OnInit } from '@angular/core';
import { BookServiceComponent } from './book-service/book-service.component';
import { Book } from './book-service/book-object.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { NotificationService } from '../service-config/notification-service.component';
import { catchError } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
})
export class BookComponent implements OnInit {

  title = 'Book List';
  bookList: Book[] = [];
  tableColumns = ['select', 'book_id', 'book_name', 'author', 'genre', 'price'];
  selection = new SelectionModel<Book>(false, []);
  toggleButton!: boolean; 
  bookID: number = -1;

  constructor(
    private service: BookServiceComponent, 
    private router: Router,
    private notification: NotificationService
    ) {}
  
  ngOnInit() {
    this.toggleButton = false;
    // Populate table when webpage loads
      this.service.getMany()
      .pipe(
        catchError(error => {
          if(error.status != HttpStatusCode.Ok)
            this.notification.openDialog(error.message, '');
          return error;
        })
      )
      .subscribe((response: Book[]) => {
        this.bookList = response;
      });
  }

// Get id of the object/row selected in the table
  onSelect(row: any): void{
    if(this.selection.isSelected(row)) {
      this.bookID = row.bookID;
      this.toggleButton = true;
    } else {
        this.toggleButton = false;
        this.bookID = -1;
    }  
  }

  //Display add template
    navigateToAddPage =  () => {
      this.router.navigateByUrl('/book/add');
    }

  //Display edit template
    navigateToEditPage =  () => {
      this.router.navigate(['/book/edit'], { queryParams: { id: this.bookID } });
    }  

  // Delete the item  
    delete(): void {
      this.service.delete(this.bookID)
      .pipe(
        catchError(error => { 
          if(error.status != HttpStatusCode.Ok)
            this.notification.openDialog(error.message, '')
          return error; 
        })
      )
      .subscribe((reponse: Book) => {
        if(reponse != null)  
          this.notification.openDialog('Succesfully deleted.', ''); 
      });
    }
}


