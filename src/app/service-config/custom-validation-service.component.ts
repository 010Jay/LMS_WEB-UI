import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from '../user/user-service/user-object.component';
import { UserServiceComponent } from '../user/user-service/user-service.component';
import { HttpStatusCode } from '@angular/common/http';
import { NotificationService } from './notification-service.component';
import { catchError } from 'rxjs';

@Injectable()
export class CustomvalidationService {

    userList: User[] = [];
    usernameList: any[] = [];

    constructor(
        private service: UserServiceComponent,
        private notification: NotificationService
    ) {}

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

        for(let item of this.userList) {
            this.usernameList.push(item.username);
        }

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