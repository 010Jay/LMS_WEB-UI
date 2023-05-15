import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Book } from '../service/book-object';
import { FormControl } from '@angular/forms';
import { BookServiceComponent } from '../service/book-service.component';


@Component({
  selector: 'app-book-add-edit',
  templateUrl: './book-add-edit.component.html'
})
export class BookAddEditComponent {

  bookName = new FormControl('');;
  author = new FormControl('');;
  genre = new FormControl('');;
  price = new FormControl('');;

  constructor(
    private router: Router,
    private service: BookServiceComponent
  ) {}
  
  navigateBack() {
    this.router.navigateByUrl('/book');
  }
}
