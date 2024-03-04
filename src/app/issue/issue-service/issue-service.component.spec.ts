import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueServiceComponent } from './issue-service.component';

describe('IssueServiceComponent', () => {
  let component: IssueServiceComponent;
  let fixture: ComponentFixture<IssueServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueServiceComponent]
    });
    fixture = TestBed.createComponent(IssueServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
