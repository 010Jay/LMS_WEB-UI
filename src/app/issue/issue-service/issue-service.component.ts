import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { HttpExceptionHandler } from 'src/app/service-config/http-exception-service.component';

@Injectable()
export class IssueServiceComponent {
  constructor(
    private httpClient: HttpClient,
    private httpExc: HttpExceptionHandler
  ){}

  Base_URL: string = 'http://192.168.18.17:8080/issue';

  
}
