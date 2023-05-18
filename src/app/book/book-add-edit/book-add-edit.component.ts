import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceComponent } from '../service/book-service.component';
import { Book } from '../service/book-object';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html'
})
export class BookAddEditComponent {

  title: string = '';

  addBookForm = new FormGroup({
    bookID: new FormControl<number>(0, {nonNullable: true}),
    bookName: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    genre: new FormControl('', [Validators.required]),
    price: new FormControl<number>(0.00, {nonNullable: true})
  });
 
  constructor(
    private router: Router,
    private service: BookServiceComponent,
    private activatedroute: ActivatedRoute,
  ) {}

  ngOnInit():void {
    // Depending on the route navigation (add/edit), set the title accordingly and fetch object to be edited 
      if(this.router.url === '/book/add') {
        this.title ='Add Book';
      } else {
          this.title = 'Edit Book';
          this.activatedroute.queryParams.subscribe(data => {
            console.log(data);
            // Get method goes here
          });
      }
  }

  addNewBook(): void {
    let book: Book = this.addBookForm.value;
    this.service.addbook(book).subscribe((response: Book) => {
      console.log(response);
      // Display message to go here
    });
    this.navigateBack();
  }

  // Reset form to blank/default values
    reset():void {
      this.addBookForm.setValue({
        bookID: 0,
        bookName: '',
        author: '',
        genre: '',
        price: 0.00
      })
    }

  // Navigate back to book list page  
    navigateBack():void {
      this.router.navigateByUrl('/book');
    }
}
