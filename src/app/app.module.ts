import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookServiceComponent } from './book/service/book-service.component';
import { HttpExceptionHandler } from "./service-config/HttpExceptionHandler";

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [BookServiceComponent, HttpExceptionHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
