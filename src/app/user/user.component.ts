import { Component } from '@angular/core';
import { User } from './user-service/user-object';
import { SelectionModel } from '@angular/cdk/collections';
import { UserServiceComponent } from './user-service/user-service.component';
import { Router } from '@angular/router';
import { NotificationService } from '../service-config/notification-service';
import { HttpStatusCode } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent {
  title: string = 'User List'
  userList: User[] = [];
  tableColumns = ['select', 'user_id', 'first_name', 'last_name', 'contact_number', 'email_address'];
  selection = new SelectionModel<User>(false, []);
  toggleButton!: boolean; 
  userID: number = -1;

  constructor(
    private service: UserServiceComponent,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.toggleButton = false;
    //Populate table
      this.service.getMany()
      .pipe(
        catchError(error => {
        if(error.status != HttpStatusCode.Ok)
          this.notification.openDialog(error.message, '');
        return error;  
        })
      )
      .subscribe((repsonse: User[]) => {
        this.userList = repsonse;
      })
  }

  onSelect(row: any) {
    let roow = row;
  }
}
