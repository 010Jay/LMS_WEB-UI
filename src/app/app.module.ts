import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { BookServiceComponent } from './book/service/book-service.component';
import { HttpExceptionHandler } from "./service-config/HttpExceptionHandler";

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

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
    AppRoutingModule
  ],
  providers: [BookServiceComponent, HttpExceptionHandler],
  bootstrap: [AppComponent]
})
export class AppModule { }
