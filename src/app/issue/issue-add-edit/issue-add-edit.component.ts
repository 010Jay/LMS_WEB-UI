import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service-config/notification-service.component';
import { IssueServiceComponent } from '../issue-service/issue-service.component';
import { Issue } from '../issue-service/issue-object.component';
import { HttpStatusCode } from '@angular/common/http';
import { catchError } from 'rxjs';
import { User } from 'src/app/user/user-service/user-object.component';
import { Book } from 'src/app/book/book-service/book-object.component';
import { UserServiceComponent } from 'src/app/user/user-service/user-service.component';
import { BookServiceComponent } from 'src/app/book/book-service/book-service.component';

@Component({
  selector: 'app-issue-add-edit',
  templateUrl: './issue-add-edit.component.html',
})
export class IssueAddEditComponent {
  title: string = '';
  showSecondForm: boolean = false;
  userList: User[] = [];
  bookList: Book[] = [];
  calcaulateFine: boolean = false;
  displayMessage: string = '';
  buttonName: string = 'Calculate Fine';
  date: Date = new Date();

  issueForm = new FormGroup({
    issueID: new FormControl<number>(0, {nonNullable: true}),
    userID: new FormControl<number>(0, {nonNullable: true}),
    bookID: new FormControl<number>(0, {nonNullable: true}),
    issueDate: new FormControl<any>(this.date),
    period: new FormControl<number>(0, {nonNullable: true}),
    returnDate: new FormControl<any>(this.date),
    fine: new FormControl<number>({value: 0.00,  disabled: true})
  })

  constructor(
    private router: Router,
    private service: IssueServiceComponent,
    private userService: UserServiceComponent,
    private bookService: BookServiceComponent,
    private activatedroute: ActivatedRoute,
    private notification: NotificationService
  ){}

  ngOnInit(){
    // Depending on the route navigation (add/edit), set the title accordingly and fetch object to be edited 
      if(this.router.url === '/issue/add') {
        this.title ='Add Issue';
        this.showSecondForm = false;
      } else {
        this.title = 'Edit Issue';
        this.showSecondForm = true;
        this.activatedroute.queryParams.subscribe(data => {
          let issueID: number = parseInt(data['id']);
          this.service.get(issueID)
          .pipe(
              catchError( error => {
                if(error.status != HttpStatusCode.Ok)
                  this.notification.openDialog(error.message, '');
                return error;
              }
            ))
          .subscribe((response: Issue) => {
            this.fillForm(response);
          });
        });
      }

    // Get lists of users and books for the drop down lists
      this.userService.getMany()
      .pipe(
        catchError( error => {
          if(error.status != HttpStatusCode.Ok)
            this.notification.openDialog(error.message, '');
          return error;
        })
      )
      .subscribe((response: User[]) => {
        this.userList = response;
      })  
      
      this.bookService.getMany()
      .pipe(
        catchError( error => {
          if(error.status != HttpStatusCode.Ok)
            this.notification.openDialog(error.message, '');
          return error;
        })
      )
      .subscribe((response: Book[]) => {
        this.bookList = response;
      })  
  }

  // Save (add new item) or update existing item 
    save(): void {
      let issue: Issue = this.issueForm.value;
      
      if(this.router.url === '/issue/add') {
      this.service.post(issue)
      .pipe(
          catchError(error => {
          if(error.status != HttpStatusCode.Ok)
              this.notification.openDialog(error.message, '');
          return error;
          })
      )
      .subscribe((response: User) => {
          if(response != null)
          this.notification.openDialog('Sucessfully added.', '');
      });
      } else {
          this.service.put(issue, this.calcaulateFine)
          .pipe(
          catchError(error => {
              if(error.status != HttpStatusCode.Ok)
              this.notification.openDialog(error.message, '');
              return error;
          })
          )
          .subscribe((response: User) => {
          if(response != null)
              this.notification.openDialog('Sucessfully updated.', '');
          });
      }
      this.navigateBack();
}

  // Reset form to blank/default values
  reset():void {
    this.issueForm.setValue({
      issueID: 0,
      userID: 0,
      bookID: 0,
      issueDate: this.date,
      period: 0,
      returnDate: this.date,
      fine: 0.00
    })
  }

  // Fill form with data object to edit
    fillForm(issue: Issue): void {
      this.issueForm.setValue({
        issueID: issue.issueID!, 
        userID: issue.userID!,
        bookID: issue.bookID!,
        issueDate: issue.issueDate!,
        period: issue.period!,
        returnDate: issue.returnDate!,
        fine: issue.fine!
      })
    }

    sendCalculateFineRequest(): void {
      this.calcaulateFine = !this.calcaulateFine;
      if(this.calcaulateFine) {
        this.displayMessage = 'Fine will be calculated!';
        this.buttonName = 'Cancel';
      } else {
        this.displayMessage = '';
        this.buttonName = 'Calculate Fine';
      }
    }

  // Navigate back to issue list page  
    navigateBack():void {
      this.router.navigateByUrl('/issue');
    }
}  
