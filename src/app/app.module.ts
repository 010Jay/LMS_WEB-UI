import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookServiceComponent } from './book/service/book-service.component';
import { HttpExceptionHandler } from "./service-config/HttpExceptionHandler";
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    AppRoutingModule,
    MatCheckboxModule
  ],
  providers: [BookServiceComponent, HttpExceptionHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
