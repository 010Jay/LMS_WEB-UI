import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceComponent } from '../book-service/book-service.component';
import { Book } from '../book-service/book-object.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service-config/notification-service.component';
import { catchError } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { ValidationMessage } from 'src/app/service-config/validation-message-object';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html'
})
export class BookAddEditComponent {

  title: string = '';
  readyToSubmit: boolean = false;
  validationMessage: ValidationMessage = new ValidationMessage();

  bookForm = new FormGroup({
    bookID: new FormControl<number>(0, {nonNullable: true}),
    bookName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    author: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    genre: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    price: new FormControl<number>(0.00, [Validators.min(0)])
  });
 
  constructor(
    private router: Router,
    private service: BookServiceComponent,
    private activatedroute: ActivatedRoute,
    private notification: NotificationService
  ) {}

  ngOnInit():void {
    // Depending on the route navigation (add/edit), set the title accordingly and fetch object to be edited 
      if(this.router.url === '/book/add') {
        this.title ='Add Book';
      } else {
          this.title = 'Edit Book';
          this.activatedroute.queryParams.subscribe(data => {
            let bookID: number = parseInt(data['id']);
            this.service.get(bookID).subscribe(response => {
              this.fillForm(response);
            });
          });
      }
  }

  get bookFormControl(): any {
    return this.bookForm.controls;
  }

  // Save (add new item) or update existing item 
    save(): void {
      let book: Book = this.bookForm.value;
      if(this.bookForm.valid) 
        this.readyToSubmit = true;

      if(this.router.url === '/book/add' && this.readyToSubmit) {
        this.service.post(book)
        .pipe(
          catchError(error => {
            if(error.status != HttpStatusCode.Ok)
              this.notification.openDialog(error.message, '');
            return error;
          })
        )
        .subscribe((response: Book) => {
          if(response != null)
            this.notification.openDialog('Sucessfully added.', '');
          this.navigateBack();
        });
      } else if(this.router.url === '/book/edit' && this.readyToSubmit) {
          this.service.put(book)
          .pipe(
            catchError(error => {
              if(error.status != HttpStatusCode.Ok)
                this.notification.openDialog(error.message, '');
              return error;
            })
          )
          .subscribe((response: Book) => {
            if(response != null)
              this.notification.openDialog('Sucessfully updated.', '');
            this.navigateBack();
          });
      } else {
          this.notification.openDialog('', 'Please enter all the neccessary requirements!')
      }
      this.readyToSubmit = false;
    }

  // Reset form to blank/default values
    reset():void {
      this.bookForm.setValue({
        bookID: 0,
        bookName: '',
        author: '',
        genre: '',
        price: 0.00
      })
    }

  // Fill form with data object to edit
    fillForm(book: Book): void {
      this.bookForm.setValue({
        bookID: book.bookID!,
        bookName: book.bookName!,
        author: book.author!,
        genre: book.genre!,
        price: book.price!
      })
    }  

  // Navigate back to book list page  
    navigateBack():void {
      this.router.navigateByUrl('/book');
    }
}
