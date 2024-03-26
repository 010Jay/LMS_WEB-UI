import { Component } from '@angular/core';
import { Issue } from './issue-service/issue-object.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service-config/notification-service.component';
import { IssueServiceComponent } from './issue-service/issue-service.component';
import { catchError } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
})
export class IssueComponent {
  title: string = 'Issue List'

  issueList: Issue[] = [];
  tableColumns = ['select', 'issue_id', 'user_id', 'book_id', 'issue_date', 'period', 'return_date', 'fine'];
  selection = new SelectionModel<Issue>(false, []);
  toggleButton!: boolean; 
  issueID: number = -1;

  constructor(
    private router: Router,
    private service: IssueServiceComponent,
    private notification: NotificationService
  ){}

  ngOnInit(){
    this.toggleButton = false;
    //Populate table
      this.service.getMany()
      .pipe(
        catchError(error => {
          if(error.status =! HttpStatusCode.Ok)
            this.notification.openDialog(error.message, '')
          return error;
        })
      )
      .subscribe((response: Issue[]) => {
        this.issueList = response;
      });
  }

  // Get id of the object/row selected in the table
    onSelect(row: any): void{
      if(this.selection.isSelected(row)) {
        this.issueID = row.issueID;
        this.toggleButton = true;
      } else {
          this.toggleButton = false;
          this.issueID = -1;
      }  
    }

  //Display add template
    navigateToAddPage =  () => {
      this.router.navigateByUrl('/issue/add');
    }  

  //Display edit template
    navigateToEditPage =  () => {
      this.router.navigate(['/issue/edit'], { queryParams: { id: this.issueID } });
    }  
  
  // Delete the item  
    delete(): void {
      this.service.delete(this.issueID)
      .pipe(
        catchError(error => {
          if(error.status =! HttpStatusCode.Ok)
            this.notification.openDialog(error.message, '');
          return error;
        })
      )
      .subscribe((response: Issue) => {
        if(response != null)
          this.notification.openDialog('Succesfully deleted.', '');
      });
    };  
}
