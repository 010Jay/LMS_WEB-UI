import { Component } from '@angular/core';
import { User } from './user-service/user-object.component';
import { SelectionModel } from '@angular/cdk/collections';
import { UserServiceComponent } from './user-service/user-service.component';
import { Router } from '@angular/router';
import { NotificationService } from '../service-config/notification-service.component';
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

// Get id of the object/row selected in the table
  onSelect(row: any): void{
    if(this.selection.isSelected(row)) {
      this.userID = row.userID;
      this.toggleButton = true;
    } else {
        this.toggleButton = false;
        this.userID = -1;
    }  
  }
  
//Display add template
  navigateToAddPage =  () => {
    this.router.navigateByUrl('/user/add');
  }

//Display edit template
  navigateToEditPage =  () => {
    this.router.navigate(['/user/edit'], { queryParams: { id: this.userID } });
  }   

// Delete the item 
  delete(): void {
    this.service.delete(this.userID)
    .pipe(
      catchError(error => { 
        if(error.status != HttpStatusCode.Ok)
          this.notification.openDialog(error.message, '')
        return error; 
      })
    )
    .subscribe((reponse: User) => {
      if(reponse != null)  
        this.notification.openDialog('Succesfully deleted.', ''); 
    });
  }
}
