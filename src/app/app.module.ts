import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookServiceComponent } from './book/book-service/book-service.component';
import { HttpExceptionHandler } from "./service-config/http-exception-service.component";
import { HomeComponent } from './home/home.component';
import { BookAddEditComponent } from './book/book-add-edit/book-add-edit.component';
import { UserComponent } from './user/user.component';
import { UserServiceComponent } from './user/user-service/user-service.component';
import { UserAddEditComponent } from './user/user-add-edit/user-add-edit.component';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'; //Import for material form
import { MatInputModule } from '@angular/material/input'; //Import for material form
import { MatSelectModule } from '@angular/material/select'; //Select type material 
import { MatSnackBarModule } from '@angular/material/snack-bar'; //Display pop-up messages

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HomeComponent,
    BookAddEditComponent,
    BookAddEditComponent,
    UserComponent,
    UserAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    AppRoutingModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    BookServiceComponent, 
    HttpExceptionHandler,
    UserServiceComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
