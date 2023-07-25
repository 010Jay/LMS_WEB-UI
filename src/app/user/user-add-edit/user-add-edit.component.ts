import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserServiceComponent } from "../user-service/user-service.component";
import { NotificationService } from "src/app/service-config/notification-service.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../user-service/user-object.component";

@Component({
    selector: 'app-user-add-edit',
    templateUrl: './user-add-edit.component.html'
  })
  export class UserAddEditComponent { 
    title: string = '';

    userForm = new FormGroup({
        userDetails: new FormGroup({
            userID: new FormControl<number>(0, {nonNullable: true}),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            contactNumber: new FormControl('', [Validators.required]),
            emailAddress: new FormControl('', [Validators.required])
        }),
        loginDetails: new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        })
    });  

    constructor(
        private router: Router,
        private service: UserServiceComponent,
        private activatedroute: ActivatedRoute,
        private notification: NotificationService
    ) {}

    ngOnInit(){
        // Depending on the route navigation (add/edit), set the title accordingly and fetch object to be edited 
            if(this.router.url === '/user/add') {
                this.title ='Add User';
            } else {
                this.title = 'Edit User';
                this.activatedroute.queryParams.subscribe(data => {
                    let bookID: number = parseInt(data['id']);
                    this.service.get(bookID).subscribe((response: User) => {
                    this.fillForm(response);
                    });
                });
            }
    }

    save(){
        
    }

    // Reset form to blank/default values
        reset():void {
            // this.userForm.setValue({
            //     userID: 0,
            //     firstName: '',
            //     lastName: '',
            //     contactNumber: '',
            //     emailAddress: ''
            // })
        }
  
    // Fill form with data object to edit
      fillForm(user: User): void {
        // this.userForm.setValue({
        //   userID: user.userID!,
        //   firstName: user.firstName!,
        //   lastName: user.lastName!,
        //   contactNumber: user.contactNumber!,
        //   emailAddress: user.emailAddress!,

        //   username: user.username!,
        //   password: user.password!
        // })
      }  
  
    // Navigate back to book list page  
      navigateBack():void {
        this.router.navigateByUrl('/user');
      }
  }