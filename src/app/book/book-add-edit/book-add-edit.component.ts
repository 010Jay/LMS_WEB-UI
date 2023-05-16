import { Component, Host } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceComponent } from '../service/book-service.component';
import { Book } from '../service/book-object';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookComponent } from '../book.component';


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
    //@Host() private bookComp: BookComponent
  ) {}

  ngOnInit():void {
    // this.bookComp.subscriber$.subscribe(data => {
    //   this.title = data;
    //   console.log(data);
    // });
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data);
    });
  }

  addNewBook(): void {
    let book: Book = this.addBookForm.value;
    console.log(book);

    this.service.addbook(book).subscribe((response: Book) => {
      console.log(response);
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
        price:0.00
      })
    }

  // Navigate back to book list page  
    navigateBack():void {
      this.router.navigateByUrl('/book');
    }
}
