import { Component } from '@angular/core';
import { Issue } from './issue-service/issue-object.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service-config/notification-service.component';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
})
export class IssueComponent {
  title: string = 'User List'
  userList: Issue[] = [];
  tableColumns = ['select', 'issue_id', 'user_id', 'book_id', 'issue_date', 'period', 'return_date'];
  selection = new SelectionModel<Issue>(false, []);
  toggleButton!: boolean; 
  userID: number = -1;

  constructor(
    private router: Router,
    private notification: NotificationService
  ){}

  ngOnInit(){
    this.toggleButton = false;
    //Populate table
      
  }
}
