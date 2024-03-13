import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service-config/notification-service.component';
import { IssueServiceComponent } from '../issue-service/issue-service.component';
import { Issue } from '../issue-service/issue-object.component';
import { HttpStatusCode } from '@angular/common/http';
import { catchError } from 'rxjs';
import { User } from 'src/app/user/user-service/user-object.component';

@Component({
  selector: 'app-issue-add-edit',
  templateUrl: './issue-add-edit.component.html',
})
export class IssueAddEditComponent {
  title: string = '';
  date: Date = new Date();

  userForm = new FormGroup({
    issueID: new FormControl<number>(0, {nonNullable: true}),
    userID: new FormControl<number>(0, {nonNullable: true}),
    bookID: new FormControl<number>(0, {nonNullable: true}),
    issueDate: new FormControl<Date>(this.date),
    period: new FormControl<number>(0, {nonNullable: true}),
    returnDate: new FormControl<Date>(this.date),
    fine: new FormControl<number>(0.00, {nonNullable: false})
  })

  constructor(
    private router: Router,
    private service: IssueServiceComponent,
    private activatedroute: ActivatedRoute,
    private notification: NotificationService
  ){}

  ngOnInit(){
    // Depending on the route navigation (add/edit), set the title accordingly and fetch object to be edited 
      if(this.router.url === '/issue/add') {
        this.title ='Add User';
      } else {
        this.title = 'Edit User';
        this.activatedroute.queryParams.subscribe(data => {
          let issueID: number = parseInt(data['id']);
          this.service.get(issueID).subscribe((response: Issue) => {
            this.fillForm(response);
          });
        });
      }
  }

  // Save (add new item) or update existing item 
    save(): void {
      let issue: Issue = this.userForm.value;
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
          this.service.put(issue)
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
    this.userForm.setValue({
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
      this.userForm.setValue({
        issueID: issue.issueID!, 
        userID: issue.userID!,
        bookID: issue.bookID!,
        issueDate: issue.issueDate!,
        period: issue.period!,
        returnDate: issue.returnDate!,
        fine: issue.fine!
      })
    }  

  // Navigate back to issue list page  
    navigateBack():void {
      this.router.navigateByUrl('/issue');
    }
}  
