import { Component, OnInit } from '@angular/core';
import { BookServiceComponent } from './service/book-service.component';
import { Book } from './service/book-object';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';

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
    ) {}
  
  ngOnInit() {
    // Populate table when webpage loads
      this.toggleButton = false;
      this.service.getMany().subscribe((response: Book[]) => {
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

  // Uncheck a checkbox when diselecting the main checkbox
    clearSelection() { 
      if(this,this.selection.selected.length > 0)
        this.selection.clear();
    }

  //Display add template
    navigateToAddPage =  () => {
      this.router.navigateByUrl('/book/add');
    }

  //Display edit template
    navigateToEditPage =  () => {
      this.router.navigate(['/book/edit'], { queryParams: { id: this.bookID } });
    }  

    delete(): void {
      this.service.delete(this.bookID).subscribe((reponse: Book) => {
        console.log(reponse);
      });
    }
}


