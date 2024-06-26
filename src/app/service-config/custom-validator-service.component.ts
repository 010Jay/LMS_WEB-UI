import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from '../user/user-service/user-object.component';
import { UserServiceComponent } from '../user/user-service/user-service.component';
import { HttpStatusCode } from '@angular/common/http';
import { NotificationService } from './notification-service.component';
import { catchError } from 'rxjs';

@Injectable()
export class CustomValidatorService {

    userList: User[] = [];
    usernameList: any[] = [];

    constructor(
        private service: UserServiceComponent,
        private notification: NotificationService
    ) {}

    getUsers() {
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

    userNameValidator(userControl: AbstractControl) {
        return new Promise(resolve => {
          setTimeout(() => {
            if (this.validateUserName(userControl.value)) {
              resolve({ userNameNotAvailable: true });
            } else {
              resolve(null);
            }
          }, 1000);
        });
      }
    
    validateUserName(username: string) {
      if(this.userList.length == 0)
          this.getUsers();
      
      for(let item of this.userList) {
        if(!this.usernameList.includes(item.username))
          this.usernameList.push(item.username);
      }

      console.log(this.usernameList);
      return (this.usernameList.indexOf(username) > -1);  
    }
    
    patternValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            return null as any;
          }
          const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
          const valid = regex.test(control.value);
          return valid ? null : { invalidPassword: true } as any;
        };
      }
}